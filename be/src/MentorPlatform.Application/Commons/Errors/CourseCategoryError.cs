using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;
public static class CourseCategoryErrorMessages
{
    public const string CourseCategoryNotExists = "Course Category does not exists";
    public const string CourseCategoryDuplicateName = "Course category name is duplicated";
}
public static class CourseCategoryErrors
{
    public static Error CourseCategoryNotExists => new(nameof(CourseCategoryNotExists),
        CourseCategoryErrorMessages.CourseCategoryNotExists);

    public static Error CourseCategoryDuplicateName => new(nameof(CourseCategoryDuplicateName),
        CourseCategoryErrorMessages.CourseCategoryDuplicateName);

}
