
using MentorPlatform.Domain.Constants;
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasQueryFilter(u => !u.IsDeleted);
        builder.Property(u => u.Email)
            .HasMaxLength(UserConstants.MaxLengthGmail);
        builder.Property(u => u.Password)
            .HasMaxLength(UserConstants.MaxLengthPassword);

        builder.HasMany(u => u.RefreshTokens)
            .WithOne()
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
