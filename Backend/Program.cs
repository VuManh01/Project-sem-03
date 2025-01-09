using project3api_be.Data;
using project3api_be.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using BCrypt.Net;
using System.Text;
using project3api_be.Services;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
var JWTSetting = builder.Configuration.GetSection("Jwt");

// Cấu hình DbContext sử dụng MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 403))));

// builder.Services.AddScoped<JwtService>();
builder.Services.AddSingleton<TokenService>();

builder.Services.Configure<ImgurSettings>(builder.Configuration.GetSection("Imgur"));


builder.Services.AddControllers();

// Cấu hình Cookie cho Authorization
builder.Services.AddAuthentication("Cookies")
    .AddCookie("Cookies", options =>
    {
        options.LoginPath = "/login"; // Đường dẫn đăng nhập
        options.AccessDeniedPath = "/forbidden"; // Đường dẫn nếu bị từ chối quyền
    });


// Cấu hình Swagger/OpenAPI
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization Example: 'Bearer elelelelelleleleelelelele'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "Bearer",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddSingleton<IVnPayService, VnPayService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:4200", "http://localhost:4001") // Thay thế bằng URL của frontend
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials(); // Cho phép gửi cookie và thông tin xác thực
});


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();