
using MentorPlatform.Application.Services.File;
using MentorPlatform.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.FileStorage;

public class CloudinaryStorageServices : INamedFileStorageServices
{
    private readonly CloudinaryStorageOptions _cloudinaryStorageOptions;

    public CloudinaryStorageServices(CloudinaryStorageOptions cloudinaryStorageOptions)
    {
        _cloudinaryStorageOptions = cloudinaryStorageOptions;
    }
    public CloudinaryStorageServices(IOptions<CloudinaryStorageOptions> cloudinaryStorageOptions)
    {
        _cloudinaryStorageOptions = cloudinaryStorageOptions.Value;
    }
    public Task<string> UploadFileAsync(IFormFile fileUploadRequest, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }

    public Task<string> GetPreSignedUrlFile(string filePath)
    {
        throw new NotImplementedException();
    }

    public Task DeleteFileAsync(string filePath, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }

    public string ServiceName => nameof(CloudinaryStorageServices);
}
