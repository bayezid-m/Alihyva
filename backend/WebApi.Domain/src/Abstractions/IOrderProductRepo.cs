using WebApi.Domain.src.Entities;

namespace WebApi.Domain.src.Abstractions
{
    public interface IOrderProductRepo : IBaseRepo<OrderProduct>
    {
         Task<IEnumerable<OrderProduct>> GetAllOrderProduct();
        
    }
}