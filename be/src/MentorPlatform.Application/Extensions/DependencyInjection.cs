
using FluentValidation;
using FluentValidation.AspNetCore;
using MentorPlatform.Application.Services.Security;
using MentorPlatform.Application.UseCases.Authentication;
using MentorPlatform.Application.UseCases.Course;
using MentorPlatform.Application.UseCases.CourseCategory;
using MentorPlatform.Application.UseCases.ExpertisesUseCases;
using MentorPlatform.Application.UseCases.ExpertiseUseCases;
using MentorPlatform.Application.UseCases.UserManagement;
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
        services.AddScoped<IAuthServices, AuthServices>();
        services.AddScoped<ICourseCategoryServices, CourseCategoryServices>();
        services.AddScoped<IUserServices, UserServices>();
        services.AddScoped<IExpertiseUseCases, ExpertiseUseCases>();
        services.AddScoped<ICourseServices, CourseServices>();
        return services;
    }
    public static IServiceCollection ConfigureFluentValidation(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddFluentValidationAutoValidation(fv => {
            fv.DisableDataAnnotationsValidation = true;
        });
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
