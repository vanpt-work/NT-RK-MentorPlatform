
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class Course : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public bool IsDeleted { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Level { get; set; } = default!;
}
