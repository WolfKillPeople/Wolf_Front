using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.Language.Extensions;

namespace Wolf_Front.ViewModels
{
    /// <summary>
    /// RoomInfo
    /// </summary>
    public class RoomInfo
    {
        /// <summary>
        /// 房間Id
        /// </summary>
        public int RoomId { get; set; }

        /// <summary>
        /// 房間編號
        /// </summary>
        public string RoomName { get; set; }

        /// <summary>
        /// 創建房間的那個人的ID
        /// </summary>
        public string ConnectionId { get; set; }

        /// <summary>
        /// 房間人數
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// 玩家帳號
        /// </summary>
        public string[] Account { get; set; }
    }
}

