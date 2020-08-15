using System.ComponentModel.DataAnnotations;

namespace Wolf_Front.ViewModels
{
    public class VotePlayers
    {
        /// <summary>
        /// 房間ID
        /// </summary>
        [Required]
        public int RoomID { get; set; }
        /// <summary>
        /// 玩家帳號
        /// </summary>
        [Required]
        public string Account { get; set; }

        /// <summary>
        /// 投票對象號碼
        /// </summary>
        [Required]
        public string Vote { get; set; }

        /// <summary>
        /// 得票數
        /// </summary>
        public int VoteTickets { get; set; }

        /// <summary>
        /// 投票結果
        /// </summary>
        public string voteResult { get; set; }

    }
}
