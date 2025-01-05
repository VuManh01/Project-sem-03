using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project3api_be.Models;

public partial class Recipe
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("recipe_id")]
    public int RecipeId { get; set; }

    [Column("recipe_name")]
    public string RecipeName { get; set; } = null!;

    [Column("servings")]
    public int Servings { get; set; }

    [Column("difficulty")]
    public string Difficulty { get; set; } = "Easy";

    [Column("active_time")]
    public decimal ActiveTime { get; set; }

    [Column("inactive_time")]
    public decimal InactiveTime { get; set; }

    [Column("ingredients")]
    public string Ingredients { get; set; } = null!;

    [Column("preparation_method")]
    public string PreparationMethod { get; set; } = null!;

    [Column("submitted_by")]
    public string SubmittedBy { get; set; } = null!;

    [Column("status")]
    public string Status { get; set; } = "pending";

    [Column("is_post")]
    public bool? IsPost { get; set; }

    [Column("rating")]
    public int Rating { get; set; }

    [Column("created_at")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }

    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Flavor> Flavors { get; set; } = new List<Flavor>();

    public ICollection<ImageRecipe> ImageRecipes { get; set; } = new List<ImageRecipe>();
}
