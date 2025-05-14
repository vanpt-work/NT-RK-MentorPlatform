
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class Schedule : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid MentorId { get; set; }
    public User Mentor { get; set; } = default!;
    public DateTimeOffset DateAvailable { get; set; }
    public TimeOnly StartTime { get; set; } 
    public TimeOnly EndTime { get; set; }
    public MentoringSession? MentoringSession { get; set; }

    public bool IsDeleted { get; set; }
}
