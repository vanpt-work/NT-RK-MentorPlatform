
using MentorPlatform.Domain.Enums;
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class Course : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid MentorId { get; set; }
    public User Mentor { get; set; }
    public bool IsDeleted { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public CourseLevel Level { get; set; } = default!;
    public Guid CourseCategoryId { get; set; } = default!;
    public CourseCategory CourseCategory { get;set; } = default!;
    public virtual ICollection<CourseResource>? CourseResources { get; set; }
    public virtual ICollection<UserCourse>?  UserCourses { get; set; }
    public virtual ICollection<MentoringSession>? MentoringSessions { get; set; }

}
