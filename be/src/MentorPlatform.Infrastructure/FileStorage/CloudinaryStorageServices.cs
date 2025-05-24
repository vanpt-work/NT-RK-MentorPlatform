using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MentorPlatform.Application.Services.File;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.CrossCuttingConcerns.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.FileStorage;

public class CloudinaryStorageServices : INamedFileStorageServices
{
    private readonly FileStorageOptions _fileStorageOptions;
    private readonly CloudinaryStorageOptions _cloudinaryStorageOptions;
    private readonly Cloudinary _cloudinary;

    public CloudinaryStorageServices(IOptions<FileStorageOptions> fileStorageOptions, IOptions<CloudinaryStorageOptions> cloudinaryStorageOptions)
    {
        _fileStorageOptions = fileStorageOptions.Value;
        _cloudinaryStorageOptions = cloudinaryStorageOptions.Value;
        _cloudinary = SetupCloudinary();
    }
    public CloudinaryStorageServices(FileStorageOptions fileStorageOptions, CloudinaryStorageOptions cloudinaryStorageOptions)
    {
        _fileStorageOptions = fileStorageOptions;
        _cloudinaryStorageOptions = cloudinaryStorageOptions;
        _cloudinary = SetupCloudinary();
    }

    private Cloudinary SetupCloudinary()
    {
        var account = new Account(
            _cloudinaryStorageOptions.CloudName,
            _cloudinaryStorageOptions.ApiKey,
            _cloudinaryStorageOptions.ApiSecret);

        return new Cloudinary(account);
    }

    public async Task<string> UploadFileAsync(IFormFile fileUploadRequest, CancellationToken token = default)
    {
        ValidateFile(fileUploadRequest);
        var uploadResult = await UploadMediaFileAsync(fileUploadRequest, token);
        return uploadResult.SecureUrl.ToString();
    }

    private static void ValidateFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException(ApplicationExceptionMessage.InvalidFile);
        }
    }

    public Task<string> GetPreSignedUrlFile(string filePath, CancellationToken token = default)
    {
        ValidateFilePath(filePath);
        return Task.FromResult(filePath);
    }

    public async Task DeleteFileAsync(string filePath, CancellationToken token = default)
    {
        ValidateFilePath(filePath);
        string publicId = ExtractPublicIdFromUrl(filePath);
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        CheckErrorDeleteMediaFileResult(result);
    }

    public string GetOriginFilePathFromFileSignedPath(string filePathSigned)
    {
        return filePathSigned;
    }

    private static void ValidateFilePath(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            throw new ArgumentException(ApplicationExceptionMessage.InvalidFilePath);
        }
    }

    private Task<RawUploadResult> UploadMediaFileAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (_fileStorageOptions.MediaSettings?.Images?.AllowedExtensions != null &&
            _fileStorageOptions.MediaSettings.Images.AllowedExtensions.Contains(fileExtension))
        {
            return UploadImageAsync(file, cancellationToken);
        }
        else if (_fileStorageOptions.MediaSettings?.Videos?.AllowedExtensions != null &&
                 _fileStorageOptions.MediaSettings.Videos.AllowedExtensions.Contains(fileExtension))
        {
            return UploadVideoAsync(file, cancellationToken);
        }
        else if (_fileStorageOptions.MediaSettings?.Documents?.AllowedExtensions != null &&
                _fileStorageOptions.MediaSettings.Documents.AllowedExtensions.Contains(fileExtension))
        {
            return UploadDocumentAsync(file, cancellationToken);
        }

        return Task.FromResult(new RawUploadResult());
    }

    private async Task<RawUploadResult> UploadImageAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        var uploadParams = CreateUploadImageParams(file);
        var uploadResult = await _cloudinary.UploadAsync(uploadParams, cancellationToken);

        CheckErrorUploadMediaFileResult(uploadResult);

        return uploadResult;
    }
    private async Task<RawUploadResult> UploadVideoAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        var uploadParams = CreateUploadVideoParams(file);
        var uploadResult = await _cloudinary.UploadAsync(uploadParams, cancellationToken);

        CheckErrorUploadMediaFileResult(uploadResult);

        return uploadResult;
    }
    private async Task<RawUploadResult> UploadDocumentAsync(IFormFile file, CancellationToken cancellationToken = default)
    {
        var uploadParams = CreateUploadDocumentParams(file);
        var uploadResult = await _cloudinary.UploadAsync(uploadParams, cancellationToken: cancellationToken);

        CheckErrorUploadMediaFileResult(uploadResult);

        return uploadResult;
    }

    private static void CheckErrorUploadMediaFileResult(RawUploadResult uploadResult)
    {
        if (uploadResult.Error != null)
        {
            throw new UploadFileException(string.Format(ApplicationExceptionMessage.ErrorWhenUpload, uploadResult.Error.Message));
        }
    }
    private static void CheckErrorDeleteMediaFileResult(DeletionResult deleteResult)
    {
        if (deleteResult.Error != null)
        {
            throw new UploadFileException(string.Format(ApplicationExceptionMessage.ErrorWhenDeletingFile, deleteResult.Error.Message));
        }
    }
    private ImageUploadParams CreateUploadImageParams(IFormFile file)
    {
        var uploadFolder = _fileStorageOptions.MediaSettings.Images.FolderPath;
        return new ImageUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = uploadFolder,
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };
    }
    private VideoUploadParams CreateUploadVideoParams(IFormFile file)
    {
        var uploadFolder = _fileStorageOptions.MediaSettings.Images.FolderPath;
        return new VideoUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = uploadFolder,
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };
    }
    private RawUploadParams CreateUploadDocumentParams(IFormFile file)
    {
        var uploadFolder = _fileStorageOptions.MediaSettings.Images.FolderPath;
        return new RawUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = uploadFolder,
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };
    }
    private static string ExtractPublicIdFromUrl(string url)
    {
        try
        {
            var uri = new Uri(url);
            var pathSegments = uri.AbsolutePath.Split('/');

            int uploadIndex = Array.IndexOf(pathSegments, "upload");
            if (uploadIndex >= 0 && pathSegments.Length > uploadIndex + 1)
            {
                string fileName = Path.GetFileNameWithoutExtension(pathSegments[pathSegments.Length - 1]);

                var publicIdSegments = pathSegments
                    .Skip(uploadIndex + 1)
                    .Take(pathSegments.Length - uploadIndex - 2)
                    .ToList();

                publicIdSegments.Add(fileName);
                return string.Join("/", publicIdSegments);
            }
        }
        catch (Exception ex)
        {
            throw new ArgumentException(string.Format(ApplicationExceptionMessage.CouldNotExtractPublicId, url), ex);
        }

        throw new ArgumentException(string.Format(ApplicationExceptionMessage.CouldNotExtractPublicId, url));
    }

    public string ServiceName => nameof(CloudinaryStorageServices);
}
