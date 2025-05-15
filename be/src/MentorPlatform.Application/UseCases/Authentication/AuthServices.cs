
using MentorPlatform.Application.Commons.CommandMessages;
using MentorPlatform.Application.Commons.Errors;
using MentorPlatform.Application.Commons.Mapping;
using MentorPlatform.Application.Commons.Models.Mail;
using MentorPlatform.Application.Commons.Models.Requests;
using MentorPlatform.Application.Commons.Models.Responses;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.Application.Services.HostedServices;
using MentorPlatform.Application.Services.Mail;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.CrossCuttingConcerns.Caching;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Constants;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Domain.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RazorLight;

namespace MentorPlatform.Application.UseCases.Authentication;

public class AuthServices: IAuthServices
{
    private readonly IJwtTokenServices _jwtServices;
    private readonly IUserRepository _userRepository;
    private readonly JwtTokenOptions _jwtTokenOptions;
    private readonly IRepository<CourseCategory, Guid> _courseCategoryRepository;
    private readonly IFileStorageServices _fileStorageServices;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IExecutionContext _executionContext;
    private readonly IRazorLightEngine _razorLightEngine;
    private readonly IMemoryCache _memoryCache;
    private readonly IRepository<UserExpertise, Guid> _userExpertiseRepository;
    private readonly IBackgroundTaskQueue<Func<IServiceProvider, CancellationToken, ValueTask>> _mailQueue;
    private readonly ILogger<AuthServices> _logger;
    public AuthServices(IJwtTokenServices jwtServices,
        ILogger<AuthServices> logger,
        IUnitOfWork unitOfWork,
        IUserRepository userRepository,
        IFileStorageFactory fileStorageFactory,
        IOptions<JwtTokenOptions> jwtTokenOptions, 
        IExecutionContext executionContext,
        IRepository<CourseCategory, Guid> courseCategoryRepository,
        IRepository<UserExpertise, Guid> userExpertiseRepository,
        IRazorLightEngine razorLightEngine,
        IMemoryCache memoryCache,
        IBackgroundTaskQueue<Func<IServiceProvider, CancellationToken, ValueTask>> mailQueue)
    {
        _mailQueue = mailQueue;
        _logger = logger;
        _executionContext = executionContext;
        _jwtServices = jwtServices;
        _userRepository = userRepository;
        _jwtTokenOptions = jwtTokenOptions.Value;
        _unitOfWork = unitOfWork;
        _userExpertiseRepository = userExpertiseRepository;
        _razorLightEngine = razorLightEngine;
        _memoryCache = memoryCache;
        _fileStorageServices = fileStorageFactory.Get();
        _courseCategoryRepository = courseCategoryRepository;
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
            await SendVerifyEmailCodeUserAsync(user);
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

    public async Task<Result> RegisterAsync(RegisterRequest registerRequest)
    {
        var userByEmail = await _userRepository.GetByEmailAsync(registerRequest.Email);
        if (userByEmail != null)
        {
            return Result.Failure(400, UserErrors.EmailAlreadyRegister);
        }

        if (registerRequest.Expertises != null && !await ValidateExpertiseValidAsync(registerRequest))
        {
            return Result.Failure(400, UserErrors.UserExpertiseInvalid);
        }

        if (registerRequest.CourseCategoryIds != null && !await ValidateCourseCategoryValidAsync(registerRequest))
        {
            return Result.Failure(400, UserErrors.UserCourseCategoryInvalid);
        }

        var userCouseCategories = GetUserCourseCategories(registerRequest);
        var userExpertises = GetUserExpertises(registerRequest);

        var user = registerRequest.ToUser();
        user.UserCourseCategories = userCouseCategories;
        user.UserExpertises = userExpertises;
            
        var userAvatarUrl =  await UploadImageAndGetAvatarUrlAsync(registerRequest.AvatarUrl);
        user.UserDetail.AvatarUrl = userAvatarUrl;


        _userRepository.Add(user);

        await _unitOfWork.SaveChangesAsync();

        await SendVerifyEmailCodeUserAsync(user);

        return Result<string>.Success(AuthCommandMessages.RegisterSuccessfully);
    }

    public async Task<Result<string>> LogoutAsync()
    {
        var userId = _executionContext.GetUserId();
        var user = await _userRepository.GetByIdAsync(userId, nameof(User.RefreshTokens));
        await RecallUserAccessAndRefreshTokenAsync(user!);
        return AuthCommandMessages.LogoutSuccessfully;
    }

    private async Task<string> UploadImageAndGetAvatarUrlAsync(IFormFile? formFile)
    {
        var imageUrl = UserConstants.ImageUrlDefault;

        if (formFile != null)
        {
            try
            {
                imageUrl = await _fileStorageServices.UploadFileAsync(formFile);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }
        }

        return imageUrl;
    }
    private async Task SendVerifyEmailCodeUserAsync(User user)
    {
        var mailContent = await GetVerifyEmailContentAsync(user);

        await _mailQueue.QueueBackgroundWorkItemAsync(async (sp, cancellationToken) =>
        {
            var mailServices = sp.GetRequiredService<IApplicationMailServices>();
            await mailServices.SendMailAsync(
                    user.Email,
                    MailInformationConstants.TitleVerifyCodeEmail,
                    mailContent,
                    cancellationToken: cancellationToken
                );
        });
    }

    private async Task<bool> ValidateCourseCategoryValidAsync(RegisterRequest registerRequest)
    {
        var courseCategory = await _courseCategoryRepository.GetByIdsAsync(registerRequest.CourseCategoryIds!);
        if (courseCategory.Count != registerRequest.CourseCategoryIds!.Count)
        {
            return false;
        }

        return true;
    }

    private static List<UserExpertise>? GetUserExpertises(RegisterRequest registerRequest)
    {
        return registerRequest.Expertises?
            .Select(id => new UserExpertise { ExpertiseId = id })
            .ToList();
    }
    private static List<UserCourseCategory>? GetUserCourseCategories(RegisterRequest registerRequest)
    {
        return registerRequest.CourseCategoryIds?
            .Select(id => new UserCourseCategory { CourseCategoryId = id })
            .ToList();
    }
    private async Task<bool> ValidateExpertiseValidAsync(RegisterRequest registerRequest)
    {
        var expertise = await _userExpertiseRepository.GetByIdsAsync(registerRequest.Expertises!);
        if (expertise.Count != registerRequest.Expertises!.Count)
        {
            return false;
        }

        return true;
    }

    private async Task<string> GetVerifyEmailContentAsync(User user)
    {

        var code = GenerateVerifyCode();

        SetVerifyCodeIntoMemory(user, code, EmailVerificationModel.ExpireMinutesDefault);

        var emailVerificationModel = new EmailVerificationModel
        {
            Code = code,
            RecipientName = user.UserDetail.FullName
        };
        return await _razorLightEngine.CompileRenderAsync("Templates.VerifyMailTemplate", emailVerificationModel);
    }

    private static string GenerateVerifyCode()
    {
        var random = new Random();
        int code = random.Next(0, 1_000_000);

        return code.ToString("D6");
    }

    private void SetVerifyCodeIntoMemory(User user, string code, int expireMinutes = 5)
    {
        var cacheKey = StringHelper.ReplacePlaceholders(CacheKeyConstants.VerifyEmailCode,
                                                user.Id.ToString(), 
                                                DateTime.UtcNow.ToString("hh:mm:ss dd-mm-yyyy"));
        _memoryCache.Set(cacheKey, code, TimeSpan.FromMinutes(expireMinutes));
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
