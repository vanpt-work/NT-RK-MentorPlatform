using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Enums;
using System.Text.Json.Serialization;

namespace MentorPlatform.Application.Commons.Models.Responses;
public class UserResponse
{
    public Guid Id { get; set; }
    public bool IsDeleted { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; }
    public bool IsNotification { get; set; }
    public bool IsReceiveMessage { get; set; }
    public bool IsPrivateProfile { get; set; }
    public bool IsVerifyEmail { get; set; }
    public bool IsActive { get; set; }
    public DateTime LastActiveDate { get; set; }
    [JsonIgnore]
    public UserDetail UserDetail { get; set; }
}
