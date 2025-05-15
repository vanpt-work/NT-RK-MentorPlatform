
namespace MentorPlatform.Infrastructure.Options;

public class FileStorageOptions
{
    public AWSS3StorageOptions? AWSS3StorageOptions { get; set; } = default;
    public CloudinaryStorageOptions? CloudinaryStorageOptions { get; set; } = default;

    public string FileStorageProvider { get; set; } = default!;
}
