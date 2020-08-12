using Microsoft.AspNetCore.Mvc;

namespace Wolf_Front.Controllers
{
    public class ChatroomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}