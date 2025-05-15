
using MentorPlatform.Domain.Primitives;
using System.Text.Json.Serialization;

namespace MentorPlatform.Domain.Entities;

public class User : AuditableEntity, IHasKey<Guid>, ISoftDeleteEntity
{
    public Guid Id { get; set; }
    public bool IsDeleted { get; set; } = false;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public int Role { get; set; }
    public bool IsNotification { get; set; } = true;
    public bool IsReceiveMessage { get; set; } = true;
    public bool IsPrivateProfile { get; set; } = false;
    public bool IsVerifyEmail { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public Guid UserDetailId { get; set; }
    [JsonIgnore]
    public UserDetail UserDetail { get; set; } = default!;
    public virtual ICollection<UserExpertise>? UserExpertises { get; set; } = default;
    public virtual ICollection<UserCourse>? UserCourses { get; set; }
    public virtual ICollection<MentoringSession>? MentoringSessions { get; set; }
    public virtual ICollection<Schedule>? Schedules { get; set; }
    public virtual ICollection<ApplicationRequest>? ApplicationRequests { get; set; }
    public virtual ICollection<UserCourseCategory>? UserCourseCategories { get; set; } = default;
    public virtual ICollection<RefreshToken>? RefreshTokens { get; set; }


}
