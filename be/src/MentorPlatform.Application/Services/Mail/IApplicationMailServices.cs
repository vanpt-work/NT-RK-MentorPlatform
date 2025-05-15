
using MentorPlatform.Application.Commons.Models.Mail;
using System.Net.Mail;

namespace MentorPlatform.Application.Services.Mail;

public interface IApplicationMailServices
{
    public Task SendMailAsync(string toEmail, string subject, string body, bool isBodyHtml = true, CancellationToken cancellationToken = default);
    public Task SendMailWithAttachmentAsync(SendMailAttachmentData mailAttachmentData,
        CancellationToken cancellationToken = default);
}