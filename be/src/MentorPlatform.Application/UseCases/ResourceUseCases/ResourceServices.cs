using MentorPlatform.Application.Commons.Mappings;
using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.Commons.Models.Responses.ResourceResponses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.Extensions.Logging;


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

    public async Task<Result<ResourceResponse>> CreateResource(CreateResourceRequest request)
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
                Description = request.Description,
                IsDeleted = false,
            };

            _resourceRepository.Add(newResource);
            await _unitOfWork.SaveChangesAsync();

            return Result<ResourceResponse>.Success(newResource.ToResponse());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Result<ResourceResponse>.Failure();
        }
    }

    public async Task<Result> EditResource(EditResourceRequest request)
    {
        var dbResource = await _resourceRepository.GetByIdAsync(request.Id);
        if (dbResource == null || dbResource.IsDeleted)
        {
            throw new BadRequestException(ApplicationExceptionMessage.ResourceNotFound);
        }

        dbResource.Title = request.Title;
        dbResource.Description = request.Description;

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<Result> DeleteResource(Guid id)
    {
        var dbResource = await _resourceRepository.GetByIdAsync(id);
        if (dbResource == null || dbResource.IsDeleted)
        {
            throw new BadRequestException(ApplicationExceptionMessage.ResourceNotFound);
        }

        dbResource.IsDeleted = true;

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }
}