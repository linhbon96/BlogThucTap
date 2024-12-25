// using Microsoft.AspNetCore.Authentication.Cookies;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Swashbuckle.AspNetCore.SwaggerGen;
// using BlogManagementApp.Data;

// var builder = WebApplication.CreateBuilder(args);

// // Thêm dịch vụ cho container
// builder.Services.AddControllersWithViews();

// // Cấu hình DbContext để kết nối với PostgreSQL
// builder.Services.AddDbContext<BlogContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Cấu hình xác thực sử dụng Cookie
// builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//     .AddCookie(options =>
//     {
//         options.LoginPath = "/User/Login";  // Đường dẫn tới trang đăng nhập
//         options.AccessDeniedPath = "/User/AccessDenied"; // Đường dẫn khi truy cập bị từ chối
//     });

// // Cấu hình CORS để cho phép ReactJS frontend
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReactApp",
//         policy => policy.WithOrigins("http://localhost:3000")
//                         .AllowAnyHeader()
//                         .AllowAnyMethod());
// });

// // Thêm dịch vụ Swagger
// builder.Services.AddSwaggerGen(c =>
// {
//     c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
//     {
//         Title = "Blog API",
//         Version = "v1",
//         Description = "API for Blog Management"
//     });
// });

// // Cấu hình SPA (ReactJS)
// builder.Services.AddSpaStaticFiles(configuration =>
// {
//     configuration.RootPath = "client-app/build";  // Đường dẫn tới thư mục build của React
// });


// var app = builder.Build();

// // Cấu hình Swagger cho môi trường phát triển
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Blog API V1");
//         c.RoutePrefix = ""; // Để truy cập Swagger UI tại root
//     });
// }
// else
// {
//     // Cấu hình cho môi trường production
//     app.UseExceptionHandler("/Home/Error");
//     app.UseHsts();  // Tăng bảo mật bằng cách thêm header Strict-Transport-Security
// }

// app.UseHttpsRedirection();
// app.UseStaticFiles();  // Phục vụ các file tĩnh
// app.UseSpaStaticFiles();  // Dùng cho SPA

// app.UseRouting();

// // Kích hoạt CORS cho các request từ frontend
// app.UseCors("AllowReactApp");

// app.UseAuthentication();  // Kích hoạt xác thực
// app.UseAuthorization();   // Kích hoạt phân quyền

// // Cấu hình route mặc định cho Controller
// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller=Home}/{action=Index}/{id?}");

// // Cấu hình SPA (ReactJS)
// // app.UseSpa(spa =>
// // {
// //     spa.Options.SourcePath = "client-app";

// //     if (app.Environment.IsDevelopment())
// //     {
// //         // Sử dụng proxy tới server phát triển của ReactJS
// //         spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
// //     }
// // });

// app.Run();