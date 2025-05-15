
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Repositories;

public interface IRepository<TEntity, TKey> : IConcurrencyHandler
where TEntity : IHasKey<TKey>
{
    IQueryable<TEntity> GetQueryable();
    Task<TEntity?> GetByIdAsync(TKey id, params string[] includes);
    Task<List<TEntity>> GetByIdsAsync(List<TKey> ids, params string[] includes);
    void Add(TEntity entity);
    void Remove(TEntity entity);
    void Update(TEntity entity);
    void AddRange(IEnumerable<TEntity> entities);
    void UpdateRange(IEnumerable<TEntity> entities); 

    Task<T?> FirstOrDefaultAsync<T>(IQueryable<T> query);

    Task<T?> SingleOrDefaultAsync<T>(IQueryable<T> query);

    Task<List<T>> ToListAsync<T>(IQueryable<T> query);

}
