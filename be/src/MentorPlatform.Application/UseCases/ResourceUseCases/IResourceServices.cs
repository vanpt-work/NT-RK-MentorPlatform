using MentorPlatform.Application.Commons.Models.Requests.ResourceRequests;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.ResourceUseCases;
public interface IResourceServices
{
    public Task<Result> GetAllAsync(ResourceQueryParameters queryParameters);
    public Task<Result> GetByIdAsync(Guid id);
}
