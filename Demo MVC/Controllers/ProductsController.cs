using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication5.Abstract;
using WebApplication5.Concrete;
using WebApplication5.Concrete.Entities;
using WebApplication5.Models;

namespace WebApplication5.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IMainRepository _mainRepository;

        public ProductsController(IMainRepository mainRepository)
        {
            _mainRepository = mainRepository;
        }

        // GET: Products
        public ViewResult Index()
        {
            ProductIndexViewModel model = new ProductIndexViewModel();

            //TOP 6
            model.Products = _mainRepository
                .Products
                .OrderByDescending(x => x.ProductId)
                .Take(6)
                .ToList();

            //passing data to view
            return View(model);
        }

        public ViewResult SanPham(
            int page = 1, 
            int pageSize = 6,
            int cat = -1)
        {
            ProductSanPhamViewModel model = new ProductSanPhamViewModel();

            model.Products = _mainRepository
                .Products
                .Where(x => cat == -1 || x.CategoryId == cat)
                .OrderByDescending(x => x.ProductId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            //paging info

            model.PagingInfo = new PagingInfo()
            {
                CurrentPage = page,
                ItemsPerPage = pageSize
            };

            model.PagingInfo.TotalItems = _mainRepository
                .Products
                .Where(x => cat == -1 || x.CategoryId == cat)
                .Count();

            //get categories
            model.Categories = _mainRepository.Categories.ToList();
            //set current category
            model.CurrentCategory = cat;

            return View(model);
        }

        public ViewResult ChiTiet(int productId)
        {
            ProductChiTietViewModel model = new ProductChiTietViewModel();
            //thong tin product
            model.Product = _mainRepository
                .Products
                .FirstOrDefault(x => x.ProductId == productId);
            //cac san pham lien quan
            model.LinkingProduct = _mainRepository
                .Products
                .Where(x => x.ProductId != productId && x.CategoryId == model.Product.CategoryId)
                .Take(6)
                .ToList();

            //passing data to view
            return View(model);
        }
    }
}