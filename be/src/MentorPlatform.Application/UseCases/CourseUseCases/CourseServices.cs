using MentorPlatform.Domain.Repositories;

namespace MentorPlatform.Application.UseCases.CourseUseCases;
public class CourseServices : ICourseServices
{
    private readonly ICourseRepository _courseRepository;

    public CourseServices(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }


}
