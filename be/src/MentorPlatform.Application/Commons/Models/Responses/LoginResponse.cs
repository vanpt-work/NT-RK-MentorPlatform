﻿
namespace MentorPlatform.Application.Commons.Models.Responses;

public class LoginResponse
{
    public string AccessToken { get; set; } = default!;
    public string RefreshToken { get; set; } = default!;
}
