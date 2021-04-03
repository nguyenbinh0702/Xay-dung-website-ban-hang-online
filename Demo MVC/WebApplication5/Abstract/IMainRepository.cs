using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication5.Concrete.Entities;

namespace WebApplication5.Abstract
{
    public interface IMainRepository
    {
        IQueryable<Product> Products { get; }
        IQueryable<Category> Categories { get; }
        IQueryable<PaymentMethod> PaymentMethods { get; }

        void Add(Customer customer);
        void Add(Order order);
        void Add(List<OrderDetail> orderDetails);
    }
}
