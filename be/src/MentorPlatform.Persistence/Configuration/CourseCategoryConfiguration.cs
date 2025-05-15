
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class CourseCategoryConfiguration : IEntityTypeConfiguration<CourseCategory>
{
    public void Configure(EntityTypeBuilder<CourseCategory> builder)
    {
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
