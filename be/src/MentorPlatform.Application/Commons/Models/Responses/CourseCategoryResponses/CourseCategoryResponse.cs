using MentorPlatform.Application.Commons.Models.Responses.Course;

namespace MentorPlatform.Application.Commons.Models.Responses.CourseCategory;
public class CourseCategoryResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int CourseCount { get; set; } = default!;
    public bool IsActive { get; set; } = true;
}

public class CourseCategoryDetailResponse : CourseCategoryResponse
{
    public List<CourseResponse> Courses { get; set; }
}
