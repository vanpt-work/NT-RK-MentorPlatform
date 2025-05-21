using FluentValidation;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
public class CreateCourseRequest
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public CourseLevel Level { get; set; } = default!;
    public Guid CourseCategoryId { get; set; } = default!;
    public List<Guid> ResourseIds { get; set; } = default!;
}

public class CreateCourseRequestValidator : AbstractValidator<CreateCourseRequest>
{
    public CreateCourseRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage(CourseErrorMessages.TitleNotEmpty)
            .MinimumLength(3).WithMessage(CourseErrorMessages.TitleMinLength)
            .MaximumLength(100).WithMessage(CourseErrorMessages.TitleMaxLength);
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage(CourseErrorMessages.DescriptionNotEmpty)
            .MaximumLength(500).WithMessage(CourseErrorMessages.DescriptionMaxLength);
    }
}