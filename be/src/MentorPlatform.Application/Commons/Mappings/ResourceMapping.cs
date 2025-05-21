using MentorPlatform.Application.Commons.Models.Responses.ResourceResponses;
using MentorPlatform.Domain.Entities;

namespace MentorPlatform.Application.Commons.Mappings;
public static class ResourceMapping
{
    public static ResourceResponse ToResponse(this Resource resource)
    {
        return new ResourceResponse
        {
            Id = resource.Id,
            Title = resource.Title,
            Description = resource.Description,
            FilePath = resource.FilePath,
            FileType = resource.FileType,
        };
    }
}
