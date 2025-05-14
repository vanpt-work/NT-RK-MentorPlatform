
namespace MentorPlatform.Domain.Constants;

public static class UserConstants
{
    public const int MaxLengthGmail = 100;
    public const int MaxLengthPassword = 500;
    public const string EmailRegexPattern = @"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$";
    public const string PasswordRegexPattern = @"^(?=.{8,}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).*$";
}
