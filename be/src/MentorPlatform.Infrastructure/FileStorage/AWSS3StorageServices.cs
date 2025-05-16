
using Amazon.S3;
using Amazon.S3.Model;
using MentorPlatform.Application.Services.File;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.FileStorage;

public class AWSS3StorageServices : INamedFileStorageServices
{
    private readonly AWSS3StorageOptions _awsS3StorageOptions;
    private readonly IAmazonS3 _s3;

    public AWSS3StorageServices(IAmazonS3 s3, AWSS3StorageOptions awsS3StorageOptions)
    {
        _s3 = s3;
        _awsS3StorageOptions = awsS3StorageOptions;
    }
    public AWSS3StorageServices(IAmazonS3 s3, IOptions<AWSS3StorageOptions> awsS3StorageOptions)
    {
        _s3 = s3;
        _awsS3StorageOptions = awsS3StorageOptions.Value;
    }

    public async Task<string> UploadFileAsync(IFormFile fileUploadRequest, CancellationToken token = default)
    {
        if (fileUploadRequest == null || fileUploadRequest.Length == 0)
            throw new ArgumentException(ApplicationExceptionMessage.InvalidFile);

        string folderName = GetFolderNameFromFieldName(fileUploadRequest.Name);
        string fileName = Guid.NewGuid() + Path.GetExtension(fileUploadRequest.FileName);
        string keyName = $"{folderName}/{fileName}";

        using var newMemoryStream = new MemoryStream();
        await fileUploadRequest.CopyToAsync(newMemoryStream, token);

        var uploadRequest = new PutObjectRequest
        {
            InputStream = newMemoryStream,
            Key = keyName,
            BucketName = _awsS3StorageOptions.BucketName,
            ContentType = fileUploadRequest.ContentType
        };

        await _s3.PutObjectAsync(uploadRequest, token);

        return keyName;
    }

    private static string GetFolderNameFromFieldName(string fieldName)
    {
        // TODO: Add folder name logic.
        return fieldName;
    }

    public async Task<string> GetPreSignedUrlFile(string filePath, CancellationToken token = default)
    {
        var urlRequest = new GetPreSignedUrlRequest
        {
            BucketName = _awsS3StorageOptions.BucketName,
            Key = filePath,
        };

        return await _s3.GetPreSignedURLAsync(urlRequest);
    }

    public async Task DeleteFileAsync(string filePath, CancellationToken token = default)
    {
        var deleteRequest = new DeleteObjectRequest
        {
            BucketName = _awsS3StorageOptions.BucketName,
            Key = filePath
        };

        await _s3.DeleteObjectAsync(deleteRequest, token);
    }

    public string ServiceName => nameof(AWSS3StorageServices);
}
