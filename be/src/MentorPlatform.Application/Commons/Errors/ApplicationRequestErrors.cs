using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;

public static class ApplicationRequestErrorMessages
{
    public const string NotFound = "Application request not found";
    public const string MentorCannotUpdateRequestIsNotUnderReview = "Mentor can not update request that has status is not under review";

    public const string AdminCannotRequestUpdateRequestIsUnderReview =
        "Admin can not update request that has status is under review";

    public const string MentorCannotCreateApplicationRequest =
        "Mentor can not create new application request, beacause has pending or review request";
}
public static class ApplicationRequestErrors
{
    public static Error NotFound => new(nameof(NotFound), ApplicationRequestErrorMessages.NotFound);
    public static Error MentorCannotUpdateRequestIsNotUnderReview => new(nameof(MentorCannotUpdateRequestIsNotUnderReview),
        ApplicationRequestErrorMessages.MentorCannotUpdateRequestIsNotUnderReview);

    public static Error AdminCannotRequestUpdateRequestIsUnderReview => new(
        nameof(AdminCannotRequestUpdateRequestIsUnderReview),
        ApplicationRequestErrorMessages.AdminCannotRequestUpdateRequestIsUnderReview);

    public static Error MentorCannotCreateApplicationRequest => new(nameof(MentorCannotCreateApplicationRequest),
        ApplicationRequestErrorMessages.MentorCannotCreateApplicationRequest);
}
