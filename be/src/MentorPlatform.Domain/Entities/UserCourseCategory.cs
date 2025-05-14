
using MentorPlatform.Domain.Primitives;
using System.Text.Json.Serialization;

namespace MentorPlatform.Domain.Entities;

public class UserCourseCategory : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid CategoryId { get; set; }

    [JsonIgnore] 
    public User User { get; set; } = default!;

    [JsonIgnore]
    public CourseCategory Category { get; set; } = default!;

    public bool IsDeleted { get; set; }
}
