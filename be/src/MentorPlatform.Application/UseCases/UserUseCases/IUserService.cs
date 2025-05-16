using MentorPlatform.Application.Commons.Models;
using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Responses.AuthResponses;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.UserManagement;
public interface IUserService
{
    public Task<Result> ActivateUser(Guid userId);
    public Task<Result> DeactivateUser(Guid userId);
    public Task<Result<PaginationResult<UserResponse>>> Search(UserQueryParameters query);
}
