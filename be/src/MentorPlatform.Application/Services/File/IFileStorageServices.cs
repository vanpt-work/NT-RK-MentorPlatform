
using Microsoft.AspNetCore.Http;

namespace MentorPlatform.Application.Services.FileStorage;

public interface IFileStorageServices
{   
    Task<string> UploadFileAsync(IFormFile fileUploadRequest, CancellationToken token = default);
    Task<string> GetPreSignedUrlFile(string filePath);
    Task DeleteFileAsync(string filePath, CancellationToken token = default);
}
