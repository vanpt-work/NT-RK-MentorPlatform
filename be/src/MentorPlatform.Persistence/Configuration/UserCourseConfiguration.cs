
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class UserCourseConfiguration : IEntityTypeConfiguration<UserCourse>
{
    public void Configure(EntityTypeBuilder<UserCourse> builder)
    {
        builder.HasKey(uc => uc.CourseId);
        builder.HasKey(uc => uc.LearnerId);
        builder.HasKey(uc => new { uc.LearnerId, uc.CourseId });

        builder.HasOne(uc => uc.Learner)
            .WithMany(u => u.UserCourses)
            .HasForeignKey(uc => uc.LearnerId);

        builder.HasOne(uc => uc.Course)
            .WithMany(c => c.UserCourses)
            .HasForeignKey(uc => uc.CourseId);
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
