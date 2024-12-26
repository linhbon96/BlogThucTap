using Microsoft.AspNetCore.Mvc;
using BlogManagementApp.Data;
using BlogManagementApp.Models;
using System.Security.Cryptography;
using System.Text;

namespace BlogManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BlogContext _context;

        public UserController(BlogContext context)
        {
            _context = context;
        }

        // POST: /api/User/Login
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                if (loginDto == null || string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
                {
                    return BadRequest(new { message = "Username and password are required" });
                }

                // Tìm người dùng trước dựa trên Username
                var loginUser = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);

                if (loginUser != null && VerifyPassword(loginDto.Password, loginUser.Password))
                {
                    return Ok(new { message = "Login successful", userId = loginUser.UserId });
                }
                else
                {
                    return Unauthorized(new { message = "Invalid username or password" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, new { message = "An unexpected error occurred." });
            }
        }

        private bool VerifyPassword(string password, string storedPassword)
        {
            // Băm mật khẩu nhập vào
            string hashedPassword = HashPassword(password);
            // So sánh mật khẩu đã băm
            return hashedPassword == storedPassword;
        }

        private string HashPassword(string password)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] inputBytes = Encoding.ASCII.GetBytes(password);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Chuyển đổi mảng byte thành chuỗi hex
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }
    }
}
