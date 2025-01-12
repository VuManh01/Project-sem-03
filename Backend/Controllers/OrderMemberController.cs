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
    public class OrderMemberController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public OrderMemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderMember
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMembership>>> GetOrderMemberships()
        {
            return await _context.Set<OrderMembership>().ToListAsync();
        }

        // GET: api/OrderMember/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMembership>> GetOrderMembership(int id)
        {
            var orderMembership = await _context.Set<OrderMembership>().FindAsync(id);

            if (orderMembership == null)
            {
                return NotFound();
            }

            return orderMembership;
        }

        // PUT: api/OrderMember/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMembership(int id, OrderMembership orderMembership)
        {
            if (id != orderMembership.OrderMembershipId)
            {
                return BadRequest();
            }

            _context.Entry(orderMembership).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMembershipExists(id))
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

        // POST: api/OrderMember
        [HttpPost]
        public async Task<ActionResult<OrderMembership>> PostOrderMembership(OrderMembership orderMembership)
        {
            _context.Set<OrderMembership>().Add(orderMembership);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMembership", new { id = orderMembership.OrderMembershipId }, orderMembership);
        }

        // DELETE: api/OrderMember/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMembership(int id)
        {
            var orderMembership = await _context.Set<OrderMembership>().FindAsync(id);
            if (orderMembership == null)
            {
                return NotFound();
            }

            _context.Set<OrderMembership>().Remove(orderMembership);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMembershipExists(int id)
        {
            return _context.Set<OrderMembership>().Any(e => e.OrderMembershipId == id);
        }
    }
}