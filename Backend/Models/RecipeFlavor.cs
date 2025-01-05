using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project3api_be.Models;

public partial class RecipeFlavor
{
    [Key]
    [Column("recipe_flavor_id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RecipeFlavorId { get; set; }
    [Column("recipe_id")]
    public int RecipeId { get; set; }
    [Column("flavor_id")]
    public int FlavorId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;
    public virtual Flavor Flavor { get; set; } = null!;
}