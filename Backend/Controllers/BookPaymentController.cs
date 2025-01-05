using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend_asp.net_sem3_withVnpay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookPaymentController : ControllerBase
    {
        // GET: api/BookPayment
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            // Logic to get all payments
            return Ok(new { message = "Get all payments" });
        }

        // GET: api/BookPayment/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            // Logic to get a payment by id
            return Ok(new { message = $"Get payment with id {id}" });
        }

        // POST: api/BookPayment
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentModel payment)
        {
            // Logic to create a new payment
            return Ok(new { message = "Payment created", payment });
        }

        // PUT: api/BookPayment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymentModel payment)
        {
            // Logic to update a payment by id
            return Ok(new { message = $"Payment with id {id} updated", payment });
        }

        // DELETE: api/BookPayment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            // Logic to delete a payment by id
            return Ok(new { message = $"Payment with id {id} deleted" });
        }
    }

    public class PaymentModel
    {
        public int Id { get; set; }
        public string PaymentMethod { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
    }
}