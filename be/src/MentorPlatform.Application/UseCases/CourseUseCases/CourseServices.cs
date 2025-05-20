using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.CourseUseCases;
public class CourseServices : ICourseServices
{
    private readonly ICourseRepository _courseRepository;
    private readonly IFileStorageServices _fileStorage;
    private readonly IExecutionContext _executionContext;
    private readonly IUnitOfWork _unitOfWork;

    public CourseServices(ICourseRepository courseRepository,
        IFileStorageFactory fileStorageFactory, 
        IExecutionContext executionContext,
        IUnitOfWork unitOfWork)
    {
        _courseRepository = courseRepository;
        _fileStorage = fileStorageFactory.Get();
        _executionContext = executionContext;
        _unitOfWork = unitOfWork;
    }

    public Task<Result> AddCourseAsync(CreateCourseRequest courseRequest)
    {
        // Get user Id
        var userId = _executionContext.GetUserId();

        // Parse data to course entity

        // Add to context and save change

        // Return the entity
        return Task.FromResult(Result.Success());
    }

    public Task<Result> DeleteCourseAsync(Guid courseId)
    {
        throw new NotImplementedException();
    }

    public Task<Result> UpdateCourseAsync(Guid courseId, EditCourseRequest courseRequest)
    {
        throw new NotImplementedException();
    }
}
