using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project3api_be.Dtos
{
    public class MembershipServiceDto
    {
        public string Name { get; set; } = null!;
        public int DurationInDay { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }

    }
}