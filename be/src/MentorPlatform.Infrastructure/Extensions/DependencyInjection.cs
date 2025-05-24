﻿using Amazon.S3;
using MentorPlatform.Application.Identity;
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.HostedServices;
using MentorPlatform.Application.Services.Mail;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Infrastructure.Emails;
using MentorPlatform.Infrastructure.FileStorage;
using MentorPlatform.Infrastructure.HostedServices;
using MentorPlatform.Infrastructure.Identity;
using MentorPlatform.Infrastructure.Options;
using MentorPlatform.Infrastructure.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
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
        services.Configure<CloudinaryStorageOptions>(config.GetSection($"{nameof(FileStorageOptions)}:${nameof(CloudinaryStorageOptions)}"));
        services.Configure<AWSS3StorageOptions>(config.GetSection($"{nameof(FileStorageOptions)}:${nameof(AWSS3StorageOptions)}"));
        services.AddDefaultAWSOptions(config.GetAWSOptions());
        services.AddAWSService<IAmazonS3>();

        services.AddScoped<IJwtTokenServices, JwtTokenServices>();
        services
            .AddScoped<INamedFileStorageServices, CloudinaryStorageServices>((serviceProvider) =>
            {
                var fileStorageOptions = serviceProvider.GetRequiredService<IOptions<FileStorageOptions>>().Value;
                return new CloudinaryStorageServices(fileStorageOptions, fileStorageOptions.CloudinaryStorageOptions!);
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
