
using MentorPlatform.Domain.Constants;
using MentorPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MentorPlatform.Persistence.Configuration;

public class UserDetailConfiguration : IEntityTypeConfiguration<UserDetail>
{
    public void Configure(EntityTypeBuilder<UserDetail> builder)
    {
        builder.HasOne(ud => ud.User)
            .WithOne(u => u.UserDetail)
            .HasForeignKey<User>();
        builder.Property(ud => ud.FullName)
            .HasMaxLength(UserConstants.MaxLengthFullName);

        builder.Property(ud => ud.Bio)
            .HasMaxLength(UserConstants.MaxLengthBio);

        builder.Property(ud => ud.AvatarUrl)
            .HasMaxLength(UserConstants.MaxLengthAvatarUrl);

        builder.Property(ud => ud.ProfessionalSkill)
            .HasMaxLength(UserConstants.MaxLengthProfessionalSkill);

        builder.Property(ud => ud.Experience)
            .HasMaxLength(UserConstants.IndustryExperience);

        builder.Property(ud => ud.Goals)
            .HasMaxLength(UserConstants.MaxLengthGoals);

        builder.Property(ud => ud.LearningStyle)
            .HasMaxLength(UserConstants.MaxLengthLearningStyle);
    }
}
