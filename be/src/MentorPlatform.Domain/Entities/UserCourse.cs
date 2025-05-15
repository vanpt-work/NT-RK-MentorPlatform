
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class UserCourse : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid LearnerId { get; set; }
    public Guid CourseId { get; set; }
    public DateTime JoinDate { get; set; }
    public int Status { get; set; }
    public User Learner { get; set; } = default!;
    public Course Course { get; set; } = default!;
    public bool IsDeleted { get; set; }
}
