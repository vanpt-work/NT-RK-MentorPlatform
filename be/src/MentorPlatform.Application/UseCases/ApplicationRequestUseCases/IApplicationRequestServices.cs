using MentorPlatform.Application.Commons.Models.Requests.ApplicationMentorRequests;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.ApplicationRequestUseCases;

public interface IApplicationRequestServices
{
    Task<Result> CreateAsync(CreateApplicationRequestMentorRequest createApplicationRequestMentorRequest);
    Task<Result> UpdateAsync(UpdateApplicationRequestMentorRequest updateApplicationRequestMentorRequest);
    Task<Result> RequestUpdateAsync(RequestUpdateApplicationDocumentRequest requestUpdateApplicationDocumentRequest);
}
