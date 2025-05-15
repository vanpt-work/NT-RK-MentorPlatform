using MentorPlatform.Application.Services.Security;
using MentorPlatform.WebApi.Extensions;
using MentorPlatform.WebApi.Middlewares;
using MentorPlatform.WebApi.OpenApi;
using MentorPlatform.WebApi.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwaggerGen(SwaggerGenOptionsConfig.ConfigureSwaggerGenOptions);
builder.Services.AddOpenApi();



builder.Services.AddControllers();
builder.Services.ConfigureEntireLayers(builder.Configuration);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    var jwtTokenOptions = new JwtTokenOptions();
    builder.Configuration.GetRequiredSection(nameof(JwtTokenOptions)).Bind(jwtTokenOptions);
    var rsa = RSA.Create();
    rsa.ImportRSAPublicKey(Convert.FromBase64String(jwtTokenOptions.PublicKey), out _);

    options.RequireHttpsMetadata = jwtTokenOptions.RequireHttpsMetadata;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = jwtTokenOptions.ValidateIssuer,
        ValidateAudience = jwtTokenOptions.ValidateAudience,
        ValidIssuer = jwtTokenOptions.Issuer,
        ValidAudience = jwtTokenOptions.Audience,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new RsaSecurityKey(rsa),
        ClockSkew = TimeSpan.Zero
    };
});

var corsOptions = new CorsOptions();
builder.Configuration.GetRequiredSection(nameof(CorsOptions)).Bind(corsOptions);
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(corsOptions.PolicyName!, p =>
    {
        p.WithOrigins(corsOptions.AllowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod();
        if (corsOptions.AllowCredentials)
            p.AllowCredentials();
        else
            p.DisallowCredentials();
    });
});
builder.Services.AddExceptionHandler<GlobalHandlingExceptionMiddleware>();
builder.Services.AddMemoryCache();
  var app = builder.Build();

app.UseExceptionHandler((_) => { });
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    await app.InitializeDatabaseAsync();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.UseMiddleware<ExecutionContextMiddleware>();
app.MapControllers();
await app.RunAsync();

