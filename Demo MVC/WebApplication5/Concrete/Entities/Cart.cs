using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication5.Concrete.Entities
{
    public class Cart
    {
        public List<CartLine> LineCollection { get; private set; }

        public Cart()
        {
            LineCollection = new List<CartLine>();
        }

        //add line
        public void Add(Product product, int quantity)
        {
            var line = LineCollection
                .FirstOrDefault(x => x.Product.ProductId == product.ProductId);

            if (line == null)
            {
                line = new CartLine()
                {
                    Product = product,
                    Quantity = quantity
                };

                LineCollection.Add(line);
            }
            else
            {
                line.Quantity += quantity;
            }
        }
        //update line
        public void Update(Product product, int quantity)
        {
            var line = LineCollection
                .FirstOrDefault(x => x.Product.ProductId == product.ProductId);

            if(line != null)
            {
                line.Quantity = quantity;
            }
            
        }
        //remove line
        public void Remove(Product product)
        {
            var line = LineCollection
                .FirstOrDefault(x => x.Product.ProductId == product.ProductId);
            if(line != null)
            {
                LineCollection.Remove(line);
            }
        }
        
        //clear
        public void Clear()
        {
            LineCollection.Clear();
        }

        //computer total
        public decimal ComputerTotal()
        {
            return LineCollection.Sum(x => x.Product.Price * x.Quantity);
        }
    }
}