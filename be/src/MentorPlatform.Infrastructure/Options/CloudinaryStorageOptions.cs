namespace MentorPlatform.Infrastructure.Options;

public class CloudinaryStorageOptions
{
    public string CloudName { get; set; } = default!;
    public string ApiKey { get; set; } = default!;
    public string ApiSecret { get; set; } = default!;
    public MediaSettings MediaSettings { get; set; } = default!;
}

public class MediaSettings
{
    public ImageSettings Images { get; set; } = default!;
    public VideoSettings Videos { get; set; } = default!;
    public DocumentSettings Documents { get; set; } = default!;
}

public class ImageSettings
{
    public string[] AllowedExtensions { get; set; } = default!;
    public long MaxSizeBytes { get; set; } = default!;
    public string FolderPath { get; set; } = default!;
}

public class VideoSettings
{
    public string[] AllowedExtensions { get; set; } = default!;
    public long MaxSizeBytes { get; set; } = default!;
    public string FolderPath { get; set; } = default!;
}

public class DocumentSettings
{
    public string[] AllowedExtensions { get; set; } = default!;
    public long MaxSizeBytes { get; set; } = default!;
    public string FolderPath { get; set; } = default!;
}
