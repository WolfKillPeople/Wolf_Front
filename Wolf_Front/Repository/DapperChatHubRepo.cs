using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Dapper;
using Wolf_Front.Interface;
using Wolf_Front.Models;
using Wolf_Front.ViewModels;
using GameRoom = Wolf_Front.ViewModels.GameRoom;

namespace Wolf_Front.Repository
{
    public class DapperChatHubRepo : IChatRepo
    {
        private readonly string connStr =
            "data source=werewolfkill.database.windows.net;initial catalog=Werewolfkill;persist security info=True;user id=Werewolfkill;password=Wolfpeoplekill_2020;MultipleActiveResultSets=True;";

        public string GetPlayerPic(string account)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                var sql = "select * from AspNetUsers where RoomId = @account";
                var total = conn.Query<AspNetUsers>(sql, account).ToList();
                return total[0].Pic;
            }
        }

        public List<GameRoom> GetRoles()
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();
                const string sql = "select top 10 Occupation_Name, Occupation_GB, Pic, About from Occupation";
                var col = conn.Query<GameRoom>(sql).ToList();
                return col;
            }
        }
    }
}
