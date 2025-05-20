using FluentValidation;
using MentorPlatform.Application.Commons.Errors;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
public class CreateCourseRequest
{
    public bool IsDeleted { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Level { get; set; } = default!;
    public Guid CourseCategoryId { get; set; } = default!;
    public List<ResourceRequest> Resourses { get; set; } = default!;
}

public class CreateCourseRequestValidator : AbstractValidator<CreateCourseRequest>
{
    public CreateCourseRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage(CourseErrorMessage.TitleNotEmpty)
            .MinimumLength(3).WithMessage(CourseErrorMessage.TitleMinLength)
            .MaximumLength(100).WithMessage(CourseErrorMessage.TitleMaxLength);
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage(CourseErrorMessage.DescriptionNotEmpty)
            .MaximumLength(500).WithMessage(CourseErrorMessage.DescriptionMaxLength);
        RuleFor(x => x.Level)
            .InclusiveBetween(0, 2).WithMessage(CourseErrorMessage.LevelInvalid);
    }
}