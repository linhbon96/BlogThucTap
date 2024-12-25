using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BlogManagementApp.Data;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
namespace BlogManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthController(BlogContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            // Kiểm tra thông tin đăng nhập
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginDTO.Username);

            if (user == null || !VerifyPassword(loginDTO.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            // Tạo token JWT
            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private bool VerifyPassword(string password, string storedPassword)
        {
            // Sử dụng PasswordHasher để so sánh mật khẩu
            var verificationResult = _passwordHasher.VerifyHashedPassword(null, storedPassword, password);
            return verificationResult == PasswordVerificationResult.Success;
        }
        private string GenerateJwtToken(User user)
        {
            // Lấy cấu hình từ appsettings
            var key = Encoding.ASCII.GetBytes("admin123"); 
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.Username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            // Tạo thông tin token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token sẽ hết hạn sau 1 giờ
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            // Tạo token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class LoginDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
