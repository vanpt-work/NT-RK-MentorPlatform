using MentorPlatform.Application.UseCases.ExpertisesUseCases;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/[controller]")]
public class ExpertisesController : ApiControllerBase
{
    private readonly ExpertiseUseCases _expertiseUseCases;

    public ExpertisesController(ExpertiseUseCases expertiseUseCases)
    {
        _expertiseUseCases = expertiseUseCases;
    }
    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var result = await _expertiseUseCases.GetAsync();

        return ProcessResult(result);
    }
}
