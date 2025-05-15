
using MentorPlatform.Application.Services.File;
using MentorPlatform.Infrastructure.Options;
using Microsoft.AspNetCore.Http;

namespace MentorPlatform.Infrastructure.FileStorage;

public class AWSS3StorageServices : INamedFileStorageServices
{
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
