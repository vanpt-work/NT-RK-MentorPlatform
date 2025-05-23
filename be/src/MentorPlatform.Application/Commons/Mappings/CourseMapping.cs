using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Domain.Entities;

namespace MentorPlatform.Application.Commons.Mappings;
public static class CourseMapping
{
    public static Course ToEntity(this CreateCourseRequest request)
    {
        return new Course
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            Level = request.Level,
            CourseCategoryId = request.CourseCategoryId,
        };
    }
}
