using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project3api_be.Dtos
{
    public class VnPaymentResponseDto
    {
        public bool Success { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderDescription { get; set; }
        public string OrderId { get; set; }
        public string PaymentId { get; set; }
        public string TransactionId { get; set; }
        public string Token { get; set; }
        public string VnPayResponseCode { get; set; }
        public string Message { get; set; }

        public string OrderInfo { get; set; }
    }
}