using WebApi.Domain.src.Shared;

namespace WebApi.Domain.src.Abstractions
{
    public interface IBaseRepo<T>
    {
        Task<IEnumerable<T>> GetAll(QueryOptions queryOptions);
        Task<T> GetOneById(string id);
        Task<T> UpdateOneById(T origunalEntity, T updatedEntity);
        Task<bool> DeleteOneById(T entity);
        Task<T> CreateOne(T entity);
    }
}