using MentorPlatform.Application.Commons.Models.Requests.AuthRequests;
using MentorPlatform.Application.Commons.Models.Responses.AuthResponses;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Mappings;
public static class UserMappings
{
    public static UserResponse ToResponse(this User user)
    {
        var isRequestPending = user.ApplicationRequests != null && user.ApplicationRequests.Any() && user.ApplicationRequests.MaxBy(r => r.ModifiedAt).IsApproved == null;
        return new UserResponse
        {
            Id = user.Id,
            Email = user.Email,
            Role = user.Role,
            Status = user.IsActive ? UserStatus.Active : (isRequestPending ? UserStatus.PendingForApproval : UserStatus.Inactive),
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
            CommunicationPreference = (int)userDetail.CommunicationPreference,
            ProfessionalSkill = userDetail.ProfessionalSkill,
            Goals = userDetail.Goals,
            Duration = userDetail.Duration,
            SessionFrequency = (int)userDetail.SessionFrequency,
            LearningStyle = userDetail.LearningStyle != null ? (int)userDetail.LearningStyle : null,
            TeachingStyles = userDetail.TeachingStyles is null ? null : userDetail.TeachingStyles?.Select(v => (int)v).ToList(),
        };
    }

    public static User ToUser(this RegisterRequest registerRequest)
    {
        var user = new User
        {
            Email = registerRequest.Email,
            Password = HashingHelper.HashData(registerRequest.Password),
            Role = (Role)registerRequest.Role,
            IsNotification = registerRequest.IsNotification,
            IsPrivateProfile = registerRequest.IsPrivateProfile,
            IsReceiveMessage = registerRequest.IsReceiveMessage
        };
        user.UserDetail = new UserDetail
        {
            FullName = registerRequest.FullName,
            Bio = registerRequest.Bio,
            Experience = registerRequest.Experience,
            CommunicationPreference = registerRequest.CommunicationPreference is not null
                ? (CommunicationPreference)registerRequest.CommunicationPreference.Value
                : default,
            ProfessionalSkill = registerRequest.ProfessionalSkill,
            Goals = registerRequest.Goals,
            Duration = registerRequest.Duration,
            SessionFrequency = (SessionFrequency)registerRequest.SessionFrequency,
            LearningStyle = registerRequest.LearningStyle is not null
                ? (LearningStyle?)registerRequest.LearningStyle.Value
                : null,
            TeachingStyles = registerRequest.TeachingStyles?
                .Select(t => (TeachingStyle)t)
                .ToList(),
            Availability = registerRequest.Availability?
                .Select(a => (UserAvailability)a)
                .ToList()
        };

        return user;
    }
    public static User ToUser(this EditingUserProfileRequest registerRequest)
    {
        var user = new User
        {
            IsNotification = registerRequest.IsNotification,
            IsPrivateProfile = registerRequest.IsPrivateProfile,
            IsReceiveMessage = registerRequest.IsReceiveMessage
        };
        user.UserDetail = new UserDetail
        {
            FullName = registerRequest.FullName,
            Bio = registerRequest.Bio,
            Experience = registerRequest.Experience,
            CommunicationPreference = registerRequest.CommunicationPreference is not null
                ? (CommunicationPreference)registerRequest.CommunicationPreference.Value
                : default,
            ProfessionalSkill = registerRequest.ProfessionalSkill,
            Goals = registerRequest.Goals,
            Duration = registerRequest.Duration,
            SessionFrequency = (SessionFrequency)registerRequest.SessionFrequency,
            LearningStyle = registerRequest.LearningStyle is not null
                ? (LearningStyle?)registerRequest.LearningStyle.Value
                : null,
            TeachingStyles = registerRequest.TeachingStyles?
                .Select(t => (TeachingStyle)t)
                .ToList(),
            Availability = registerRequest.Availability?
                .Select(a => (UserAvailability)a)
                .ToList()
        };

        return user;
    }
}
