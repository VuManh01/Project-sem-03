using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using project3api_be.Data;
using project3api_be.Dtos;
using project3api_be.Models;
using RestSharp;

namespace project3api_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _clientId;
        public RecipeController(ApplicationDbContext context, IOptions<ImgurSettings> options)
        {
            _context = context;
            _clientId = "d64d984f60efcb1";
        }

        // GET: api/Recipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        // GET: api/Recipe/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipe;
        }

        // POST: api/Recipe/image/upload
        [HttpPost("image/upload")]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                try
                {
                    using var memoryStream = new MemoryStream();
                    await image.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    var base64Image = Convert.ToBase64String(fileBytes);

                    // Tạo client để upload ảnh lên Imgur
                    var client = new RestClient("https://api.imgur.com/3/upload");
                    var request = new RestRequest("/", Method.Post);
                    request.AddHeader("Authorization", $"Client-ID {_clientId}");
                    request.AddParameter("image", base64Image);

                    // Gửi yêu cầu và lấy phản hồi
                    var response = await client.ExecuteAsync(request);

                    if (response.IsSuccessful)
                    {
                        var imgurResponse = System.Text.Json.JsonDocument.Parse(response.Content);
                        var imgUrl = imgurResponse.RootElement.GetProperty("data").GetProperty("link").GetString();
                        return Ok(new { imgUrl });
                    }
                    else
                    {
                        // Lỗi từ API Imgur
                        Console.WriteLine("Error uploading image to Imgur: " + response.Content);
                        return BadRequest("Error uploading image to Imgur");
                    }
                }
                catch (Exception ex)
                {
                    // Xử lý lỗi upload ảnh
                    Console.WriteLine("Error uploading image: " + ex.Message);
                    return BadRequest("Error uploading image");
                }
            }
            else
            {
                Console.WriteLine("No image uploaded");
                return BadRequest("No image uploaded");
            }
        }

        // POST: api/Recipe
        [HttpPost]
        public async Task<ActionResult<Recipe>> PostRecipe([FromBody] RecipesRequestDto recipesRequestDto)
        {
            //step 1: create recipe
            var recipe = new Recipe
            {
                RecipeName = recipesRequestDto.RecipeName,
                Difficulty = recipesRequestDto.Difficulty,
                SubmittedBy = recipesRequestDto.SubmittedBy,
                Status = recipesRequestDto.Status,
                IsPost = recipesRequestDto.IsPost,
                Rating = recipesRequestDto.Rating,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            //step 2: upload more image
            //step 3: save recipe_flavour
            //step 4: save recipe


            return CreatedAtAction(nameof(GetRecipe), new { id = recipe.RecipeId }, recipe);
        }

        // PUT: api/Recipe/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, Recipe recipe)
        {
            if (id != recipe.RecipeId)
            {
                return BadRequest();
            }

            _context.Entry(recipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeExists(id))
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

        // DELETE: api/Recipe/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.RecipeId == id);
        }
    }
}