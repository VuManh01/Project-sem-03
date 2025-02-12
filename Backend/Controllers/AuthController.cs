using project3api_be.Data;
using project3api_be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using project3api_be.Services;
using project3api_be.Dtos;
namespace project3api_be.Controllers;

using System.Text.Json;
using Microsoft.AspNetCore.Authentication;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;
    // private readonly JwtService _jwtService;

    // public AuthController(ApplicationDbContext context, JwtService jwtService,IConfiguration configuration)
    public AuthController(ApplicationDbContext context, IConfiguration configuration)

    {
        _configuration = configuration;
        _context = context;
        // _jwtService = jwtService;
    }


    // API đăng nhập

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Kiểm tra đầu vào
        if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Email and password are required");
        }
        // Tìm tài khoản dựa trên email
        var account = await _context.Accounts
           .Include(a => a.Role)  // Thêm dòng này để load Role
           .FirstOrDefaultAsync(a => a.Email == request.Email && a.RoleId == 2 && a.IsActive == true);
        if (account == null)
        {
            return Unauthorized("Invalid credentials");
        }
        // So sánh mật khẩu đã mã hóa
        if (!BCrypt.Net.BCrypt.Verify(request.Password, account.Password))
        {
            return Unauthorized("Invalid credentials");
        }

        var isLoggerIn = true;
        var dataUser = new
        {
            accountId = account.AccountId,
            email = account.Email,
            role = account.Role?.RoleName ?? "No Role",
            fullName = account.FullName
        };

        // Serialize the dataUser object to a JSON string
        var dataUserJson = JsonSerializer.Serialize(dataUser);

        // Set cookie with JSON string and expiration time of 1 hour
        Response.Cookies.Append("dataUser", dataUserJson, new CookieOptions
        {
            HttpOnly = false,
            SameSite = SameSiteMode.None,
            Secure = true,
            Expires = DateTimeOffset.UtcNow.AddHours(1)
        });

        Response.Cookies.Append("isLoggedIn", isLoggerIn.ToString(), new CookieOptions
        {
            HttpOnly = false,
            SameSite = SameSiteMode.None,
            Secure = true,
            Expires = DateTimeOffset.UtcNow.AddHours(1)
        });
        return Ok(new AuthResponseDto
        {
            // Token = jwt,
            IsSuccess = true,
            Message = "Login successful",
            Role = account.Role?.RoleName ?? "No Role",
            AccountId = account.AccountId,
            Email = account.Email,
            FullName = account.FullName,

            // User = new
            // {
            //     account.FullName,
            //     account.Email,
            //     RoleName = account.Role?.RoleName ?? "No Role"
            // } 
        });
    }


    [HttpPost("login-admin")]
    public async Task<IActionResult> LoginAdmin([FromBody] LoginRequest request)
    {
        // Kiểm tra đầu vào
        if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest("Email and password are required");
        }
        // Tìm tài khoản dựa trên email
        var account = await _context.Accounts
           .Include(a => a.Role)  // Thêm dòng này để load Role
           .FirstOrDefaultAsync(a => a.Email == request.Email && a.RoleId == 1 && a.IsActive == true);
        if (account == null)
        {
            return Unauthorized("Invalid credentials");
        }
        // So sánh mật khẩu đã mã hóa
        if (!BCrypt.Net.BCrypt.Verify(request.Password, account.Password))
        {
            return Unauthorized("Invalid credentials");
        }

        var isLoggerIn = true;
        var dataUser = new
        {
            accountId = account.AccountId,
            email = account.Email,
            role = account.Role?.RoleName ?? "No Role",
            fullName = account.FullName
        };

        // Serialize the dataUser object to a JSON string
        var dataUserJson = JsonSerializer.Serialize(dataUser);

        // Set cookie with JSON string and expiration time of 1 hour
        Response.Cookies.Append("dataUser", dataUserJson, new CookieOptions
        {
            HttpOnly = false,
            SameSite = SameSiteMode.None,
            Secure = true,
            Expires = DateTimeOffset.UtcNow.AddHours(1)
        });

        Response.Cookies.Append("isLoggedIn", isLoggerIn.ToString(), new CookieOptions
        {
            HttpOnly = false,
            SameSite = SameSiteMode.None,
            Secure = true,
            Expires = DateTimeOffset.UtcNow.AddHours(1)
        });
        return Ok(new AuthResponseDto
        {
            // Token = jwt,
            IsSuccess = true,
            Message = "Login successful",
            Role = account.Role?.RoleName ?? "No Role",
            AccountId = account.AccountId,
            Email = account.Email,
            FullName = account.FullName,

            // User = new
            // {
            //     account.FullName,
            //     account.Email,
            //     RoleName = account.Role?.RoleName ?? "No Role"
            // } 
        });
    }

}