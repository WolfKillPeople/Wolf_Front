using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wolf_Front.Controllers
{
    [Route("forgetPassword")]
    public class SendgridMailAppController : Controller
    {
        private readonly IConfiguration _configuration;
        public SendgridMailAppController(IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        [Route("forgetPassword")]
        public async Task PostMessage() 
        {
            var apiKey = _configuration.GetSection("SENDGRID_API_KEY").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("aquariusjou@gmail.com", "Example User 1");
            List<EmailAddress> tos = new List<EmailAddress>
            {
                new EmailAddress("aquariusjou@gmail.com", "Example User 2")
                //new EmailAddress("test3@example.com", "Example User 3"),
                //new EmailAddress("test4@example.com","Example User 4")
            };
            var subject = "Hello world email from Sendgrid ";
            var htmlContent = "<strong>Hello world with HTML content</strong>";
            var displayRecipients = false; // set this to true if you want recipients to see each others mail id 
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, "", htmlContent, false);
            var response = await client.SendEmailAsync(msg);
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
