namespace Wolf_Front.ViewModels
{
    public class GameRoom
    {
        /// <summary>
        /// 房間ID
        /// </summary>
        public int RoomId { get; set; }

        /// <summary>
        /// 玩家帳號
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 角色名稱
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 職業圖片網址
        /// </summary>
        public string ImgUrl { get; set; }

        /// <summary>
        /// 職業ID
        /// </summary>
        public int OccupationId { get; set; }

        /// <summary>
        /// 角色描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 角色的陣營
        /// </summary>
        public bool IsGood { get; set; }

        /// <summary>
        /// 玩家存活狀態
        /// </summary>
        public bool IsAlive { get; set; }

        /// <summary>
        /// 玩家照片
        /// </summary>
        public string UserPic { get; set; }

        /// <summary>
        /// 投票對象
        /// </summary>
        public string Vote { get; set; }

        /// <summary>
        /// 票數
        /// </summary>
        public int Voteticket { get; set; }
    }
}
