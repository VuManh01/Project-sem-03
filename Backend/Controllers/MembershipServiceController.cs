using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project3api_be.Data;
using project3api_be.Models;
using project3api_be.Dtos;
namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MembershipServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

       
    // GET: api/MembershipService
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MembershipService>>> GetMembershipServices()
    {
        return await _context.MembershipServices.ToListAsync();
    }

        // GET: api/MembershipService/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MembershipService>> GetMembershipService(int id)
        {
            var membershipService = await _context.MembershipServices.FindAsync(id);

            if (membershipService == null)
            {
                return NotFound();
            }

            return membershipService;
        }

        // POST: api/MembershipService
        [HttpPost]
        public async Task<ActionResult<MembershipService>> CreateMembershipService(MembershipServiceDto membershipServiceDto)
        {
            var membershipService = new MembershipService
            {
                Name = membershipServiceDto.Name,
                DurationInDay = membershipServiceDto.DurationInDay,
                Price = membershipServiceDto.Price,
                Description = membershipServiceDto.Description
            };
            _context.MembershipServices.Add(membershipService);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMembershipService), new { id = membershipService.MembershipServiceId }, membershipService);
        }

        // PUT: api/MembershipService/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMembershipService(int id, MembershipService membershipService)
        {
            if (id != membershipService.MembershipServiceId)
            {
                return BadRequest();
            }

            _context.Entry(membershipService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipServiceExists(id))
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

        // DELETE: api/MembershipService/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembershipService(int id)
        {
            var membershipService = await _context.MembershipServices.FindAsync(id);
            if (membershipService == null)
            {
                return NotFound();
            }


            var orderMemberships = await _context.OrderMemberships.Where(o => o.MembershipServiceId == id).ToListAsync();

            //delete all paymentMemberships of orderMemberships
            foreach (OrderMembership orderMembership in orderMemberships)
            {
                var paymentMemberships = await _context.PaymentMembers.Where(p => p.OrderMembershipId == orderMembership.OrderMembershipId).ToListAsync();
                _context.PaymentMembers.RemoveRange(paymentMemberships);
                await _context.SaveChangesAsync();
            }

            //delete all orderMemberships
            _context.OrderMemberships.RemoveRange(orderMemberships);
            await _context.SaveChangesAsync();

            //delete membershipService
            _context.MembershipServices.Remove(membershipService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MembershipServiceExists(int id)
        {
            return _context.MembershipServices.Any(e => e.MembershipServiceId == id);
        }
    }
}