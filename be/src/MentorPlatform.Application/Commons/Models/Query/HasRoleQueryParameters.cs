using MentorPlatform.Domain.Enums;

namespace MentorPlatform.Application.Commons.Models.Query;
public class HasRoleQueryParameters : QueryParameters
{
    public Role Role { get; set; } = Role.Admin;
}