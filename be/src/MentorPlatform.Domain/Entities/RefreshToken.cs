
using MentorPlatform.Domain.Primitives;

namespace MentorPlatform.Domain.Entities;

public class RefreshToken : AuditableEntity, IHasKey<Guid>
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Expired { get; set; }
    public string Value { get; set; } = default!;
}
