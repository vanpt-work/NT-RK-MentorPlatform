using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.Course;
public interface ICourseServices
{
    public Task<Result> GetAllAsync(CourseQueryParameters queryParameters);
    public Task<Result> GetByIdAsync(Guid id);
}
