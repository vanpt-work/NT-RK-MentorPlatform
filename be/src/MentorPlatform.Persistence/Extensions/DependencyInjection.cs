
using MentorPlatform.Domain.Repositories;
using MentorPlatform.Persistence.Interceptors;
using MentorPlatform.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MentorPlatform.Persistence.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection ConfigurePersistenceLayer(this IServiceCollection services)
    {
        services.ConfigureApplicationDbContext()
            .ConfigureRepositories();
        return services;
    }

    public static IServiceCollection ConfigureApplicationDbContext(this IServiceCollection services)
    {
        using var serviceProvider = services.BuildServiceProvider();
        var config = serviceProvider.GetRequiredService<IConfiguration>();
        services.AddScoped<AuditableEntityInterceptor>();
        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            var auditableInterceptor = sp.GetRequiredService<AuditableEntityInterceptor>();
            options.UseSqlServer(config.GetConnectionString(nameof(ApplicationDbContext)))
                .AddInterceptors(auditableInterceptor);
        });

        return services;    
    }

    public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, ApplicationDbContext>();
        services.AddScoped<IUserRepository, UserRepository>();
        return services;
    }
}
