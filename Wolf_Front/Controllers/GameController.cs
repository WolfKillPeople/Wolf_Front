using Microsoft.AspNetCore.Mvc;

namespace Wolf_Front.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}