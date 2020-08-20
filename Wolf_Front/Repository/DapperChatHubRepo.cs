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

        public List<GameRoom> GetPlayerPic(List<GameRoom> data)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                var sql = @"select Pic from AspNetUsers where UserName = @Name";
                var target = new List<GameRoom>();
                for (int i = 0; i < data.Count; i++)
                {
                    var total = conn.Query<AspNetUsers>(sql, new{ Name = data[i].Account}).ToList();
                    total.ForEach(x => data[i].UserPic = x.Pic);
                }
                return data;
            }
        }

        public List<GameRoom> GetRoles()
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();
                const string sql = @"select * from Occupation order by About";
                var col = conn.Query<Occupation>(sql).ToList();
                var result = _mapper.Map<List<Occupation>, List<GameRoom>>(col);

                return result;
            }
        }
    }
}
