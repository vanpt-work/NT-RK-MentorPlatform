using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.Application.UseCases.CourseUseCases;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/courses")]
public class CoursesController : ApiControllerBase
{
    private readonly ICourseServices _courseServices;
    public CoursesController(ICourseServices courseServices)
    {
        _courseServices = courseServices;
    }

    [HttpPost]
    public IActionResult Test([FromForm] ResourceRequest request)
    {
        if (request.File == null)
        {
            return BadRequest("File is required.");
        }
        // Process the file here
        // For example, save it to a directory or database
        return Ok(request.File.FileName);
    }
}
