using MentorPlatform.Application.Commons.Mappings;
using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace MentorPlatform.Application.UseCases.CourseUseCases;
public class CourseServices : ICourseServices
{
    private readonly ICourseRepository _courseRepository;
    private readonly IFileStorageServices _fileStorage;
    private readonly IExecutionContext _executionContext;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CourseServices> _logger;

    public CourseServices(ICourseRepository courseRepository,
        IFileStorageFactory fileStorageFactory,
        IExecutionContext executionContext,
        IUnitOfWork unitOfWork,
        ILogger<CourseServices> logger)
    {
        _courseRepository = courseRepository;
        _fileStorage = fileStorageFactory.Get();
        _executionContext = executionContext;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<Result> AddCourseAsync(CreateCourseRequest courseRequest)
    {
        var userId = _executionContext.GetUserId();

        var newCourse = courseRequest.ToEntity();
        newCourse.MentorId = userId;

        newCourse.CourseResources = new List<CourseResource>();
        await AddResources(newCourse, courseRequest.Resourses);

        _courseRepository.Add(newCourse);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result> UpdateCourseAsync(EditCourseRequest courseRequest)
    {
        var userId = _executionContext.GetUserId();

        var dbCourse = await _courseRepository.GetByIdAsync(courseRequest.Id, nameof(Course.CourseResources));
        if (dbCourse == null)
        {
            throw new BadRequestException(ApplicationExceptionMessage.CourseNotFound);
        } 

        if (dbCourse.CourseResources != null && dbCourse.CourseResources.Count > 0 && courseRequest.Resourses.Count > 0)
        {
            dbCourse.CourseResources = new List<CourseResource>();
        }

        CopyData(courseRequest, dbCourse);
        await AddResources(courseRequest.Resourses, dbCourse);
        
        await _unitOfWork.SaveChangesAsync();
    }

    public Task<Result> DeleteCourseAsync(Guid courseId)
    {
        throw new NotImplementedException();
    }

    private async Task<string> UploadFile(IFormFile file)
    {
        try
        {
            var fileUrl = await _fileStorage.UploadFileAsync(file);
            return fileUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return string.Empty;
        }
    }

    private async Task AddResources(List<ResourceRequest> resources, Course course)
    {
        foreach (var resource in resources)
        {
            var newResource = resource.ToEntity();
            course.CourseResources.Add(newResource);
            newResource.FilePath = await UploadFile(resource.File);
            // newResource need file type
            newResource.IsDeleted = false;
        }
    }
}
