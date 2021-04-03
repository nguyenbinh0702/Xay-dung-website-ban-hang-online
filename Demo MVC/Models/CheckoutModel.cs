using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication5.Models
{
    public class CheckoutModel
    {
        [Display(Name = "Họ tên")]
        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập email")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Email không đúng định dạng")]
        public string Email { get; set; }

        [Display(Name = "Điện thoại")]
        [Required]
        public string Phone { get; set; }

        [Display(Name = "Địa chỉ nhận hàng")]
        [Required]
        public string ShipTo { get; set; }

        [Display(Name = "Phương thức thanh toán")]
        [Required]
        public int PaymentMethod { get; set; }
    }
}