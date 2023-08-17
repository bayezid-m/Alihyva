using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Abstractions
{
   public interface IOrderProductService : IBaseService<OrderProduct,OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>
    {
        Task<OrderProduct> CreateOrderProduct(OrderProduct entity);
    }
}