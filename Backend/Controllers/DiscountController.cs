using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using project3api_be.Models;
using project3api_be.Data;

namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DiscountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Discount
        [HttpGet]
        public ActionResult<IEnumerable<Discount>> GetDiscounts()
        {
            return _context.Discounts.ToList();
        }

        // GET: api/Discount/FindByName
        [HttpGet("FindByName")]
        public ActionResult<Discount> FindByName(string name)
        {
            var discount = _context.Discounts
            .Where(d => d.Name.ToUpper() == name.ToUpper() && d.Expires > DateTime.Now && d.Quantity > 0)
            .FirstOrDefault();

            if (discount == null)
            {
                return NotFound();
            }

            return discount;
        }

        // GET: api/Discount/5
        [HttpGet("{id}")]
        public ActionResult<Discount> GetDiscount(int id)
        {
            var discount = _context.Discounts.Find(id);

            if (discount == null)
            {
                return NotFound();
            }

            return discount;
        }

        // POST: api/Discount
        [HttpPost]
        public ActionResult<Discount> PostDiscount(Discount discount)
        {
            _context.Discounts.Add(discount);
            _context.SaveChanges();

            return CreatedAtAction("GetDiscount", new { id = discount.DiscountId }, discount);
        }

        // PUT: api/Discount/5
        [HttpPut("{id}")]
        public IActionResult PutDiscount(int id, Discount discount)
        {
            if (id != discount.DiscountId)
            {
                return BadRequest();
            }

            _context.Entry(discount).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Discount/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDiscount(int id)
        {
            var discount = _context.Discounts.Find(id);
            if (discount == null)
            {
                return NotFound();
            }

            _context.Discounts.Remove(discount);
            _context.SaveChanges();

            return NoContent();
        }
    }
}