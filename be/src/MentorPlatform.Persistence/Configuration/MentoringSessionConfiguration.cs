
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class MentoringSessionConfiguration : IEntityTypeConfiguration<MentoringSession>
{
    public void Configure(EntityTypeBuilder<MentoringSession> builder)
    {

        builder.HasOne(u => u.Learner)
            .WithMany(u => u.MentoringSessions)
            .HasForeignKey(u => u.LearnerId);

        builder.HasOne(u => u.Course)
            .WithMany(u => u.MentoringSessions)
            .HasForeignKey(u => u.CourseId);
        builder.HasQueryFilter(cc => !cc.IsDeleted);
    }
}
