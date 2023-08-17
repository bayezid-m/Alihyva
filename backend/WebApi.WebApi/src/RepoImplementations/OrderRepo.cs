using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImplementations
{
     public class OrderRepo : BaseRepo<Order>, IOrderRepo
    {
        private readonly DbSet<Order> _order;
        private readonly DatabaseContext _context;
        public OrderRepo(DatabaseContext dbContext) : base(dbContext)
        {
            _order = dbContext.Orders;
            _context = dbContext;
        }
    }
}