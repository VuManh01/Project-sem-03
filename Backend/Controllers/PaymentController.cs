using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project3api_be.Data;
using project3api_be.Helpers;
using project3api_be.Models;
using project3api_be.Services;
using project3api_be.Dtos;



namespace project3api_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly ApplicationDbContext _context;

        public PaymentController(IVnPayService vnPayService, ApplicationDbContext context)
        {
            _vnPayService = vnPayService;
            _context = context;

        }

        // [HttpPost("create-payment")]
        // public async Task<IActionResult> CreatePayment([FromBody] VnPayRequestDto request)
        // {
        //     try
        //     {
        //         // Test data mẫu
        //         var testRequest = new VnPayRequestDto
        //         {
        //             OrderId = DateTime.Now.Ticks.ToString(), // Tạo mã đơn hàng unique
        //             FullName = "Test User",
        //             Description = "Test Payment",
        //             Amount = 10000, // 10,000 VND
        //             CreatedDate = DateTime.Now
        //         };
        //         var paymentUrl = await _vnPayService.CreatePaymentUrl(HttpContext, testRequest, "Book");
        //         return Ok(new { paymentUrl });
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

        // [HttpGet("payment-callback")]
        // public async Task<IActionResult> PaymentCallback()
        // {
        //       try
        //    {
        //        var response = await _vnPayService.PaymentExecute(Request.Query);
        //        // Log response để debug
        //        Console.WriteLine($"VNPay Response: {System.Text.Json.JsonSerializer.Serialize(response)}");
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Payment Callback Error: {ex.Message}");
        //             return BadRequest(new { message = ex.Message });
        //         }
        //     }


        [HttpPost("purchase-membership")]
        public async Task<IActionResult> PurchaseMembership([FromBody] MembershipPurchaseDto request)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // 1. Tạo order_membership
                var orderMembership = new OrderMembership
                {
                    MembershipServiceId = request.MembershipServiceId,
                    Price = request.Price,
                    Status = "pending",
                    OrderStatus = "pending",
                    CreatedAt = DateTime.Now
                };
                _context.OrderMembership.Add(orderMembership);
                await _context.SaveChangesAsync();

                var membershipService = await _context.MembershipServices
                    .FirstOrDefaultAsync(ms => ms.MembershipServiceId == request.MembershipServiceId);

                // 2. Tạo payment_member và liên kết với order_membership
                var paymentMember = new PaymentMember
                {
                    OrderMembershipId = orderMembership.OrderMembershipId, // Sử dụng order_membership_id vừa tạo
                    PaymentType = membershipService.Name.Trim(),
                    CreatedAt = DateTime.Now
                };
                _context.PaymentMembers.Add(paymentMember);
                await _context.SaveChangesAsync();

                // 3. Tạo VNPay payment URL
                var paymentRequest = new VnPayRequestDto
                {
                    OrderId = orderMembership.OrderMembershipId.ToString(),
                    Amount = (int)(request.Price * 100),
                    Description = "Membership Payment",
                    FullName = "Anonymous User",
                    CreatedDate = DateTime.Now,
                    PaymentType = PaymentType.Membership.ToString()
                };

                var paymentUrl = await _vnPayService.CreatePaymentUrl(HttpContext, paymentRequest);
                await transaction.CommitAsync();
                return Ok(new { paymentUrl });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error in PurchaseMembership: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost("purchase-book")]
        public async Task<IActionResult> PurchaseBook([FromBody] BookPurchaseDto bookPurchaseDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                //1: create orders status pending and order details
                var order = new Order
                {
                    FullName = bookPurchaseDto.full_name,
                    Email = bookPurchaseDto.email,
                    PhoneNumber = bookPurchaseDto.phone_number,
                    DeliveryAddress = bookPurchaseDto.delivery_address,
                    TotalPrice = bookPurchaseDto.total_price,
                    DiscountId = bookPurchaseDto.discountId,
                    Status = "pending",
                };
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                //2: create order details
                var order_detail = new OrderDetail
                {
                    OrderId = order.OrderId,
                    BookId = bookPurchaseDto.BookId,
                    Quantity = 1,
                    Price = bookPurchaseDto.total_price,
                };
                _context.OrderDetails.Add(order_detail);
                await _context.SaveChangesAsync();

                //3: create payment
                var payment = new Payment
                {
                    OrderId = order.OrderId,
                    PaymentStatus = "pending",
                    CreatedAt = DateTime.Now
                };

                // 4. Tạo VNPay payment URL
                var paymentRequest = new VnPayRequestDto
                {
                    OrderId = order.OrderId.ToString(),
                    Amount = (int)(bookPurchaseDto.total_price * 100),
                    Description = "Book Payment",
                    FullName = bookPurchaseDto.full_name,
                    CreatedDate = DateTime.Now,
                    PaymentType = PaymentType.Book.ToString()
                };

                var paymentUrl = await _vnPayService.CreatePaymentUrl(HttpContext, paymentRequest);
                await transaction.CommitAsync();
                return Ok(new { paymentUrl });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error in PurchaseBook: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("payment-callback")]
        public async Task<IActionResult> PaymentCallback()
        {
            var message = "Payment completed";
            int orderId;
            string orderInfo;
            string paymentStatus = "success";
            try
            {
                var response = await _vnPayService.PaymentExecute(Request.Query);
                orderInfo = response.OrderInfo;
                // Log response để debug
                Console.WriteLine($"VNPay Response: {System.Text.Json.JsonSerializer.Serialize(response)}");

                //get type of payment
                var responseSplit = response.OrderInfo.Split(" - ");
                Console.WriteLine($"responseSplit: {responseSplit}");
                var paymentType = responseSplit[2].Split(":")[1];

                if (paymentType == PaymentType.Book.ToString())
                {
                    //book
                    // Tìm order liên quan đến OrderId từ response
                    orderId = int.Parse(response.OrderId); // Chuyển đổi sang int
                    var order = await _context.Orders
                        .FirstOrDefaultAsync(o => o.OrderId == orderId);
                    var payment = await _context.Payments
                        .FirstOrDefaultAsync(p => p.OrderId == orderId);
                    var book = await _context.Books
                        .FirstOrDefaultAsync(b => b.BookId == order.OrderDetails.FirstOrDefault().BookId);

                    if (payment == null)
                    {
                        if (response.Success)
                        {
                            payment.PaidAt = DateTime.Now;
                            payment.UpdatedAt = DateTime.Now;
                            payment.PaymentStatus = "success";
                            message = "Payment completed";
                            paymentStatus = "success";
                        }
                        else
                        {
                            payment.PaymentStatus = "error";
                            message = "Payment failed";
                            paymentStatus = "error";
                        }
                    }

                    if (order != null && payment != null && book != null && response.Success)
                    {
                        // Nếu thanh toán thành công, cập nhật trạng thái Order thành 'complete'
                        if (book.StockQuantity > 0 && response.Success)
                        {
                            book.StockQuantity -= 1;
                            order.Status = "completed"; // Hoàn thành trong Orders
                            order.UpdatedAt = DateTime.Now;
                        }
                        else
                        {
                            order.Status = "error"; // Thất bại trong Orders
                            order.UpdatedAt = DateTime.Now;
                        }
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    //membership
                    // Tìm OrderMembership liên quan đến OrderId từ response
                    var orderMembershipId = int.Parse(response.OrderId); // Chuyển đổi sang int
                    var orderMembership = await _context.OrderMembership
                        .FirstOrDefaultAsync(om => om.OrderMembershipId == orderMembershipId);
                    var paymentMember = await _context.PaymentMembers
                        .FirstOrDefaultAsync(pm => pm.OrderMembershipId == orderMembershipId);
                    orderId = orderMembershipId;
                    if (orderMembership != null)
                    {
                        // Nếu thanh toán thành công, cập nhật trạng thái Order thành 'complete'
                        if (response.Success)
                        {
                            paymentMember.PaidAt = DateTime.Now;
                            paymentMember.UpdatedAt = DateTime.Now;
                            orderMembership.OrderStatus = "completed"; // Hoàn thành trong OrderMembership
                            orderMembership.UpdatedAt = DateTime.Now;
                            paymentStatus = "success";
                            message = "Payment completed";
                        }
                        else
                        {
                            orderMembership.OrderStatus = "error"; // Thất bại trong OrderMembership
                            orderMembership.UpdatedAt = DateTime.Now;
                            paymentStatus = "error";
                            message = "Payment failed";
                        }

                        await _context.SaveChangesAsync();
                    }
                }
                return Ok("<html><body>" +
                "<script>" +
                "window.opener.postMessage(" +
                "{ message: '" + message + "', orderId: '" + orderId + "', orderInfo: '" + orderInfo + "' , paymentStatus: '" + paymentStatus + "'}, '*');" +
                "window.close();" +  // Đóng popup sau khi gửi dữ liệu
                "</script>" +
                "</body></html>");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Payment Callback Error: {ex.Message}");
                return BadRequest(new { message = ex.Message });
            }
        }

        // using check order id on signup page 
        [HttpGet("check-membership")]
        public async Task<IActionResult> CheckMembership([FromBody] int orderId)
        {
            var orderMembership = await _context.OrderMembership
                .FirstOrDefaultAsync(om => om.OrderMembershipId == orderId);

            if (orderMembership != null)
            {
                return Ok();
            }
            return BadRequest();
        }

        // using check order id on signup page 
        [HttpGet("check-book")]
        public async Task<IActionResult> CheckBook([FromBody] int orderId)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order != null)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
    public enum PaymentType
    {
        Membership,
        Book
    }
}
