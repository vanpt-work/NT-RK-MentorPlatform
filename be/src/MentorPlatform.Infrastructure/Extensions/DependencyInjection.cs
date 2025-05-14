
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.Infrastructure.Identity;
using MentorPlatform.Infrastructure.Security;
using Microsoft.Extensions.DependencyInjection;

namespace MentorPlatform.Infrastructure.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureInfrastructureLayer(this IServiceCollection services)
    {
        services.ConfigureJwtTokenServices().ConfigureExecutionContext();
        return services;
    }

    public static IServiceCollection ConfigureJwtTokenServices(this IServiceCollection services)
    {
        services.AddScoped<IJwtTokenServices, JwtTokenServices>();
        return services;
    }

    public static IServiceCollection ConfigureExecutionContext(this IServiceCollection services)
    {
        return services.AddScoped<IExecutionContext, ApplicationExecutionContext>();
    }

}
