using Microsoft.EntityFrameworkCore;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Shared;
using WebApi.WebApi.src.Database;

namespace WebApi.WebApi.src.RepoImplementations
{
    public class BaseRepo<T> : IBaseRepo<T> where T : class
    {
        private readonly DbSet<T> _dbSet;
        private readonly DatabaseContext _context;
        public BaseRepo(DatabaseContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
            _context = dbContext;
        }
        public Task<T> CreateOne(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteOneById(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAll(QueryOptions queryOptions)
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetOneById(string id)
        {
            return await _dbSet.FindAsync(id);
        }

        public Task<T> UpdateOneById(T origunalEntity, T updatedEntity)
        {
            throw new NotImplementedException();
        }
    }
}