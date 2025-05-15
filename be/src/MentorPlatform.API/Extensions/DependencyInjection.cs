
using FluentValidation.AspNetCore;
using MentorPlatform.Application.Extensions;
using MentorPlatform.CrossCuttingConcerns.Helpers;
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Infrastructure.Extensions;
using MentorPlatform.Persistence;
using MentorPlatform.Persistence.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MentorPlatform.WebApi.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureEntireLayers(this IServiceCollection services)
    {
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
        services.ConfigureApplicationLayer()
            .ConfigurePersistenceLayer()
            .ConfigureInfrastructureLayer();
        return services;
    }

    public static async Task InitializeDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.MigrateAsync().GetAwaiter().GetResult();
        await SeedDataAsync(context);
    }

    private static async Task SeedDataAsync(ApplicationDbContext context)
    {
        await SeedUserDataAsync(context);
        await SeedCourseCategoryDataAsync(context);
    }
    private static async Task SeedUserDataAsync(ApplicationDbContext context)
    {
        if (!await context.Users.AnyAsync())
        {
            var users = new List<User>
            {
                new()
                {
                    Role = (int)Role.Admin, Email = "admin@mentor.com", Password = HashingHelper.HashData("admin123A@"), 
                    UserDetail = new()
                    {
                        FullName = "Admin Vipro Luxyry",
                        CommunicationPreference = 0,
                        Duration = 45,
                        SessionFrequency = 0
                    }
                }
            };

            context.AddRange(users);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedCourseCategoryDataAsync(ApplicationDbContext context)
    {
        if (!await context.CourseCategories.AnyAsync())
        {
            var courseCategories = new List<CourseCategory>
            {
                new()
                {
                    Name = "Software Development",
                    Description = "Courses related to programming, software engineering, and development practices.",
                    IsActive = true
                },
                new()
                {
                    Name = "Data Science",
                    Description = "Courses covering data analysis, machine learning, and AI.",
                    IsActive = true
                },
                new()
                {
                    Name = "Business & Management",
                    Description = "Courses on business strategy, management, and entrepreneurship.",
                    IsActive = true
                },
                new()
                {
                    Name = "Design & Creativity",
                    Description = "Courses in graphic design, UI/UX, and creative arts.",
                    IsActive = true
                },
                new()
                {
                    Name = "Marketing",
                    Description = "Courses on digital marketing, branding, and sales.",
                    IsActive = true
                },
                new()
                {
                    Name = "Personal Development",
                    Description = "Courses for self-improvement, productivity, and soft skills.",
                    IsActive = true
                },
                new()
                {
                    Name = "Finance & Accounting",
                    Description = "Courses on financial literacy, accounting, and investment.",
                    IsActive = true
                },
                new()
                {
                    Name = "Language Learning",
                    Description = "Courses for learning new languages and improving communication.",
                    IsActive = true
                },
                new()
                {
                    Name = "Health & Wellness",
                    Description = "Courses on physical health, mental wellness, and nutrition.",
                    IsActive = true
                },
                new()
                {
                    Name = "Engineering",
                    Description = "Courses in various engineering disciplines and applied sciences.",
                    IsActive = true
                },
                new()
                {
                    Name = "Education & Teaching",
                    Description = "Courses for educators and those interested in teaching.",
                    IsActive = true
                },
                new()
                {
                    Name = "Information Technology",
                    Description = "Courses on IT infrastructure, networking, and cybersecurity.",
                    IsActive = true
                }
            };

            context.AddRange(courseCategories);
            await context.SaveChangesAsync();
        }
    }
}
