namespace MentorPlatform.Infrastructure.Options;

public class CloudinaryStorageOptions
{
    public string CloudName { get; set; }
    public string ApiKey { get; set; }
    public string ApiSecret { get; set; }
    public MediaSettings MediaSettings { get; set; }
}

public class MediaSettings
{
    public ImageSettings Images { get; set; }
    public VideoSettings Videos { get; set; }
    public DocumentSettings Documents { get; set; }
}

public class ImageSettings
{
    public string[] AllowedExtensions { get; set; }
    public long MaxSizeBytes { get; set; }
    public string FolderPath { get; set; }
}

public class VideoSettings
{
    public string[] AllowedExtensions { get; set; }
    public long MaxSizeBytes { get; set; }
    public string FolderPath { get; set; }
}

public class DocumentSettings
{
    public string[] AllowedExtensions { get; set; }
    public long MaxSizeBytes { get; set; }
    public string FolderPath { get; set; }
}
