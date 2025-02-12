using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project3api_be.Models;

namespace project3api_be.Dtos
{
    public class RecipesRequestDto
    {
        public string RecipeName { get; set; } = null!;
        public string ImageLink { get; set; } = null!;  
        public string Content { get; set; } = null!;
        public string SubmittedBy { get; set; } = null!;
        public string Status { get; set; } = "pending";
    }
}