
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
    public static IServiceCollection ConfigureEntireLayers(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
        services.ConfigureApplicationLayer()
            .ConfigurePersistenceLayer(config)
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
    }
    private static async Task SeedUserDataAsync(ApplicationDbContext context)
    {
        if (!await context.Users.AnyAsync())
        {
            var users = new List<User>
            {
                new()
                {
                    Role = (int)Role.Admin, IsVerifyEmail = true, Email = "admin@mentor.com", Password = HashingHelper.HashData("admin123A@"), 
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
}
