
namespace MentorPlatform.Application.Commons.Models.Mail;

public class EmailVerificationModel
{
    public const int ExpireMinutesDefault = 5;
    public string RecipientName { get; set; } = default!;
    public string Code { get; set; } = default!;
    public int ExpireMinutes { get; set; } = 5;
    public string SupportEmail { get; set; } = "mentor-connect.support@mentorconnect.com";
    public string AppName { get; set; } = "MentorPlatform";
}
