using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Mappings;
using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.Commons.Models.Responses.CourseResponses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.Extensions.Logging;

namespace MentorPlatform.Application.UseCases.CourseUseCases;
public class CourseServices : ICourseServices
{
    private readonly ICourseRepository _courseRepository;
    private readonly IFileStorageServices _fileStorage;
    private readonly IExecutionContext _executionContext;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CourseServices> _logger;
    private readonly IRepository<User, Guid> _userRepository;

    public CourseServices(ICourseRepository courseRepository,
        IFileStorageFactory fileStorageFactory,
        IExecutionContext executionContext,
        IUnitOfWork unitOfWork,
        ILogger<CourseServices> logger,
        IRepository<User,Guid> userRepository)
    {
        _courseRepository = courseRepository;
        _fileStorage = fileStorageFactory.Get();
        _executionContext = executionContext;
        _unitOfWork = unitOfWork;
        _logger = logger;
        _userRepository = userRepository;
    }

    public async Task<Result> AddCourseAsync(CreateCourseRequest courseRequest)
    {
        var userId = _executionContext.GetUserId();

        var newCourse = courseRequest.ToEntity();
        newCourse.MentorId = userId;

        newCourse.CourseResources = new List<CourseResource>();

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

        CopyData(courseRequest, dbCourse);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result> DeleteCourseAsync(Guid courseId)
    {
        var dbCourse = await _courseRepository.GetByIdAsync(courseId, nameof(Course.MentoringSessions));

        if (dbCourse == null)
        {
            throw new BadRequestException(ApplicationExceptionMessage.CourseNotFound);
        }

        if (dbCourse.MentoringSessions != null && dbCourse.MentoringSessions.Count > 0)
        {
            throw new BadRequestException(ApplicationExceptionMessage.MentoringSessionContained);
        }

        return Result.Success();
    }

    private async Task UploadFile(ResourceRequest request, CourseResource resource)
    {
        try
        {
            var fileUrl = await _fileStorage.UploadFileAsync(request.File);
            //resource.FilePath = fileUrl;
            //resource.FileType = Path.GetExtension(request.File.FileName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
        }
    }

    private static void CopyData(EditCourseRequest request, Course course)
    {
        course.Title = request.Title;
        course.Description = request.Description;
        course.Level = request.Level;
        course.CourseCategoryId = request.CourseCategoryId;
    }

    public async Task<Result> GetAllAsync(CourseQueryParameters queryParameters)
    {
        var userId = _executionContext.GetUserId();
        var selectedUser = await _userRepository.GetByIdAsync(userId);

        var searchValue = queryParameters?.Search?.Trim();
        var queryFilter = _courseRepository.GetQueryable()
                        .Where(x => queryParameters == null ||
                                    (string.IsNullOrEmpty(searchValue) || x.Title.Contains(searchValue) || x.Description.Contains(searchValue))
                                    && (queryParameters!.CategoryId == null || x.CourseCategoryId == queryParameters.CategoryId)
                                    && (queryParameters.Level == null || x.Level == queryParameters.Level)
                                    && (selectedUser!.Role != Role.Learner || (queryParameters.MentorId == null || x.MentorId == queryParameters.MentorId)));

        if (selectedUser!.Role == Role.Mentor)
        {
            queryFilter = queryFilter.Where(x => x.MentorId == userId);
        }
        var queryPagination = queryFilter
                            .Skip((queryParameters!.PageNumber - 1) * queryParameters.PageSize)
                            .Take(queryParameters.PageSize)
                            .Select(x => new CourseResponse()
                            {
                                Id = x.Id,
                                Title = x.Title,
                                Description = x.Description,
                                Level = x.Level,
                                LearnerCount = x.MentoringSessions != null ? x.MentoringSessions.GroupBy(s => s.LearnerId).Count() : 0,
                                CategoryName = x.CourseCategory.Name
                            });
        var res = PaginationResult<CourseResponse>.Create(data: await _courseRepository.ToListAsync(queryPagination),
                                                                  totalCount: await _courseRepository.CountAsync(queryFilter),
                                                                  pageIndex: queryParameters.PageNumber,
                                                                  pageSize: queryParameters.PageSize);

        return Result<PaginationResult<CourseResponse>>.Success(res);
    }

    public async Task<Result> GetByIdAsync(Guid id)
    {
        var userId = _executionContext.GetUserId();
        var selectedUser = await _userRepository.GetByIdAsync(userId);
        var selectedCourse = await _courseRepository.GetByIdAsync(id);
        if (selectedCourse == null)
        {
            return Result.Failure(404, CourseErrors.CourseNotExists);
        }
        if (selectedUser!.Role == Role.Mentor && selectedCourse.MentorId != userId)
        {
            return Result.Failure(403, CourseErrors.MentorCanNotViewCourse);
        }
        var query = _courseRepository.GetQueryable()
            .Where(x => x.Id == id)
            .Select(x => new CourseDetailsResponse()
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                LearnerCount = x.MentoringSessions != null ? x.MentoringSessions.GroupBy(s => s.LearnerId).Count() : 0,
                CategoryId = x.CourseCategoryId,
                Level = x.Level,
                Mentor = new MentorInfoForCourseResponse()
                {
                    FullName = x.Mentor.UserDetail.FullName,
                    AvatarUrl = x.Mentor.UserDetail.AvatarUrl,
                    Experience = x.Mentor.UserDetail.Experience
                },
                Resources = x.CourseResources != null &&
                    (
                        selectedUser.Role == Role.Mentor ||
                        (x.MentoringSessions != null && x.MentoringSessions.Any(s => s.CourseId == id && s.LearnerId == userId))
                    )
                    ? x.CourseResources.Select(r => new ResourceResponse()
                    {
                        Title = r.Resource.Title,
                        Description = r.Resource.Description,
                        FilePath = r.Resource.FilePath,
                        FileType = r.Resource.FileType
                    }).ToList()
                    : new List<ResourceResponse>()
            });

        var res = await _courseRepository.FirstOrDefaultAsync(query);

        return Result<CourseDetailsResponse>.Success(res!);
    }
}

