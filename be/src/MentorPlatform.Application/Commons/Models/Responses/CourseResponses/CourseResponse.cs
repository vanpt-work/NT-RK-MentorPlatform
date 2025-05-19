using MentorPlatform.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentorPlatform.Application.Commons.Models.Responses.Course;
public class CourseResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string CategoryName { get; set; } = default!;
    public CourseLevel Level { get; set; } = default!;
}

public class CourseDetailsResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public Guid CategoryId { get; set; }
    public CourseLevel Level { get; set; } = default!;
    public MentorInfoForCourseResponse Mentor { get; set; } = default!;
    public List<ResourceResponse> Resources { get; set; } = default!;
}

public class MentorInfoForCourseResponse
{
    public string FullName { get; set; } = default!;
    public string? AvatarUrl { get; set; } = default;
    public string? Experience { get; set; } = default;

}

public class ResourceResponse
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string FilePath { get; set; } = default!;
    public string FileType { get; set; } = default!;
   
}