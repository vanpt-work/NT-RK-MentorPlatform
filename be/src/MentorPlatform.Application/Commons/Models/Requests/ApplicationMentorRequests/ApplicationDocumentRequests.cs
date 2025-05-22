﻿
using FluentValidation;
using MentorPlatform.Application.Commons.ValidationMessages;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Domain.Constants;
using Microsoft.AspNetCore.Http;

namespace MentorPlatform.Application.Commons.Models.Requests.ApplicationMentorRequests;

public class ApplicationDocumentRequests
{
    public string FilePath { get; set; } = default!;
    public string FileName { get; set; } = default!;
    public IFormFile FileContent { get; set; } = default!;
}


public class ApplicationDocumentRequestsValidator : AbstractValidator<ApplicationDocumentRequests>
{
    public ApplicationDocumentRequestsValidator()
    {
        RuleFor(x => x.FilePath)
            .NotEmpty().WithMessage(ApplicationRequestValidationMessages.FilePathNotEmpty)
            .MaximumLength(ApplicationRequestConstants.MaxLengthFilePath).WithMessage(ApplicationRequestValidationMessages.FilePathMaxLength);
        RuleFor(x => x.FilePath)
            .NotEmpty().WithMessage(ApplicationRequestValidationMessages.FileNameNotEmpty)
            .MaximumLength(ApplicationRequestConstants.MaxLengthFileName).WithMessage(ApplicationRequestValidationMessages.FileNameMaxLength);
        RuleFor(x => x.FileContent)
            .NotNull().WithMessage(ApplicationRequestValidationMessages.FileContentNotNull)
            .Must(IsSupportedExtension)
            .WithMessage(file =>
            {
                var ext = Path.GetExtension(file.FileName)?.ToLower() ?? string.Empty;
                var all = string.Join(", ",
                    SupportFileType.Images.AllowedExtensions
                        .Concat(SupportFileType.Videos.AllowedExtensions)
                        .Concat(SupportFileType.Documents.AllowedExtensions));
                return string.Format(
                    ApplicationRequestValidationMessages.FileContentUnsupportedExtension,
                    ext, all);
            });
    }
    private static bool IsSupportedExtension(IFormFile file)
    {
        if (file.Length == 0) return false;
        var ext = Path.GetExtension(file.FileName)?.ToLower() ?? string.Empty;

        return SupportFileType.Images.AllowedExtensions.Contains(ext)
               || SupportFileType.Videos.AllowedExtensions.Contains(ext)
               || SupportFileType.Documents.AllowedExtensions.Contains(ext);
    }
}