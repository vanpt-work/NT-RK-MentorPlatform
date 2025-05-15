
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class UserCourseCategoryConfiguartion : IEntityTypeConfiguration<UserCourseCategory>
{
    public void Configure(EntityTypeBuilder<UserCourseCategory> builder)
    {
        builder.HasKey(ucc => ucc.UserId);
        builder.HasKey(ucc => ucc.CategoryId);
        builder.HasKey(ucc => new { ucc.UserId, ucc.CategoryId });

        builder.HasOne(ucc => ucc.User)
            .WithMany(u => u.UserCourseCategories)
            .HasForeignKey(u => u.UserId);

        builder.HasOne(ucc => ucc.Category)
            .WithMany(u => u.UserCourseCategories)
            .HasForeignKey(u => u.CategoryId);
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
