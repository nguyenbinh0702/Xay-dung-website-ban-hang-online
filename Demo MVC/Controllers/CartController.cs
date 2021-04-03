using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WebApplication5.Abstract;
using WebApplication5.Concrete;
using WebApplication5.Concrete.Entities;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    public class CartController : Controller
    {
        private readonly IMainRepository _mainRepository;
        public CartController(IMainRepository mainRepository)
        {
            _mainRepository = mainRepository;
        }

        // GET: Cart
        public ActionResult Index()
        {
            var cart = GetCart();

            return View(cart);
        }

        [HttpPost] //post method
        public ActionResult AddToCart(AddToCartModel model)
        //public ActionResult AddToCart(int productId, int quantity)
        {
            //check product exsit && amount > quantity
            var product = _mainRepository
                .Products
                .FirstOrDefault(x => x.ProductId == model.ProductId);

            if(product == null)
            {
                //
                return RedirectToAction("Index");
            }
            //get card of user
            var cart = GetCart();
            //add line
            cart.Add(product, model.Quantity);
            //redirect to view cart
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult RemoveFromCart(int productId)
        {
            var product = _mainRepository.Products
                .FirstOrDefault(x => x.ProductId == productId);

            if(product != null)
            {
                var cart = GetCart();
                cart.Remove(product);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult ClearCart()
        {
            var cart = GetCart();
            cart.Clear();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult UpdateCart(UpdateCartModel model)
        {
            var product = _mainRepository.Products
                .FirstOrDefault(x => x.ProductId == model.ProductId);

            if(product != null)
            {
                var cart = GetCart();
                cart.Update(product, model.Quantity);
            }

            return RedirectToAction("Index");
        }

        public ActionResult Checkout()
        {
            var cart = GetCart();

            if(cart.LineCollection.Count() == 0)
            {
                return RedirectToAction("Index");
            }

            ViewBag.YourCart = cart;
            ViewBag.PaymentMethods = _mainRepository.PaymentMethods.ToList();

            return View();
        }

        [HttpPost]
        public ActionResult Checkout(CheckoutModel model)
        {
            //kiểm tra giỏ hàng hoặc 1 số ràng buộc mà model không thể check
            var cart = GetCart();
            if(cart.LineCollection.Count() == 0)
            {
                ModelState.AddModelError("", "Giỏ hàng không được để trống");
            }
            //kiểm tra model có hợp lệ hay ko?
            if (ModelState.IsValid)
            {
                //save db
                //customer
                var customer = new Customer()
                {
                    Address = model.ShipTo,
                    Avatar = " ",
                    CustomerName = model.FullName,
                    Email = model.Email,
                    Phone = model.Phone,
                    ProvinceId = 1
                };

                _mainRepository.Add(customer);

                //order
                var order = new Order()
                {
                    CustomerId = customer.CustomerId,
                    OrderDate = DateTime.Now,
                    PaymentMethodId = model.PaymentMethod,
                    ShipTo = model.ShipTo,
                    SubTotal = cart.ComputerTotal()
                };
                _mainRepository.Add(order);

                //order details
                var orderDetails = new List<OrderDetail>();
                foreach(var line in cart.LineCollection)
                {
                    var detail = new OrderDetail()
                    {
                        OrderId = order.OrderId,
                        Quantity = line.Quantity,
                        Price = line.Product.Price,
                        ProductId = line.Product.ProductId
                    };

                    orderDetails.Add(detail);
                }
                _mainRepository.Add(orderDetails);

                //email khách

                string subject = "Thông báo đặt hàng #" + order.OrderId;
                List<string> cc = new List<string>() { "vanvuong.nguyen0408@hotmail.com" };

                StringBuilder sb = new StringBuilder();

                sb.Append($"<h3>Kính chào: {model.FullName}</h3>");
                sb.Append("<p>Đơn hàng của bạn như sau: </p>");

                sb.Append("<table style='border:1px solid #ccc; padding:10px;width:100%'>");
                foreach(var line in cart.LineCollection)
                {
                    sb.Append("<tr>");

                    sb.Append($"<td style='padding:5px'>{line.Product.ProductName}</td>");
                    sb.Append($"<td style='padding:5px'>{line.Product.Price}</td>");
                    sb.Append($"<td style='padding:5px'>{line.Quantity}</td>");
                    sb.Append($"<td style='padding:5px'>{line.Product.Price * line.Quantity}</td>");

                    sb.Append("</tr>");
                }
                sb.Append("</table>");
                sb.Append($"<p>Tổng tiền:<strong>{cart.ComputerTotal()}</strong></p>");
                var pay = _mainRepository.PaymentMethods.FirstOrDefault(x => x.PaymentId == model.PaymentMethod);
                sb.Append($"<p>Hình thức thanh toán: {pay.PaymentName}</p>");
                sb.Append("<p>Nếu có thắc mắc vui lòng liên hệ theo số điện thoại 0914000892</p>");

                var mailSender = new EmailHelper();

                mailSender.Send(model.Email, subject, sb.ToString(), cc);

                //clear
                cart.Clear();
                //lưu thành công thì chuyển về trang thông báo kết quả đặt hàng.
                return RedirectToAction("Completed");
            }
            else
            {
                ModelState.AddModelError("", "Vui lòng nhập đủ dữ liệu.");
            }

            //nếu model lỗi, thì hiển thị lại view Checkout
            return View(model);
        }

        public ViewResult Completed()
        {
            return View();
        }

        //ultilities
        private Cart GetCart()
        {
            var cart = Session["cart"] as Cart;
            if(cart == null)
            {
                cart = new Cart();
                Session["cart"] = cart;
            }
            return cart;
        }
    }
}