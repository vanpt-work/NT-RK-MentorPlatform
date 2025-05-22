using MentorPlatform.Application.Commons.CommandMessages;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.Commons.Models.Responses.ResourceResponses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.Extensions.Logging;

using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests.ResourceRequests;
using MentorPlatform.Application.Commons.Models.Responses.ResourceResponses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.ResourceUseCases;
public class ResourceServices : IResourceServices
{
    private readonly IResourceRepository _resourceRepository;
    private readonly IRepository<MentoringSession, Guid> _mentorSessionRepository;
    private readonly IExecutionContext _executionContext;
    private readonly IUserRepository _userRepository;
    private readonly IFileStorageServices _fileStorageServices;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<ResourceServices> _logger;

    public ResourceServices(IResourceRepository resourceRepository,
        IExecutionContext executionContext,
        IUserRepository userRepository,
        IRepository<MentoringSession, Guid> mentorSessionRepository,
        IFileStorageFactory fileStorageFactory,
        IUnitOfWork unitOfWork,
        ILogger<ResourceServices> logger)
    {
        _resourceRepository = resourceRepository;
        _executionContext = executionContext;
        _userRepository = userRepository;
        _mentorSessionRepository = mentorSessionRepository;
        _fileStorageServices = fileStorageFactory.Get();
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<Result> CreateResource(CreateResourceRequest request)
    {
        var userId = _executionContext.GetUserId();

        try
        {
            var fileUrl = await _fileStorageServices.UploadFileAsync(request.File);

            var newResource = new Resource
            {
                MentorId = userId,
                FilePath = fileUrl,
                FileType = Path.GetExtension(request.File.FileName),
                Title = request.Title,
                Description = request.Description
            };

            _resourceRepository.Add(newResource);
            await _unitOfWork.SaveChangesAsync();

            return Result<string>.Success(ResourceCommandMessages.CreateSuccessfully);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Result<ResourceResponse>.Failure();
        }
    }

    public async Task<Result> EditResource(EditResourceRequest request)
    {
        var userId = _executionContext.GetUserId();

        var selectedResource = await _resourceRepository.GetByIdAsync(request.Id);
        if (selectedResource == null)
        {
            return Result.Failure(ResourceErrors.ResourceNotFound);
        }
        if (selectedResource.MentorId != userId)
        {
            return Result.Failure(ResourceErrors.ResourceNotBelongToUser);
        }

        selectedResource.Title = request.Title;
        selectedResource.Description = request.Description;

        _resourceRepository.Update(selectedResource);
        await _unitOfWork.SaveChangesAsync();

        return Result<string>.Success(ResourceCommandMessages.UpdateSuccessfully);
    }

    public async Task<Result> DeleteResource(Guid id)
    {
        var userId = _executionContext.GetUserId();

        var selectedResource = await _resourceRepository.GetByIdAsync(id);
        if (selectedResource == null)
        {
            return Result.Failure(ResourceErrors.ResourceNotFound);
        }
        if (selectedResource.MentorId != userId)
        {
            return Result.Failure(ResourceErrors.ResourceNotBelongToUser);
        }

        selectedResource.IsDeleted = true;

        _resourceRepository.Update(selectedResource);
        await _unitOfWork.SaveChangesAsync();

        return Result<string>.Success(ResourceCommandMessages.DeleteSuccessfully);
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
                                    && (queryParameters!.FileType == null || x.FileType == queryParameters.FileType)
                                    && (selectedUser.Role != Role.Mentor || x.MentorId == selectedUser.Id));

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
                                                                  pageNumber: queryParameters.PageNumber,
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

        var query = _resourceRepository.GetQueryable()
            .Where(x => x.Id == id)
            .Select(x => new ResourceDetailsResponse()
            {
                Id = x.Id,
                Title = x.Title,
                FileType = x.FileType,
                FilePath = x.FilePath,
                MentorId = x.MentorId,
                Description = x.Description,
            });

        var selectedResource = await _resourceRepository.FirstOrDefaultAsync(query);
        if (selectedResource == null)
        {
            return Result.Failure(404, ResourceErrors.ResourceNotExists);
        }

        if (selectedUser!.Role == Role.Mentor && selectedResource.MentorId != userId)
        {
            return Result.Failure(403, ResourceErrors.MentorCanNotViewResource);
        }

        if (selectedUser.Role == Role.Learner)
        {
            var leanerCourses = _mentorSessionRepository.GetQueryable()
                .Where(x => x.LearnerId == userId && x.RequestStatus == RequestMentoringSessionStatus.Approved)
                .Select(x => x.Course).SelectMany(c => c.CourseResources).Where(cr => cr.Resource != null)
                .Select(cr => cr.Resource.Id).Distinct();

            var learnerCourses = await _mentorSessionRepository.ToListAsync(leanerCourses);

            if (!learnerCourses.Any(x=> x == id))
            {
                return Result.Failure(403, ResourceErrors.LearnerCanNotViewResource);
            }
        }

        return Result<ResourceDetailsResponse>.Success(selectedResource);
    }
}
   
    


