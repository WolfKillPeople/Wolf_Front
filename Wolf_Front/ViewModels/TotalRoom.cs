using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wolf_Front.ViewModels
{
    public class TotalRooms
    {
        /// <summary>
        /// 下一間房間
        /// </summary>
        public int TempNextRoom{ get; set; }

        /// <summary>
        /// 房間總數
        /// </summary>
        public int[] Total { get; set; }
    }
}
