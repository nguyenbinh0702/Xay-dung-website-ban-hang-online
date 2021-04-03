using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication5.Concrete.Entities
{
    public class PaymentMethod
    {
        [Key]
        public int PaymentId { get; set; }
        public string PaymentName { get; set; }
    }
}