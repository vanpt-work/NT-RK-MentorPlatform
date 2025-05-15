using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Mappings;
using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Responses.AuthResponses;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using System.Data;

namespace MentorPlatform.Application.UseCases.UserManagement;
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> ActivateUser(Guid userId)
    {
        var dbUser = await _userRepository.GetByIdAsync(userId);
        if (dbUser == null)
        {
            return Result.Failure(UserErrors.UserNotExists);
        }

        dbUser.IsActive = true;
        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result> DeactivateUser(Guid userId)
    {
        var dbUser = await _userRepository.GetByIdAsync(userId);
        if (dbUser == null)
        {
            return Result.Failure(UserErrors.UserNotExists);
        }

        dbUser.IsActive = false;
        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result<PaginationResult<UserResponse>>> Search(HasRoleQueryParameters query)
    {
        var dbUsers = await _userRepository
            .GetUsersByFullnameOrEmail(query.Search.Trim(), query.Role, (query.PageNumber - 1) * query.PageSize + 1, query.PageSize);
        var userCount = dbUsers.Count;
        var pagination = new PaginationResult<UserResponse>(query.PageSize, query.PageNumber, userCount, dbUsers.Select(user => user.ToResponse()).ToList());
        return pagination;
    }
}
