
namespace MentorPlatform.Infrastructure.Options;

public class AWSS3StorageOptions
{
    public string BucketName { get; set; } = default!;
    public double PresignedUrlDurationHours { get; set; } = 1.0;
}
