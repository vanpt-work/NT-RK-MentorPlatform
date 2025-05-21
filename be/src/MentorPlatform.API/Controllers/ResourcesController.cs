using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.UseCases.ResourceUseCases;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/resources")]
public class ResourcesController : ApiControllerBase
{
    private readonly IResourceServices _resourceService;

    public ResourcesController(IResourceServices resourceService)
    {
        _resourceService = resourceService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateResource([FromForm] CreateResourceRequest request)
    {
        var result = await _resourceService.CreateResource(request);
        return ProcessResult(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateResource(EditResourceRequest request)
    {
        var result = await _resourceService.EditResource(request);
        return ProcessResult(result);
    }

    [HttpDelete("id:guid")]
    public async Task<IActionResult> UpdateResource(Guid id)
    {
        var result = await _resourceService.DeleteResource(id);
        return ProcessResult(result);
    }
}
