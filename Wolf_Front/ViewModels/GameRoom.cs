using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wolf_Front.ViewModels
{
    public class GameRoom
    {
        /// <summary>
        /// 房間ID
        /// </summary>
        public int RoomId { get; set; }
        /// <summary>
        /// 是否存活
        /// </summary>
        public bool isAlive { get; set; }

        /// <summary>
        /// 玩家帳號
        /// </summary>
        public string Account { get; set; }

    }
}
