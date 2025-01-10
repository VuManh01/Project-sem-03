using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using project3api_be.Models;
using project3api_be.Data;
namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Feedback
        [HttpGet]
        public ActionResult<IEnumerable<Feedback>> GetFeedbacks()
        {
            return _context.Feedbacks.ToList();
        }

        // GET: api/Feedback/5
        [HttpGet("{id}")]
        public ActionResult<Feedback> GetFeedback(int id)
        {
            var feedback = _context.Feedbacks.Find(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return feedback;
        }

        // POST: api/Feedback
        [HttpPost]
        public ActionResult<Feedback> PostFeedback(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();

            return CreatedAtAction("GetFeedback", new { id = feedback.FeedbackId }, feedback);
        }
    }
}
