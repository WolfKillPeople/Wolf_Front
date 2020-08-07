﻿using System.Collections.Generic;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Interface
{
    public interface IChatHubService
    {
        public List<GameRoom> GetRole(List<GameRoom> data, string connectionId);
        public string GetPlayerPic(string account);
    }
}
