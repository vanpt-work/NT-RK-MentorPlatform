using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentorPlatform.Application.Commons.ValidationMessages;
public class CourseCategoryModelsValidationMessages
{
    public const string NameNotEmpty = "Name must not be empty";
    public const string NameMaxLength = "Name must not be over 50 characters";
    public const string DescriptionMaxLength = "Description must not be over 200 characters";
}
