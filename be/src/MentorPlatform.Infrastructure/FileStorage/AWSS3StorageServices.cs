
using MentorPlatform.Application.Services.File;
using MentorPlatform.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.FileStorage;

public class AWSS3StorageServices : INamedFileStorageServices
{
    private readonly AWSS3StorageOptions _awsS3StorageOptions;

    public AWSS3StorageServices(AWSS3StorageOptions awsS3StorageOptions)
    {
        _awsS3StorageOptions = awsS3StorageOptions;
    }
    public AWSS3StorageServices(IOptions<AWSS3StorageOptions> awsS3StorageOptions)
    {
        _awsS3StorageOptions = awsS3StorageOptions.Value;
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

    public string ServiceName => nameof(AWSS3StorageServices);
}
