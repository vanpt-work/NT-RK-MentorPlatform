using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/users")]
public class UserController : ApiControllerBase
{
    [HttpGet]
    public IActionResult Test()
    {
        return Ok();
    }
}
