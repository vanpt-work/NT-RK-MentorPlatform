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
            UserDetail = user.UserDetail.ToResponse(),
            LastActive = user.LastActive,
            CreatedAt = user.CreatedAt,
        };
    }

    public static UserDetailResponse ToResponse(this UserDetail userDetail)
    {
        return new UserDetailResponse
        {
            Id = userDetail.Id,
            UserId = userDetail.UserId,
            FullName = userDetail.FullName,
            Bio = userDetail.Bio,
            AvatarUrl = userDetail.AvatarUrl,
            Experience = userDetail.Experience,
            CommunicationPreference = userDetail.CommunicationPreference,
            ProfessionalSkill = userDetail.ProfessionalSkill,
            Goals = userDetail.Goals,
            Duration = userDetail.Duration,
            SessionFrequency = userDetail.SessionFrequency,
            LearningStyle = userDetail.LearningStyle,
            TeachingStyles = userDetail.TeachingStyles,
        };
    }
}
