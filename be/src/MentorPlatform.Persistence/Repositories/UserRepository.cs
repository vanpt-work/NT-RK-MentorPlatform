
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MentorPlatform.Persistence.Repositories;

public class UserRepository : Repository<User, Guid>, IUserRepository
{
    public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        return _dbSet.Where(u => u.Email == email)
            .Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync();
    }

    public Task<List<User>> GetAllUsersAsync()
    {
        return _dbSet
            .Include(u => u.UserDetail)
            .ToListAsync();
    }

    public Task<List<User>> GetUsersAsync(int offset, int count)
    {
        return _dbSet
            .OrderBy(u => u.Id)
            .Skip(offset - 1)
            .Take(count)
            .ToListAsync();
    }

    public Task<List<User>> GetUsersByRoleAsync(Role role, int offset, int count)
    {
        return _dbSet
            .Where(u => u.Role == role)
            .OrderBy(u => u.Id)
            .Skip(offset - 1)
            .Take(count)
            .ToListAsync();
    }

}
