using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication5.Concrete.Entities
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }
        public string ProductImage { get; set; }
        public int CategoryId { get; set; }
    }
}