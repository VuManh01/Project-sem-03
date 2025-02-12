using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project3api_be.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project3api_be.Data;

namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderBookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public OrderBookController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderBook
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Set<Order>().ToListAsync();
        }

        // GET: api/OrderBook/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Set<Order>().FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/OrderBook/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/OrderBook
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Set<Order>().Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/OrderBook/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Set<Order>().FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Set<Order>().Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Set<Order>().Any(e => e.OrderId == id);
        }
    }
}