using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Responses.AuthResponses;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.UserManagement;
public interface IUserServices
{
    public Task<Result> ChangeUserActive(Guid userId, bool isActive = true);
    public Task<Result<PaginationResult<UserResponse>>> Search(HasRoleQueryParameters query);
}
