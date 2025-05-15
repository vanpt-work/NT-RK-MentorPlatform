﻿namespace MentorPlatform.Application.Commons.Models;
public class QueryParameters
{
    public int PageSize { get; set; } = 10;
    public int PageNumber { get; set; } = 1;
    public string Search { get; set; } = string.Empty;
}
