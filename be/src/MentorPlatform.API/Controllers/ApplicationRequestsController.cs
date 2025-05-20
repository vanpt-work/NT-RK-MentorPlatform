using MentorPlatform.Application.Commons.Models.Requests.ApplicationMentorRequests;
using MentorPlatform.Application.UseCases.ApplicationRequestUseCases;
using MentorPlatform.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/application-requests")]
public class ApplicationRequestsController : ApiControllerBase
{
    private readonly IApplicationRequestServices _applicationRequestServices;

    public ApplicationRequestsController(IApplicationRequestServices applicationRequestServices)
    {
        _applicationRequestServices = applicationRequestServices;
    }
    [Authorize(Roles = nameof(Role.Mentor))]
    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] CreateApplicationRequestMentorRequest createApplicationRequestMentorRequest)
    {
        var result = await _applicationRequestServices.CreateAsync(createApplicationRequestMentorRequest);

        return ProcessResult(result);
    }

    [Authorize(Roles = nameof(Role.Mentor))]
    [HttpPut]
    public async Task<IActionResult> UpdateAsync([FromBody] UpdateApplicationRequestMentorRequest updateApplicationRequestMentorRequest)
    {
        var result = await _applicationRequestServices.UpdateAsync(updateApplicationRequestMentorRequest);

        return ProcessResult(result);
    }

    [Authorize(Roles = nameof(Role.Admin))]
    [HttpPut("request-update")]
    public async Task<IActionResult> RequestUpdateAsync([FromBody] RequestUpdateApplicationDocumentRequest updateApplicationRequestMentorRequest)
    {
        var result = await _applicationRequestServices.RequestUpdateAsync(updateApplicationRequestMentorRequest);

        return ProcessResult(result);
    }

}
