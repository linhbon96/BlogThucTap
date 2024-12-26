using BlogManagementApp.Data; // Đảm bảo rằng đường dẫn này chính xác
using BlogManagementApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly BlogContext _context;

        public PostController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.Images)
                .Select(post => new PostDTO
                {
                    PostId = post.PostId,
                    Title = post.Title,
                    Content = post.Content,
                    CreatedAt = post.CreatedAt,
                    Images = post.Images.Select(img => new ImageDTO { ImageUrl = img.ImageUrl }).ToList()
                })
                .ToListAsync();

            return Ok(posts);
        }

        // GET: api/Post/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Images)
                .Where(p => p.PostId == id)
                .Select(post => new PostDTO
                {
                    PostId = post.PostId,
                    Title = post.Title,
                    Content = post.Content,
                    CreatedAt = post.CreatedAt,
                    Images = post.Images.Select(img => new ImageDTO { ImageUrl = img.ImageUrl }).ToList()
                })
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // POST: api/Post
        [HttpPost]
public async Task<ActionResult<PostDTO>> CreatePost(PostDTO postDto)
{
    if (postDto == null || string.IsNullOrEmpty(postDto.Title) || string.IsNullOrEmpty(postDto.Content))
    {
        return BadRequest("Title and Content are required");
    }

    var post = new Post
    {
        Title = postDto.Title,
        Content = postDto.Content,
        CreatedAt = DateTime.UtcNow,
        // Kiểm tra xem postDto.Images có null hay không
        Images = postDto.Images != null
            ? postDto.Images.Select(imgDto => new Image { ImageUrl = imgDto.ImageUrl, CreatedAt = DateTime.UtcNow }).ToList()
            : new List<Image>() // Nếu không có hình ảnh, khởi tạo danh sách rỗng
    };

    _context.Posts.Add(post);
    await _context.SaveChangesAsync();

    var newPostDto = new PostDTO
    {
        PostId = post.PostId,
        Title = post.Title,
        Content = post.Content,
        CreatedAt = post.CreatedAt,
        Images = post.Images.Select(img => new ImageDTO { ImageUrl = img.ImageUrl }).ToList()
    };

    return CreatedAtAction(nameof(GetPost), new { id = post.PostId }, newPostDto);
}
// GET: /api/Post/Search
        [HttpGet("Search")]
        public IActionResult Search([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest(new { message = "Query is required" });
            }

            var results = _context.Posts
                .Where(p => p.Title.Contains(query))
                .ToList();

            return Ok(results);
        }
        // PUT: api/Post/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, PostDTO postDto)
        {
            if (id != postDto.PostId)
            {
                return BadRequest("Post ID mismatch");
            }

            var post = await _context.Posts.Include(p => p.Images).FirstOrDefaultAsync(p => p.PostId == id);
            if (post == null)
            {
                return NotFound();
            }

            post.Title = postDto.Title;
            post.Content = postDto.Content;

            // Cập nhật danh sách hình ảnh
            post.Images.Clear();
            post.Images = postDto.Images.Select(imgDto => new Image { ImageUrl = imgDto.ImageUrl, CreatedAt = DateTime.UtcNow }).ToList();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Post/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.Include(p => p.Images).FirstOrDefaultAsync(p => p.PostId == id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.PostId == id);
        }
    }
}
