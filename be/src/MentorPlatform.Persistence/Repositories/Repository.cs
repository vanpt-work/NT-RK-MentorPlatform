
using MentorPlatform.Domain.Primitives;
using MentorPlatform.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MentorPlatform.Persistence.Repositories;

public class Repository<TEntity, TKey> : IRepository<TEntity, TKey>
where TEntity : class, IHasKey<TKey>
{
    private readonly ApplicationDbContext _dbContext;
    protected readonly DbSet<TEntity> _dbSet;
    public Repository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<TEntity>();  
    }
    public bool IsDbUpdateConcurrencyException(Exception ex)
    {
        return ex is DbUpdateConcurrencyException;
    }

    public async Task ApplyUpdatedValuesFromDataSource(Exception ex)
    {
        var concurrencyException = (ex as DbUpdateConcurrencyException);
        var bookEntry = concurrencyException!.Entries?.Where(entity => entity.Entity is TEntity)?.ToList();
        if (bookEntry != null)
        {
            foreach (var entry in bookEntry)
            {

                var databaseValues = await entry.GetDatabaseValuesAsync();
                if (databaseValues != null)
                {
                    entry.OriginalValues.SetValues(databaseValues);
                    entry.CurrentValues.SetValues(databaseValues);
                }

            }
        }
    }

    public IQueryable<TEntity> GetQueryable()
    {
        return _dbContext.Set<TEntity>().AsNoTracking();
    }

    public Task<TEntity?> GetByIdAsync(TKey id, params string[] includes)
    {
        var entity = _dbContext.Set<TEntity>().Where(e => e.Id!.Equals(id));
        foreach (var include in includes)
        {
            entity = entity.Include(include);   
        }

        return entity.FirstOrDefaultAsync();
    }

    public Task<List<TEntity>> GetByIdsAsync(List<TKey> ids, params string[] includes)
    {
        var entity = _dbContext.Set<TEntity>().Where(e => ids.Contains(e.Id));
        foreach (var include in includes)
        {
            entity = entity.Include(include);
        }

        return ToListAsync(entity);
    }

    public void Add(TEntity entity)
    {
        _dbContext.Add(entity);
    }


    public void Remove(TEntity entity)
    {
        _dbContext.Remove(entity);
    }

    public void Update(TEntity entity)
    {
        _dbContext.Update(entity);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
        {
            Add(entity);
        }
    }

    public void UpdateRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities)
        {
            Update(entity);
        }
    }

    public Task<T?> FirstOrDefaultAsync<T>(IQueryable<T> query)
    {
        return query.FirstOrDefaultAsync();
    }

    public Task<T?> SingleOrDefaultAsync<T>(IQueryable<T> query)
    {
        return query.SingleOrDefaultAsync();
    }

    public Task<List<T>> ToListAsync<T>(IQueryable<T> query)
    {
        return query.ToListAsync();
    }
}
