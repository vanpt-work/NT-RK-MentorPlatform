using MentorPlatform.Application.Commons.Models.Responses.ExpertiseResponses;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.ExpertiseUseCases;

public interface IExpertiseUseCases
{
    Task<Result<List<ExpertiseResponse>>> GetAsync();
}
