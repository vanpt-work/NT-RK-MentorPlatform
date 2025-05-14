
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class Expertise : AuditableEntity, IHasKey<Guid>
{
    public string Name { get; set; } = default!;
    public Guid Id { get; set; }
    public virtual ICollection<UserExpertise>? UserExpertise { get; set; }
}
