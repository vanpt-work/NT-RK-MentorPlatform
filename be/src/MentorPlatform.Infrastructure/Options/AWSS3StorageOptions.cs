
namespace MentorPlatform.Infrastructure.Options;

public class AWSS3StorageOptions
{
    public string Profile { get; set; } = default!;
    public string Region { get; set; } = default!;
    public string AccessKey { get; set; } = default!;
    public string SecretKey { get; set; } = default!;
    public string BucketName { get; set; } = default!;
    public double PresignedUrlDurationHours { get; set; }
}
