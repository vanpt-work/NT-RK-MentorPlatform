using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Domain.Entities;

namespace MentorPlatform.Application.Commons.Mappings;
public static class ResourceMapping
{
    public static CourseResource ToEntity(this ResourceRequest resourceRequest)
    {
        return new CourseResource
        {
            //Title = resourceRequest.Title,
            //Description = resourceRequest.Description,
        };
    }
}
