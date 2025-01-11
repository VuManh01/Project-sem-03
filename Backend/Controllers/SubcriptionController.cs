using Microsoft.AspNetCore.Mvc;
using project3api_be.Models;
using project3api_be.Data;
namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcriptionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubcriptionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Subcription
        [HttpGet]
        public ActionResult<IEnumerable<Subscription>> GetSubcriptions()
        {
            return _context.Subscriptions.ToList();
        }

        // GET: api/Subcription/5
        [HttpGet("{id}")]
        public ActionResult<Subscription> GetSubcription(int id)
        {
            var subcription = _context.Subscriptions.Find(id);

            if (subcription == null)
            {
                return NotFound();
            }

            return subcription;
        }

        // POST: api/Subcription
        [HttpPost]
        public ActionResult<Subscription> PostSubcription(Subscription subcription)
        {
            _context.Subscriptions.Add(subcription);
            _context.SaveChanges();

            return CreatedAtAction("GetSubcription", new { id = subcription.SubId }, subcription);
        }

        // PUT: api/Subcription/5
        [HttpPut("{id}")]
        public IActionResult PutSubcription(int id, Subscription subcription)
        {
            if (id != subcription.SubId)
            {
                return BadRequest();
            }

            _context.Entry(subcription).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Subcription/5
        [HttpDelete("{id}")]
        public IActionResult DeleteSubcription(int id)
        {
            var subcription = _context.Subscriptions.Find(id);
            if (subcription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subcription);
            _context.SaveChanges();

            return NoContent();
        }
    }
}