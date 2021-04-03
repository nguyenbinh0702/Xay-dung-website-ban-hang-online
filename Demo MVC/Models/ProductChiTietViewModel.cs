using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication5.Concrete.Entities;

namespace WebApplication5.Models
{
    public class ProductChiTietViewModel
    {
        //thông tin sản phẩm
        public Product Product { get; set; }
        //các sản phẩm khác
        public List<Product> LinkingProduct { get; set; }
    }
}