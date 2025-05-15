﻿
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;

public static class UserErrorMessages
{
    public const string EmailNotAlreadyRegister = "Email does not already register.";
    public const string PasswordIncorrect = "Password incorrect.";
    public const string UserIsDeactivated = "User is deactivated.";
    public const string UserNotExists = "User does not exists.";
    public const string UserHasNotBeenVerified = "User has not been verified email.";
    public const string EmailAlreadyRegister = "Email already register.";
    public const string UserExpertiseInvalid = "Areas of expertise have invalid value.";
    public const string UserCourseCategoryInvalid = "Topics have invalid value.";
    public const string VerifyEmailCodeIncorrect= "Verify email code incorrect";
}
public static class UserErrors
{
    public static Error EmailNotAlreadyRegister => new(nameof(EmailNotAlreadyRegister),
        UserErrorMessages.EmailNotAlreadyRegister);
    public static Error EmailAlreadyRegister => new(nameof(EmailAlreadyRegister),
        UserErrorMessages.EmailAlreadyRegister);
    public static Error UserIsDeactivated => new(nameof(UserIsDeactivated),
        UserErrorMessages.UserIsDeactivated);

    public static Error PasswordIncorrect => new(nameof(PasswordIncorrect), UserErrorMessages.PasswordIncorrect);

    public static Error UserExpertiseInvalid => new(nameof(UserExpertiseInvalid),
        UserErrorMessages.UserExpertiseInvalid);
    public static Error UserCourseCategoryInvalid => new(nameof(UserCourseCategoryInvalid), 
        UserErrorMessages.UserCourseCategoryInvalid);

    public static Error VerifyEmailCodeIncorrect => new(nameof(VerifyEmailCodeIncorrect),
        UserErrorMessages.VerifyEmailCodeIncorrect);
    public static Error UserNotExists => new(nameof(UserNotExists), UserErrorMessages.UserNotExists);
}
