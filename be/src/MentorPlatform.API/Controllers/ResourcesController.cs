using MentorPlatform.Application.Commons.Models.Requests.ResourceRequests;
using MentorPlatform.Application.UseCases.ResourceUseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/resources")]
[Authorize]
public class ResourcesController : ApiControllerBase
{
    private readonly IResourceServices _resourceService;

    public ResourcesController(IResourceServices resourceService)
    {
        _resourceService = resourceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] ResourceQueryParameters queryParameters)
    {
        var result = await _resourceService.GetAllAsync(queryParameters);
        return ProcessResult(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var result = await _resourceService.GetByIdAsync(id);
        return ProcessResult(result);
    }

}
