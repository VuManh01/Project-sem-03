using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project3api_be.Dtos
{
   public class BookPurchaseDto
    {
    internal decimal total_price;
    public int BookId { get; set; }
    public string email { get; set; }
    public string phone_number { get; set; }
    public string full_name { get; set; }
    public string delivery_address { get; set; }
    public int discountId { get; set; } 
    }
}