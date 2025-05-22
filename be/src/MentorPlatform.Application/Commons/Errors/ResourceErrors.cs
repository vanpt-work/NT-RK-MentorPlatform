using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;

public static class ResourceErrorMessages
{
    public const string ResourceNotFound = "Resource not found";
    public const string ResourceNotBelongToUser = "Resource does not belong to the user";
}

public static class ResourceErrors
{
    public static Error ResourceNotFound => new(nameof(ResourceNotFound), ResourceErrorMessages.ResourceNotFound);
    public static Error ResourceNotBelongToUser => new(nameof(ResourceNotBelongToUser), ResourceErrorMessages.ResourceNotBelongToUser);
}
