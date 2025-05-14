
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.HasOne(s => s.Mentor)
            .WithMany(m => m.Schedules)
            .HasForeignKey(s => s.MentorId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(ms => ms.MentoringSession)
            .WithOne(s => s.Schedule)
            .HasForeignKey<MentoringSession>(ms => ms.ScheduleId)
            .OnDelete(DeleteBehavior.NoAction);

    }
}
