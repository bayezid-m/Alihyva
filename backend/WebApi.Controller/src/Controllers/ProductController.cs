using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Controller.src.Controllers
{
    public class ProductController : CrudController<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService) : base(productService)
        {
            _productService = productService;
        }
    }
}