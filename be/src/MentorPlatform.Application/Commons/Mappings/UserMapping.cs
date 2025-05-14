using MentorPlatform.Application.Commons.Models.Responses;
using MentorPlatform.Domain.Entities;

namespace MentorPlatform.Application.Commons.Mappings;
public static class UserMapping
{
    public static UserResponse ToResponse(this User user)
    {
        return new UserResponse
        {
            Id = user.Id,
            Email = user.Email,
            Role = user.Role,
            IsActive = user.IsActive,
            IsDeleted = user.IsDeleted,
            IsNotification = user.IsNotification,
            IsPrivateProfile = user.IsPrivateProfile,
            IsReceiveMessage = user.IsReceiveMessage,
            IsVerifyEmail = user.IsVerifyEmail,
            UserDetail = user.UserDetail,
            LastActiveDate = user.LastActiveDate,
        };
    }
}
