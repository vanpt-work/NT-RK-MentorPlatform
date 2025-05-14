
namespace MentorPlatform.Domain.Constants;

public static class UserConstants
{
    public const int MaxLengthGmail = 100;
    public const int MaxLengthPassword = 500;
    public const int MaxLengthFullName = 100;
    public const int MaxLengthBio = 2000;
    public const int MaxLengthAvatarUrl = 100;
    public const int MaxLengthProfessionalSkill = 200;
    public const int IndustryExperience = 200;
    public const int MaxLengthGoals = 200;
    public const int MaxLengthLearningStyle = 200;
    public const string FullNameRegexPattern = @"^[A-Za-z._-]+(?:\s[A-Za-z._-]+)*$";
    public const string EmailRegexPattern = @"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$";
    public const string PasswordRegexPattern = @"^(?=.{8,}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).*$";
}
