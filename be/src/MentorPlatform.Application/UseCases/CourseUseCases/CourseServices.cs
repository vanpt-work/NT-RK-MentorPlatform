using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.Commons.Models.Responses.Course;
using MentorPlatform.Application.Identity;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.Course;
public class CourseServices : ICourseServices
{
    private readonly ICourseRepository _courseRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;
    private readonly IExecutionContext _executionContext;
    public CourseServices(ICourseRepository courseRepository, IUnitOfWork unitOfWork, IExecutionContext executionContext, IUserRepository userRepository)
    {
        _courseRepository = courseRepository;
        _unitOfWork = unitOfWork;
        _executionContext = executionContext;
        _userRepository = userRepository;
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
        
        if(selectedUser!.Role == Role.Mentor)
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
        if(selectedUser!.Role == Role.Mentor && selectedCourse.MentorId != userId)
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
                        Title = r.Title,
                        Description = r.Description,
                        FilePath = r.FilePath,
                        FileType = r.FileType
                    }).ToList()
                    : new List<ResourceResponse>()
            });

        var res = await _courseRepository.FirstOrDefaultAsync(query);

        return Result<CourseDetailsResponse>.Success(res!);

    }

}
