using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.UseCases.CourseUseCases;
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
    public IActionResult Test([FromForm] List<ResourceRequest> request)
    {
        if (request[0].File == null)
        {
            return BadRequest("File is required.");
        }
        return Ok(request[0].File.FileName);
    }
}
