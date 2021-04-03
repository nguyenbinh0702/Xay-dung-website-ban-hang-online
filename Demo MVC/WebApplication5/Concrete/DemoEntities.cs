using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication5.Concrete.Entities;

namespace WebApplication5.Concrete
{
    public class DemoEntities : DbContext
    {
        public DemoEntities()
            : base("Server=202.92.4.212;Database=Demo;User Id=demosql;Password=ancDff@fjd12;")
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }


    }
}