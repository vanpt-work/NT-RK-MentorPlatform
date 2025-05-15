
using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Mapping;

public static class UserMappings
{
    public static User ToUser(this RegisterRequest registerRequest)
    {
        var user = new User
        {
            Email = registerRequest.Email,
            Password = HashingHelper.HashData(registerRequest.Password),
            Role = (Role)registerRequest.Role,
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
