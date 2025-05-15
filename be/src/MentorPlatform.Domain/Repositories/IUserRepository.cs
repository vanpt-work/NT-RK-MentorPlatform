
using MentorPlatform.Domain.Entities;

namespace MentorPlatform.Domain.Repositories;

public interface IUserRepository : IRepository<User, Guid>
{
    Task<User?> GetByEmailAsync(string email);
    
}
