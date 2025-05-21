namespace MentorPlatform.CrossCuttingConcerns.Exceptions;

public static class ApplicationExceptionMessage
{
    public const string SignatureAlgorithmJwtTokenInvalid = "Invalid signature algorithm jwt token";
    public const string InvalidAccessToken = "Invalid access token";
    public const string BackGroundTaskQueueWorkItemNull = "Background task queue can not queue null work item";
    public const string ErrorOccuredExecutionWorkItem = "Error occurred executing {workItemName}";
    public const string UnknownStorageProvider = "Unknown storage provider: {storageProvider}";
    public const string UserIdInExecutionContextInvalid = "User id in execution context invalid";
    public const string UserNotExists = "User not exists";
    public const string RefreshTokenIdInExecutionContextInvalid = "Refresh token id in execution context invalid";
    public const string RefreshTokenNotExists = "Refresh token of user not exists";
    public const string InvalidFile = "Invalid file";
    public const string ErrorWhenUpload = "Error when upload: {0}";
    public const string InvalidFilePath = "Invalid file path";
    public const string ErrorWhenDeletingFile = "Error when deleting file: {0}";
    public const string CouldNotExtractPublicId = "Could not extract Public ID from URL: {0}";
    public const string FileStorageServiceDiError = "An error happened when injecting file service {0}.";
    public const string AWSS3UninitializedError = "The S3 bucket is not initialized.";
    public const string AWSS3Error = "An S3 error occurred.";
    public const string AWSClientError = "An AWS client error occurred.";
    public const string AWSServerError = "An AWS service error occurred.";
}
