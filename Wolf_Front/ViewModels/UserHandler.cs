﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wolf_Front.ViewModels
{
    /// <summary>
    /// 全部玩家連線ID
    /// </summary>
    public static class UserHandler
    {
        public static HashSet<string> ConnectionIds = new HashSet<string>();
    }
}
