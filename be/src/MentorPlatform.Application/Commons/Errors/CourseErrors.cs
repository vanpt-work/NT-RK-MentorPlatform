using MentorPlatform.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentorPlatform.Application.Commons.Errors;
public static class CourseErrorMessages
{
    public const string CourseNotExists = "Course does not exists";
    public const string CourseDuplicateName = "Course name is duplicated";
    public const string CourseIsUsed = "Course is currently used";
    public const string MentorCanNotViewCourse = "Mentor do not have permission to view this course";
}
public static class CourseErrors
{
    public static Error CourseNotExists => new(nameof(CourseNotExists),
        CourseErrorMessages.CourseNotExists);

    public static Error CourseDuplicateName => new(nameof(CourseDuplicateName),
        CourseErrorMessages.CourseDuplicateName);

    public static Error CourseIsUsed => new(nameof(CourseIsUsed),
       CourseErrorMessages.CourseIsUsed);

    public static Error MentorCanNotViewCourse => new(nameof(MentorCanNotViewCourse),
       CourseErrorMessages.MentorCanNotViewCourse);
}
