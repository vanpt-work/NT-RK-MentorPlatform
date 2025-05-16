using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Models.Query;
public class UserQueryParameters : QueryParameters
{
    public Role Role { get; set; } = Role.All;
}