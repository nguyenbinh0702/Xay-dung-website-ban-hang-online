using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication5.Concrete.Entities;

namespace WebApplication5.Models
{
    public class ProductSanPhamViewModel
    {
        public List<Product> Products { get; set; }

        public List<Category> Categories { get; set; }

        public PagingInfo PagingInfo { get; set; }

        public int CurrentCategory { get; set; }
    }
}