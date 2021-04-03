using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication5.Concrete.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int CustomerId { get; set; }
        public string ShipTo { get; set; }
        public int PaymentMethodId { get; set; }
        public decimal SubTotal { get; set; }
    }
}