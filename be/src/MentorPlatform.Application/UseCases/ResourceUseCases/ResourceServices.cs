using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests.ResourceRequests;
using MentorPlatform.Application.Commons.Models.Responses.ResourceResponses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.Extensions.Logging;

namespace MentorPlatform.Application.UseCases.ResourceUseCases;
public class ResourceServices : IResourceServices
{
    private readonly IResourceRepository _resourceRepository;
    private readonly ICourseRepository _courseRepository;
    private readonly IExecutionContext _executionContext;
    private readonly IRepository<User, Guid> _userRepository;

    public ResourceServices(IResourceRepository resourceRepository,
        IExecutionContext executionContext,
        IRepository<User, Guid> userRepository,
        ICourseRepository courseRepository)
    {
        _resourceRepository = resourceRepository;
        _executionContext = executionContext; ;
        _userRepository = userRepository;
        _courseRepository = courseRepository;
    }
    public async Task<Result> GetAllAsync(ResourceQueryParameters queryParameters)
    {
        var userId = _executionContext.GetUserId();
        var selectedUser = await _userRepository.GetByIdAsync(userId);

        if(selectedUser!.Role== Role.Admin)
        {
            return Result.Failure(403, ResourceErrors.AdminCanNotViewResource);
        }
        
        var searchValue = queryParameters?.Search?.Trim();
        var queryFilter = _resourceRepository.GetQueryable()
                        .Where(x => queryParameters == null ||
                                    (string.IsNullOrEmpty(searchValue) || x.Title.Contains(searchValue))
                                    && (queryParameters!.FileType == null || x.FileType == queryParameters.FileType));


        var queryPagination = queryFilter
                            .Skip((queryParameters!.PageNumber - 1) * queryParameters.PageSize)
                            .Take(queryParameters.PageSize)
                            .Select(x => new ResourceResponse()
                            {
                                Id = x.Id,
                                Title = x.Title,
                                FileType = x.FileType,
                                FilePath = x.FilePath,
                                MentorName = x.Mentor.UserDetail.FullName, 
                            });
        var res = PaginationResult<ResourceResponse>.Create(data: await _resourceRepository.ToListAsync(queryPagination),
                                                                  totalCount: await _resourceRepository.CountAsync(queryFilter),
                                                                  pageIndex: queryParameters.PageNumber,
                                                                  pageSize: queryParameters.PageSize);

        return Result<PaginationResult<ResourceResponse>>.Success(res);
    }

    public async Task<Result> GetByIdAsync(Guid id)
    {
        var userId = _executionContext.GetUserId();
        var selectedUser = await _userRepository.GetByIdAsync(userId);
        if (selectedUser!.Role == Role.Admin)
        {
            return Result.Failure(403, ResourceErrors.AdminCanNotViewResource);
        }
        var selectedResource = await _resourceRepository.GetByIdAsync(id, [nameof(Resource.CourseResources)]);
        if (selectedResource == null)
        {
            return Result.Failure(404, ResourceErrors.ResourceNotExists);
        }

        if (selectedUser!.Role == Role.Mentor && selectedResource.MentorId != userId)
        {
            return Result.Failure(403, ResourceErrors.MentorCanNotViewResource);
        }

       
        

        var query = _resourceRepository.GetQueryable().Where(x => x.Id == id);

        var res = await _resourceRepository.FirstOrDefaultAsync(query);

        return Result.Success();
    }
}

