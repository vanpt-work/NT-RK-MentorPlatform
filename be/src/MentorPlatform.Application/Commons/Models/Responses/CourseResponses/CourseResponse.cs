namespace MentorPlatform.Application.Commons.Models.Responses.Course;
public class CourseResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Level { get; set; } = default!;
}
