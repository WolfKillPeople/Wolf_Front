using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;


namespace Wolf_Front.Services
{
    public class EmailSender : IEmailSender
    {
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor) 
        {
            Options = optionsAccessor.Value;
        }
        public AuthMessageSenderOptions Options { get; }
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            return Execute(Options.SendGridKey, subject, htmlMessage, email);
            //throw new NotImplementedException();
        }

        public Task Execute(string sendGridKey, string subject, string htmlMessage, string email)
        {
            var client = new SendGridClient("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");
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("Aquariusjou@gmail.com", Options.SendGridUser),
                Subject = subject,
                PlainTextContent = htmlMessage,
                HtmlContent = htmlMessage
            };
            msg.AddTo(new EmailAddress(email));
            msg.SetClickTracking(false, false);
            return client.SendEmailAsync(msg);
            //throw new NotImplementedException();
        }
    }
}
