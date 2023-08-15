using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IProductService : IBaseService<Product, ProductDto>
    {
        
    }
}