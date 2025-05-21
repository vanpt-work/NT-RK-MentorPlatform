using MentorPlatform.Application.Commons.Models.Requests.CourseRequests;
using MentorPlatform.Application.UseCases.CourseUseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/courses")]
[Authorize]
public class CoursesController : ApiControllerBase
{
    private readonly ICourseServices _courseService;

    public CoursesController(ICourseServices courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] CourseQueryParameters queryParameters)
    {
        var result = await _courseService.GetAllAsync(queryParameters);
        return ProcessResult(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var result = await _courseService.GetByIdAsync(id);
        return ProcessResult(result);
    }

}
