using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;
public static class CourseErrorMessage
{
    public const string TitleNotEmpty = "Title cannot be empty";
    public const string TitleMinLength = "Title must be at least 3 characters long";
    public const string TitleMaxLength = "Title cannot exceed 100 characters";
    public const string DescriptionNotEmpty = "Description cannot be empty";
    public const string DescriptionMaxLength = "Description cannot exceed 500 characters";
    public const string LevelInvalid = "Level must be between 0 and 3";
    public const string CourseCategoryNotExists = "Course category does not exists.";
}

public static class CourseErrors
{
    public static Error TitleNotEmpty => new(nameof(TitleNotEmpty), CourseErrorMessage.TitleNotEmpty);
    public static Error TitleMinLength => new(nameof(TitleMinLength), CourseErrorMessage.TitleMinLength);
    public static Error TitleMaxLength => new(nameof(TitleMaxLength), CourseErrorMessage.TitleMaxLength);
    public static Error DescriptionNotEmpty => new(nameof(DescriptionNotEmpty), CourseErrorMessage.DescriptionNotEmpty);
    public static Error DescriptionMaxLength => new(nameof(DescriptionMaxLength), CourseErrorMessage.DescriptionMaxLength);
    public static Error LevelInvalid => new(nameof(LevelInvalid), CourseErrorMessage.LevelInvalid);
    public static Error CourseCategoryNotExists => new(nameof(CourseCategoryNotExists), CourseErrorMessage.CourseCategoryNotExists);
}
