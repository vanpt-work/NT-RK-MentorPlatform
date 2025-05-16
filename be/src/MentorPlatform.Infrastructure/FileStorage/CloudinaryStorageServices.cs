using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MentorPlatform.Application.Services.File;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace MentorPlatform.Infrastructure.FileStorage;

public class CloudinaryStorageServices : INamedFileStorageServices
{
    private readonly CloudinaryStorageOptions _cloudinaryStorageOptions;
    private readonly Cloudinary _cloudinary;

    public CloudinaryStorageServices(IOptions<CloudinaryStorageOptions> cloudinaryStorageOptions)
    {
        _cloudinaryStorageOptions = cloudinaryStorageOptions.Value;
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
        
        var uploadParams = CreateUploadParams(fileUploadRequest);
        var uploadResult = await _cloudinary.UploadAsync(uploadParams, token);
        
        if (uploadResult.Error != null)
        {
            throw new Exception(string.Format(ApplicationExceptionMessage.ErrorWhenUpload, uploadResult.Error.Message));
        }
        
        return uploadResult.SecureUrl.ToString();
    }

    private static void ValidateFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException(ApplicationExceptionMessage.InvalidFile);
        }
    }

    private ImageUploadParams CreateUploadParams(IFormFile file)
    {
        string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
        string uploadFolder = DetermineUploadFolder(fileExtension);
        
        return new ImageUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = uploadFolder,
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false
        };
    }

    public Task<string> GetPreSignedUrlFile(string filePath)
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
        
        if (result.Error != null)
        {
            throw new Exception(string.Format(ApplicationExceptionMessage.ErrorWhenDeletingFile, result.Error.Message));
        }
    }
    
    private void ValidateFilePath(string filePath)
    {
        if (string.IsNullOrEmpty(filePath))
        {
            throw new ArgumentException(ApplicationExceptionMessage.InvalidFilePath);
        }
    }
    
    private string DetermineUploadFolder(string fileExtension)
    {
        if (_cloudinaryStorageOptions.MediaSettings?.Images?.AllowedExtensions != null && 
            _cloudinaryStorageOptions.MediaSettings.Images.AllowedExtensions.Contains(fileExtension))
        {
            return _cloudinaryStorageOptions.MediaSettings.Images.FolderPath;
        }
        else if (_cloudinaryStorageOptions.MediaSettings?.Videos?.AllowedExtensions != null && 
                 _cloudinaryStorageOptions.MediaSettings.Videos.AllowedExtensions.Contains(fileExtension))
        {
            return _cloudinaryStorageOptions.MediaSettings.Videos.FolderPath;
        }
        
        return "uploads";
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
