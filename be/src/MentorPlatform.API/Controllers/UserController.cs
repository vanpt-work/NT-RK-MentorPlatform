using MentorPlatform.Application.Commons.Models.Query;
using MentorPlatform.Application.UseCases.UserManagement;
using MentorPlatform.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/users")]
[Authorize(Roles = nameof(Role.Admin))]
public class UserController : ApiControllerBase
{
    private readonly IUserServices _userService;

    public UserController(IUserServices userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> SearchUsersAsync([FromQuery] HasRoleQueryParameters query)
    {
        var result = await _userService.Search(query);
        return ProcessResult(result);
    }

    [HttpPatch("{userId}/activate")]
    public async Task<IActionResult> ActivateUserAsync([FromRoute] Guid userId)
    {
        var result = await _userService.ChangeUserActive(userId);
        return ProcessResult(result);
    }

    [HttpPatch("{userId}/deactivate")]
    public async Task<IActionResult> DeactivateUserAsync([FromRoute] Guid userId)
    {
        var result = await _userService.ChangeUserActive(userId, false);
        return ProcessResult(result);
    }
}
