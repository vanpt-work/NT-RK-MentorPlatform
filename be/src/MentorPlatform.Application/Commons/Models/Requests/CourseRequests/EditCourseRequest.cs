using FluentValidation;
using MentorPlatform.Application.Commons.Errors;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
public class EditCourseRequest : CreateCourseRequest
{
    public List<Guid> OldResourceIds { get; set; }
}

public class EditCourseRequestValidator : AbstractValidator<EditCourseRequest>
{
    public EditCourseRequestValidator()
    {
        RuleFor(x => x.Title.Trim())
            .NotEmpty().WithMessage(CourseErrorMessages.TitleNotEmpty)
            .MinimumLength(3).WithMessage(CourseErrorMessages.TitleMinLength)
            .MaximumLength(100).WithMessage(CourseErrorMessages.TitleMaxLength);
        RuleFor(x => x.Description.Trim())
            .NotEmpty().WithMessage(CourseErrorMessages.DescriptionNotEmpty)
            .MaximumLength(500).WithMessage(CourseErrorMessages.DescriptionMaxLength);
    }
}
