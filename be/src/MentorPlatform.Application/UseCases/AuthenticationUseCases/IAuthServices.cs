using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.Application.Commons.Models.Responses;
using MentorPlatform.Domain.Shared;

namespace MentorPlatform.Application.UseCases.Authentication;

public interface IAuthServices
{
    Task<Result<LoginResponse>> LoginAsync(LoginRequest loginRequest);
    Task<Result> RegisterAsync(RegisterRequest registerRequest);
    Task<Result<string>> LogoutAsync();
    Task<Result> ForgotPasswordAsync(ForgotPasswordRequest  forgotPasswordRequest);
    Task<Result> VerifyEmailAsync(VerifyEmailModel verifyEmailModel);
}
