
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class CourseResource : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string FileType { get; set; } = default!;
    public string FilePath { get; set; } = default!;
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;

    public Course Course { get; set; } = default!;

    public bool IsDeleted { get; set; }
}
