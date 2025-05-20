using FluentValidation;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
public class CreateCourseRequest
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public CourseLevel Level { get; set; } = default!;
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
    }
}