using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;

public static class ResourceErrorMessages
{
    public const string ResourceNotFound = "Resource not found";
    public const string ResourceNotBelongToUser = "Resource does not belong to the user";
    public const string ResourceNotExists = "Resource does not exists";
    public const string AdminCanNotViewResource = "Admin can not view resources";
    public const string MentorCanNotViewResource = "Mentor do not have permission to view this resource";
    public const string LearnerCanNotViewResource = "Learner have to join the course to see this resource";
}

public static class ResourceErrors
{
    public static Error ResourceNotFound => new(nameof(ResourceNotFound), ResourceErrorMessages.ResourceNotFound);
    public static Error ResourceNotBelongToUser => new(nameof(ResourceNotBelongToUser), ResourceErrorMessages.ResourceNotBelongToUser);
    public static Error ResourceNotExists => new(nameof(ResourceNotExists),
        ResourceErrorMessages.ResourceNotExists);
    public static Error AdminCanNotViewResource => new(nameof(AdminCanNotViewResource),
        ResourceErrorMessages.AdminCanNotViewResource); 
    public static Error MentorCanNotViewResource => new(nameof(MentorCanNotViewResource),
        ResourceErrorMessages.MentorCanNotViewResource);

    public static Error LearnerCanNotViewResource => new(nameof(LearnerCanNotViewResource),
        ResourceErrorMessages.LearnerCanNotViewResource);
}
