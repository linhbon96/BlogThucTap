using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BlogManagementApp.Models;

namespace BlogManagementApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // Trang chủ
        public IActionResult Index()
        {
            _logger.LogInformation("Truy cập trang chủ");
            return View();
        }

        // Trang chính sách bảo mật
        public IActionResult Privacy()
        {
            _logger.LogInformation("Truy cập trang chính sách bảo mật");
            return View();
        }

        // Trang lỗi
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            var requestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            _logger.LogError("Lỗi xảy ra với RequestId: {RequestId}", requestId);

            return View(new ErrorViewModel { RequestId = requestId });
        }
    }
}
