
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class CourseCategory : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public bool IsDeleted { get; set; }
    public string Name { get; set; } = default!;
    public bool IsActive { get; set; } = true;
    public string Description { get; set; } = default!;
    public virtual ICollection<UserCourseCategory>? UserCourseCategories { get; set; } = default;
    public virtual ICollection<Course>? Courses { get; set; } = default;
}
