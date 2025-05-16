using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Mappings;
using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Responses.AuthResponses;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using System.Data;

namespace MentorPlatform.Application.UseCases.UserManagement;
public class UserServices : IUserServices
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UserServices(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> ChangeUserActive(Guid userId, bool isActive = true)
    {
        var dbUser = await _userRepository.GetByIdAsync(userId);
        if (dbUser == null)
        {
            return Result.Failure(UserErrors.UserNotExists);
        }

        dbUser.IsActive = isActive;
        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result<PaginationResult<UserResponse>>> Search(HasRoleQueryParameters query)
    {
        var keyword = query.Search.Trim().ToLower();
        var dbQuery = _userRepository
            .GetQueryable()
            .Where(u => (query.Role == Role.All || u.Role == query.Role) && (u.UserDetail.FullName.ToLower().Contains(keyword) || u.Email.ToLower().Contains(keyword)));
        var dbUsers = await _userRepository
            .ToListAsync(dbQuery.OrderBy(u => u.Id)
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize), nameof(User.UserDetail));
        var userCount = await _userRepository.CountAsync(dbQuery);
        var pagination = new PaginationResult<UserResponse>(query.PageSize, query.PageNumber, userCount, dbUsers.Select(user => user.ToResponse()).ToList());
        return pagination;
    }
}
