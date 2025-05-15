
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
            .Include(u => u.UserDetail)
            .FirstOrDefaultAsync();
    }

    public Task<List<User>> GetAllUsersAsync()
    {
        return _dbSet
            .Include(u => u.UserDetail)
            .ToListAsync();
    }

    public Task<int> CountByRoleAsync(Role role = Role.All)
    {
        if (role == Role.All)
        {
            return _dbSet.CountAsync();
        }
        else
        {
            return _dbSet.CountAsync(u => u.Role == role);
        }
    }

    public Task<List<User>> GetUsersByFullnameOrEmail(string keyword, Role role = Role.All, int offset = 1, int count = 10)
    {
        if (role != Role.All)
        {
            return _dbSet
                .Include(u => u.UserDetail)
                .Where(u => u.Role == role)
                .Where(u => EF.Functions.Like(u.UserDetail.FullName.ToLower(), $"%{keyword.ToLower()}%")
                                || EF.Functions.Like(u.Email.ToLower(), $"%{keyword.ToLower()}%"))
                .OrderBy(u => u.Id)
                .Skip(offset - 1)
                .Take(count)
                .ToListAsync();
        }
        else
        {
            return _dbSet
                .Include(u => u.UserDetail)
                .Where(u => EF.Functions.Like(u.UserDetail.FullName.ToLower(), $"%{keyword.ToLower()}%")
                                || EF.Functions.Like(u.Email.ToLower(), $"%{keyword.ToLower()}%"))
                .OrderBy(u => u.Id)
                .Skip(offset - 1)
                .Take(count)
                .ToListAsync();
        }
    }
}
