
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Domain.Repositories;

public interface IUserRepository : IRepository<User, Guid>
{
    Task<User?> GetByEmailAsync(string email);
    Task<int> CountByRoleAsync(Role role = Role.All);
    Task<List<User>> GetUsersByFullnameOrEmail(string keyword, Role role = Role.All, int offset = 1, int count = 10);
}
