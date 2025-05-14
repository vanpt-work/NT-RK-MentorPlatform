
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class MentoringSession : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid LearnerId { get; set; }
    public User Learner { get; set; } = default!;
    public Guid CourseId { get; set; }
    public Course Course { get; set; } = default!;
    public Guid ScheduleId { get; set; }
    public Schedule Schedule { get; set; } = default!;
    public Guid? OldScheduleId { get; set; } = default;
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int RequestStatus { get; set; }
    public bool IsDeleted { get; set; }
}
