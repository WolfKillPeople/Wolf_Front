using AutoMapper;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using Wolf_Front.Interface;
using Wolf_Front.Models;
using GameRoom = Wolf_Front.ViewModels.GameRoom;

namespace Wolf_Front.Repository
{
    public class DapperChatHubRepo : IChatRepo
    {
        private readonly string connStr =
            @"data source=werewolfkill.database.windows.net;initial catalog=Werewolfkill;persist security info=True;user id=Werewolfkill;password=Wolfpeoplekill_2020;MultipleActiveResultSets=True;";
        private readonly IMapper _mapper;
        public DapperChatHubRepo(IMapper mapper)
        {
            _mapper = mapper;
        }

        public string GetPlayerPic(string account)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                var sql = @"select Pic from AspNetUsers where UserName = @UserName";
                var total = conn.Query<AspNetUsers>(sql, new { UserName = account}).ToList();
                return total[0].Pic;
            }
        }

        public List<GameRoom> GetRoles()
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();
                const string sql = @"select top 10 * from Occupation";
                var col = conn.Query<Occupation>(sql).ToList();
                var result = _mapper.Map<List<Occupation>, List<GameRoom>>(col);

                return result;
            }
        }
    }
}
