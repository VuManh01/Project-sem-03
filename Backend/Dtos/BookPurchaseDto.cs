using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project3api_be.Dtos
{
   public class BookPurchaseDto
    {
    public decimal Total_price { get; set; }
    public int BookId { get; set; }
    public string Email { get; set; }
    public string Phone_number { get; set; }
    public string Full_name { get; set; }
    public string Delivery_address { get; set; }
    public int DiscountId { get; set; } 
    }
}