﻿using FluentValidation;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
public class EditCourseRequest
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public CourseLevel Level { get; set; } = default!;
    public Guid CourseCategoryId { get; set; } = default!;
    public List<Guid> ResourceIds { get; set; } = default!;
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
