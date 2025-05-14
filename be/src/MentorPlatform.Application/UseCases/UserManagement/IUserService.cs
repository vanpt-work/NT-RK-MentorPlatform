using MentorPlatform.Application.Commons.Models.Responses;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.UserManagement;
public interface IUserService
{
    public Task<PaginationResult<UserResponse>> GetPaginationUsers(int offset, int quantity)
}
