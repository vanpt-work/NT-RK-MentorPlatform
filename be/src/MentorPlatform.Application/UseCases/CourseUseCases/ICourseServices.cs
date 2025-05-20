using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.Commons.Models.Responses.Course;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.CourseUseCases;
public interface ICourseServices
{
    public Task<Result> AddCourseAsync(CreateCourseRequest courseRequest);
    public Task<Result> UpdateCourseAsync(Guid courseId, EditCourseRequest courseRequest);
    public Task<Result> DeleteCourseAsync(Guid courseId);
}
