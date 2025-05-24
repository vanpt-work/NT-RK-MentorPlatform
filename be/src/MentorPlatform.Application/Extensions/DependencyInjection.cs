﻿
using FluentValidation;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.Application.UseCases.ApplicationRequestUseCases;
using MentorPlatform.Application.UseCases.Authentication;
using MentorPlatform.Application.UseCases.CourseCategoryUseCases;
using MentorPlatform.Application.UseCases.CourseUseCases;
using MentorPlatform.Application.UseCases.ExpertisesUseCases;
using MentorPlatform.Application.UseCases.ExpertiseUseCases;
using MentorPlatform.Application.UseCases.ResourceUseCases;
using MentorPlatform.Application.UseCases.UserManagement;
using MentorPlatform.CrossCuttingConcerns.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace MentorPlatform.Application.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureApplicationLayer(this IServiceCollection services)
    {
        return services.ConfigureUseCases()
            .ConfigureJwtTokenOptions()
            .ConfigureFluentValidation();
    }

    public static IServiceCollection ConfigureUseCases(this IServiceCollection services)
    {
        var config = services.BuildServiceProvider().GetRequiredService<IConfiguration>();
        services.Configure<FileStorageOptions>(config.GetSection(nameof(FileStorageOptions)));
        services.AddScoped<IAuthServices, AuthServices>();
        services.AddScoped<ICourseCategoryServices, CourseCategoryServices>();
        services.AddScoped<IUserServices, UserServices>();
        services.AddScoped<IApplicationRequestServices, ApplicationRequestServices>();
        services.AddScoped<ICourseServices, CourseServices>();
        services.AddScoped<IExpertiseUseCases, ExpertiseUseCases>();
        services.AddScoped<ICourseServices, CourseServices>();
        services.AddScoped<IResourceServices, ResourceServices>();
        return services;
    }
    public static IServiceCollection ConfigureFluentValidation(this IServiceCollection services)
    {
        ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        return services;
    }

    public static IServiceCollection ConfigureJwtTokenOptions(this IServiceCollection services)
    {
        using var serviceProvider = services.BuildServiceProvider();
        var config = serviceProvider.GetRequiredService<IConfiguration>();
        services.Configure<JwtTokenOptions>(config.GetRequiredSection(nameof(JwtTokenOptions)));
        return services;
    }
}
