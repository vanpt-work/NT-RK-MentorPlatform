
namespace MentorPlatform.CrossCuttingConcerns.Exceptions;

public static class ApplicationExceptionMessage
{
    public const string SignatureAlgorithmJwtTokenInvalid = "Invalid signature algorithm jwt token";
    public const string InvalidAccessToken = "Invalid access token";
    public const string BackGroundTaskQueueWorkItemNull = "Background task queue can not queue null work item";
    public const string ErrorOccuredExecutionWorkItem = "Error occurred executing {workItemName}";
    public const string UnknownStorageProvider = "Unknown storage provider: {storageProvider}";

}
