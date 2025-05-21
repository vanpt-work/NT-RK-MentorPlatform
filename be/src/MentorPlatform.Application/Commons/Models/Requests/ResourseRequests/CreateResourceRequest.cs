using Microsoft.AspNetCore.Http;

namespace MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
public class CreateResourceRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public IFormFile File { get; set; }
}
