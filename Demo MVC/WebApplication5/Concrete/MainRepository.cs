using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication5.Abstract;
using WebApplication5.Concrete.Entities;

namespace WebApplication5.Concrete
{
    public class MainRepository : IMainRepository
    {
        private readonly DemoEntities _context;
        public MainRepository()
        {
            _context = new DemoEntities();
        }

        public IQueryable<Product> Products => _context.Products;

        public IQueryable<Category> Categories => _context.Categories;

        public IQueryable<PaymentMethod> PaymentMethods => _context.PaymentMethods;

        public void Add(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }

        public void Add(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public void Add(List<OrderDetail> orderDetails)
        {
            foreach(var detail in orderDetails)
            {
                _context.OrderDetails.Add(detail);
            }

            _context.SaveChanges();
        }
    }
}