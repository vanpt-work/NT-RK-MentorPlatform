
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class ApplicationRequestConfiguration : IEntityTypeConfiguration<ApplicationRequest>
{
    public void Configure(EntityTypeBuilder<ApplicationRequest> builder)
    {
        builder.HasOne(ar => ar.User)
            .WithMany(u => u.ApplicationRequests)
            .HasForeignKey(ar => ar.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
