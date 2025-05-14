using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.Application.UseCases.Authentication;
using MentorPlatform.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/auth")]
public class AuthsController : ApiControllerBase
{
    private readonly IAuthServices _authServices;

    public AuthsController(IAuthServices authServices)
    {
        _authServices = authServices;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequest loginRequest)
    {
        var result = await _authServices.LoginAsync(loginRequest);

        return ProcessResult(result);
    }

    [HttpPost("logout")]
    [Authorize(Roles = $"{nameof(Role.Admin)},{nameof(Role.Learner)},{nameof(Role.Mentor)}")]
    public async Task<IActionResult> LogoutAsync()
    {
        var result = await _authServices.LogoutAsync();

        return ProcessResult(result);
    }
}
