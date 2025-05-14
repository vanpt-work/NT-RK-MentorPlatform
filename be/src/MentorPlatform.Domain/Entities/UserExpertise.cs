
using MentorPlatform.Domain.Primitives;
using System.Text.Json.Serialization;

namespace MentorPlatform.Domain.Entities;

public class UserExpertise : AuditableEntity, IHasKey<Guid>
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; } = default!;

    public Guid ExpertiseId { get; set; }
    [JsonIgnore]
    public Expertise Expertise { get; set; } = default!;
}
