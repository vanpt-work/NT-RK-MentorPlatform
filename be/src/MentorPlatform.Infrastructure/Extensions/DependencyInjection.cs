using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.Application.Services.HostedServices;
using MentorPlatform.Application.Services.Mail;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.Infrastructure.Emails;
using MentorPlatform.Infrastructure.FileStorage;
using MentorPlatform.Infrastructure.HostedServices;
using MentorPlatform.Infrastructure.Identity;
using MentorPlatform.Infrastructure.Options;
using MentorPlatform.Infrastructure.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureInfrastructureLayer(this IServiceCollection services)
    {
        services.AddTransient<IApplicationMailServices, ApplicationMailServices>();
        services.AddHostedService<MailSenderBackgroundService>();
        services.AddSingleton(typeof(IBackgroundTaskQueue<>), typeof(BackgroundTaskQueue<>));
        services.ConfigureInfrastructureServices()
            .ConfigureExecutionContext()
            .ConfigureInfrastructureOptions();
        return services;
    }

    public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services)
    {
        var config = GetConfiguration(services);

        services.Configure<FileStorageOptions>(config.GetSection(nameof(FileStorageOptions)));
        services.Configure<CloudinaryStorageOptions>(config.GetSection($"{nameof(FileStorageOptions)}:CloudiaryStorageOptions"));

        services.AddScoped<IJwtTokenServices, JwtTokenServices>();
        services
            .AddScoped<INamedFileStorageServices, CloudinaryStorageServices>()
            .AddScoped<INamedFileStorageServices, AWSS3StorageServices>((sp) =>
            {
                var options = sp.GetRequiredService<IOptions<FileStorageOptions>>().Value;
                return new AWSS3StorageServices(options.AWSS3StorageOptions!);
            });
        services.AddScoped<IFileStorageFactory, FileStorageFactory>();
        return services;
    }
    public static IServiceCollection ConfigureExecutionContext(this IServiceCollection services)
    {
        return services.AddScoped<IExecutionContext, ApplicationExecutionContext>();
    }

    public static IServiceCollection ConfigureInfrastructureOptions(this IServiceCollection services)
    {

        var serviceProvider = services.BuildServiceProvider();
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();

        services.Configure<EmailSettingsOptions>(configuration.GetRequiredSection(nameof(EmailSettingsOptions)));
        return services;
    }


    private static IConfiguration GetConfiguration(IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();
        return serviceProvider.GetRequiredService<IConfiguration>();
    }
}
