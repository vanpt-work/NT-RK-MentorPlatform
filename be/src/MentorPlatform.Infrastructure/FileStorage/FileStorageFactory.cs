
using MentorPlatform.Application.Services.File;
using MentorPlatform.Application.Services.FileStorage;
using MentorPlatform.CrossCuttingConcerns.Exceptions;
using MentorPlatform.CrossCuttingConcerns.Helpers;

namespace MentorPlatform.Infrastructure.FileStorage;

public class FileStorageFactory : IFileStorageFactory
{
    private readonly IReadOnlyDictionary<string, IFileStorageServices> _map;

    public FileStorageFactory(IEnumerable<INamedFileStorageServices> services)
    {
        _map = services
            .ToDictionary(s => s.ServiceName, s => (IFileStorageServices)s,
                StringComparer.OrdinalIgnoreCase);
    }

    public IFileStorageServices Get(string provider)
    {
        if (_map.TryGetValue(provider, out var svc))
            return svc;
        throw new ArgumentException(StringHelper.ReplacePlaceholders(
                            ApplicationExceptionMessage.UnknownStorageProvider, 
                            provider));
    }
}
