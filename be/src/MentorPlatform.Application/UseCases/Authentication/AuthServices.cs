
using MentorPlatform.Application.Commons.CommandMessages;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.Application.Commons.Models.Responses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Application.UseCases.Authentication;

public class AuthServices: IAuthServices
{
    private readonly IJwtTokenServices _jwtServices;
    private readonly IUserRepository _userRepository;
    private readonly JwtTokenOptions _jwtTokenOptions;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IExecutionContext _executionContext;
    public AuthServices(IJwtTokenServices jwtServices, 
        IUnitOfWork unitOfWork,
        IUserRepository userRepository,
        IOptions<JwtTokenOptions> jwtTokenOptions, 
        IExecutionContext executionContext)
    {
        _executionContext = executionContext;
        _jwtServices = jwtServices;
        _userRepository = userRepository;
        _jwtTokenOptions = jwtTokenOptions.Value;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<LoginResponse>> LoginAsync(LoginRequest loginRequest)
    {
        var user = await _userRepository.GetByEmailAsync(loginRequest.Email);

        if (user == null)
        {
            return Result<LoginResponse>.Failure(UserErrors.EmailNotAlreadyRegister);
        }

        if (!IsPasswordLoginMatchWithPassword(loginRequest.Password, user.Password))
        {
            return Result<LoginResponse>.Failure(UserErrors.PasswordIncorrect);
        }
        if (!IsUserDeactivated(user))
        {
            return Result<LoginResponse>.Failure(UserErrors.UserIsDeactivated);
        }

        if (!HasUserVerifiedEmail(user))
        {
            return new LoginResponse
            {
                AccessToken = string.Empty,
                RefreshToken = string.Empty
            };
        }

        var refreshToken = _jwtServices.GenerateRefreshToken();

        user.RefreshTokens!.Add(new RefreshToken
        {
            Value = refreshToken,
            Expired = DateTime.UtcNow.AddDays(_jwtTokenOptions.ExpireRefreshTokenDays),
        });

        await _unitOfWork.SaveChangesAsync();

        var accessToken = _jwtServices.GenerateAccessToken(user);

        return new LoginResponse { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public Task<Result<string>> RegisterAsync(RegisterRequest registerRequest)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<string>> LogoutAsync()
    {
        var userId = _executionContext.GetUserId();
        var user = await _userRepository.GetByIdAsync(userId, nameof(User.RefreshTokens));
        await RecallUserAccessAndRefreshTokenAsync(user!);
        return AuthCommandMessages.LogoutSuccessfully;
    }



    private static bool IsPasswordLoginMatchWithPassword(string passwordLogin, string password)
    {
        return HashingHelper.VerifyData(passwordLogin, password);
    }

    private static bool IsUserDeactivated(User user)
    {
        return user.IsActive;
    }

    private static bool HasUserVerifiedEmail(User user)
    {
        return user.IsVerifyEmail;
    }

    private async Task RecallUserAccessAndRefreshTokenAsync(User user)
    {
        var refreshTokenId = _executionContext.GetIdentityTokenId();
        var refreshToken = user.RefreshTokens!.Where(r => r.Id == refreshTokenId)!.FirstOrDefault();
        user.RefreshTokens!.Remove(refreshToken!);
        _jwtServices.RecallAccessToken();
        await _unitOfWork.SaveChangesAsync();
    }

}
