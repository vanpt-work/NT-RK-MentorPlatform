
namespace MentorPlatform.CrossCuttingConcerns.Exceptions;

public class UnAuthorizedException : ExceptionBase
{
    public UnAuthorizedException(string message) : base(message)
    {
    }
}
