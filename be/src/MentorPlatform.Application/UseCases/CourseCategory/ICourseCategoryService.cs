using MentorPlatform.Application.Commons.Models;
using MentorPlatform.Application.Commons.Models.Requests.CourseCategory;
using MentorPlatform.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentorPlatform.Application.UseCases.CourseCategory;
public interface ICourseCategoryService
{
    public Task<Result> GetAllAsync(QueryParameters queryParameters);
    public Task<Result> GetByIdAsync(Guid id);
    public Task<Result> CreateAsync(CreateCourseCategoryRequest createRequest);
    public Task<Result> UpdateAsync(Guid id, UpdateCourseCategoryRequest updateRequest);
    public Task<Result> DeleteAsync(Guid id);

}
