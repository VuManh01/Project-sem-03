using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project3api_be.Models;
[Table("recipe")]
public partial class Recipe
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("recipe_id")]
    public int RecipeId { get; set; }

    [Column("recipe_name")]
    public string RecipeName { get; set; } = null!;

    [Column("difficulty")]
    public string Difficulty { get; set; } = "Easy";

    [Column("content")]
    public string Content { get; set; } = null!;

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
}
