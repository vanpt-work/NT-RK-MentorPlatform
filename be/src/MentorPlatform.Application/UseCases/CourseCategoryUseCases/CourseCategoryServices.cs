using MentorPlatform.Application.Commons.CommandMessages;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.Commons.Models.Requests.CourseCategory;
using MentorPlatform.Application.Commons.Models.Responses.Course;
using MentorPlatform.Application.Commons.Models.Responses.CourseCategory;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.CourseCategory;
public class CourseCategoryServices : ICourseCategoryServices
{
    private readonly ICourseCategoryRepository _courseCategoryRepository;
    private readonly IUnitOfWork _unitOfWork;
    public CourseCategoryServices(ICourseCategoryRepository courseCategoryRepository, IUnitOfWork unitOfWork)
    {
        _courseCategoryRepository = courseCategoryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> GetAllAsync(QueryParameters queryParameters)
    {
        var searchValue = queryParameters?.Search?.Trim();
        var queryAll = _courseCategoryRepository.GetQueryable()
                        .Where(x => string.IsNullOrEmpty(searchValue) 
                                    || x.Name.Contains(searchValue) 
                                    || x.Description.Contains(searchValue));
        var queryPagination = queryAll
                            .Skip((queryParameters.PageNumber- 1) * queryParameters.PageSize)
                            .Take(queryParameters.PageSize)
                            .Select(x => new CourseCategoryResponse()
                            {
                                Id = x.Id,
                                Name = x.Name,
                                Description = x.Description,
                                CourseCount = x.Courses != null ? x.Courses.Count : 0,
                                IsActive = x.IsActive
                            });
        var res = PaginationResult<CourseCategoryResponse>.Create(data: await _courseCategoryRepository.ToListAsync(queryPagination),
                                                                  totalCount: await _courseCategoryRepository.CountAsync(queryAll),
                                                                  pageIndex: queryParameters.PageNumber,
                                                                  pageSize: queryParameters.PageSize);
       
        return Result<PaginationResult<CourseCategoryResponse>>.Success(res);
    }

    public async Task<Result> GetByIdAsync(Guid id)
    {
        var query = _courseCategoryRepository.GetQueryable()
                                                .Where(x => x.Id == id)
                                                .Select(x => new CourseCategoryDetailResponse()
                                                {
                                                    Id = x.Id,
                                                    Name = x.Name,
                                                    Description = x.Description,
                                                    CourseCount = x.Courses != null ? x.Courses.Count : 0,
                                                    IsActive = x.IsActive,
                                                    Courses = x.Courses != null ? x.Courses.Select(c => new CourseResponse()
                                                    {
                                                        Id = c.Id,
                                                        Title = c.Title,
                                                        Description = c.Description,
                                                        Level = c.Level
                                                    }).ToList() : new List<CourseResponse>()
                                                });

        var selectedCategory = await _courseCategoryRepository.FirstOrDefaultAsync(query);
        if (selectedCategory == null)
        {
            return Result.Failure(404, CourseCategoryErrors.CourseCategoryNotExists);
        }
        return Result<CourseCategoryDetailResponse>.Success(selectedCategory);

    }

    public async Task<Result> CreateAsync(CreateCourseCategoryRequest createRequest)
    {
        var query = _courseCategoryRepository.GetQueryable().Where(x => x.Name.ToLower() == createRequest.Name.Trim().ToLower());
        if (await _courseCategoryRepository.AnyAsync(query))
        {
            return Result.Failure(400, CourseCategoryErrors.CourseCategoryDuplicateName);
        }
        var newEntity = new Domain.Entities.CourseCategory
        {
            Name = createRequest.Name,
            Description = createRequest.Description,
            IsActive = true,
        };
        _courseCategoryRepository.Add(newEntity);
        
        await _unitOfWork.SaveChangesAsync();
        return Result<string>.Success(CourseCategoryCommandMessages.CreatedSuccessfully, 201);
    }

    public async Task<Result> UpdateAsync(Guid id, UpdateCourseCategoryRequest updateRequest)
    {
        var selectedCategory =  _courseCategoryRepository.GetQueryable().FirstOrDefault(x => !x.IsDeleted && x.Id == id);
        if (selectedCategory == null)
        {
            return Result.Failure(404, CourseCategoryErrors.CourseCategoryNotExists);
        }

        var queryExistedName = _courseCategoryRepository.GetQueryable()
                                .Where(x => x.Id != selectedCategory.Id && x.Name.ToLower() == updateRequest.Name.Trim().ToLower());
        if (await _courseCategoryRepository.AnyAsync(queryExistedName))
        {
            return Result.Failure(400, CourseCategoryErrors.CourseCategoryDuplicateName);
        }

        selectedCategory.Name = updateRequest.Name;
        selectedCategory.Description = updateRequest.Description;
        selectedCategory.IsActive = updateRequest.IsActive;
        _courseCategoryRepository.Update(selectedCategory);
        await _unitOfWork.SaveChangesAsync();
        return Result<string>.Success(CourseCategoryCommandMessages.UpdatedSuccessfully, 204);

    }
    public async Task<Result> DeleteAsync(Guid id)
    {
        var selectedCategory = await _courseCategoryRepository.GetByIdAsync(id, nameof(Domain.Entities.CourseCategory.UserCourseCategories), nameof(Domain.Entities.CourseCategory.Courses));
        if (selectedCategory == null)
        {
            return Result.Failure(404, CourseCategoryErrors.CourseCategoryNotExists);
        }
        if ((selectedCategory.Courses != null && selectedCategory.Courses.Count != 0) 
            || (selectedCategory.UserCourseCategories != null && selectedCategory.UserCourseCategories.Count != 0))
        {
            return Result.Failure(400, CourseCategoryErrors.CourseCategoryIsUsed);
        }

        selectedCategory.IsDeleted = true;
        _courseCategoryRepository.Update(selectedCategory);
        await _unitOfWork.SaveChangesAsync();
        return Result<string>.Success(CourseCategoryCommandMessages.DeletedSuccessfully, 204);
    }

}
