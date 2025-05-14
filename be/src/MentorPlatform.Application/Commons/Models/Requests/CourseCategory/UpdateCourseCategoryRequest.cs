using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentorPlatform.Application.Commons.Models.Requests.CourseCategory;
public class UpdateCourseCategoryRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsActive { get; set; }
}
