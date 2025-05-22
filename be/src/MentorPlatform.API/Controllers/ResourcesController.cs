﻿using MentorPlatform.Application.Commons.Models.Requests.ResourseRequests;
using MentorPlatform.Application.UseCases.ResourceUseCases;
using MentorPlatform.Domain.Enums;
using MentorPlatform.Application.Commons.Models.Requests.ResourceRequests;
using MentorPlatform.Application.UseCases.ResourceUseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MentorPlatform.WebApi.Controllers;

[Route("api/resources")]
[Authorize]
public class ResourcesController : ApiControllerBase
{
    private readonly IResourceServices _resourceService;

    public ResourcesController(IResourceServices resourceService)
    {
        _resourceService = resourceService;
    }

    [HttpPost]
    [Authorize(Roles = nameof(Role.Mentor))]
    public async Task<IActionResult> CreateResource([FromForm] CreateResourceRequest request)
    {
        var result = await _resourceService.CreateResource(request);
        return ProcessResult(result);
    }

    [HttpPut]
    [Authorize(Roles = nameof(Role.Mentor))]
    public async Task<IActionResult> UpdateResource(EditResourceRequest request)
    {
        var result = await _resourceService.EditResource(request);
        return ProcessResult(result);
    }

    [HttpDelete("id:guid")]
    [Authorize(Roles = nameof(Role.Mentor))]
    public async Task<IActionResult> UpdateResource(Guid id)
    {
        var result = await _resourceService.DeleteResource(id);
        return ProcessResult(result);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] ResourceQueryParameters queryParameters)
    {
        var result = await _resourceService.GetAllAsync(queryParameters);
        return ProcessResult(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var result = await _resourceService.GetByIdAsync(id);
        return ProcessResult(result);
    }

}
