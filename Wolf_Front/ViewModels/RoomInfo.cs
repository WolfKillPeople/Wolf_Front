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
        /// 房間人數
        /// </summary>
        public int Count { get; set; }

        /// <summary>
        /// 玩家帳號
        /// </summary>
        public string[] Account { get; set; }
    }
}

