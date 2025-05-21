namespace MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
public class EditResourceRequest
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}
