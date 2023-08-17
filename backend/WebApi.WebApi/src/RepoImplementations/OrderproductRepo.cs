using Microsoft.EntityFrameworkCore;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImplementations
{
     public class OrderProductRepo : BaseRepo<OrderProduct>, IOrderProductRepo
    {
         private readonly DatabaseContext _dbContext;
        private readonly DbSet<OrderProduct> _orderProducts;

        public OrderProductRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
            _orderProducts = dbContext.OrderProducts;
        }
        public override async Task<OrderProduct> CreateOne(OrderProduct entity)
        {
            return await base.CreateOne(entity);
        }

        public async Task<IEnumerable<OrderProduct>> GetAllOrderProduct()
        {
            return await _orderProducts.AsNoTracking().ToArrayAsync();
        }
    }
}