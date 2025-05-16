using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.UseCases.UserManagement;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/users")]
public class UserController : ApiControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> SearchUsersAsync([FromQuery] UserQueryParameters query)
    {
        var result = await _userService.Search(query);
        return ProcessResult(result);
    }

    [HttpPatch("activate/{userId}")]
    public async Task<IActionResult> ActivateUserAsync([FromRoute] Guid userId)
    {
        var result = await _userService.ActivateUser(userId);
        return ProcessResult(result);
    }

    [HttpPatch("deactivate/{userId}")]
    public async Task<IActionResult> DeactivateUserAsync([FromRoute] Guid userId)
    {
        var result = await _userService.DeactivateUser(userId);
        return ProcessResult(result);
    }
}
