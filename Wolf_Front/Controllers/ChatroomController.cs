﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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