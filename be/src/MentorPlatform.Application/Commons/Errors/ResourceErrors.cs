using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.Commons.Errors;

public static class ResourceErrorMessages
{
    public const string ResourceNotExists = "Resource does not exists";
    public const string AdminCanNotViewResource = "Admin can not view resources";
    public const string MentorCanNotViewResource = "Mentor do not have permission to view this resource";
}
public static class ResourceErrors
{
    public static Error ResourceNotExists => new(nameof(ResourceNotExists),
        ResourceErrorMessages.ResourceNotExists);
    public static Error AdminCanNotViewResource => new(nameof(AdminCanNotViewResource),
        ResourceErrorMessages.AdminCanNotViewResource); 
    public static Error MentorCanNotViewResource => new(nameof(MentorCanNotViewResource),
        ResourceErrorMessages.MentorCanNotViewResource);

}
