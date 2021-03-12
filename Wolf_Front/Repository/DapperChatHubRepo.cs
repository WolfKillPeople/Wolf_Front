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
            @"Data Source=wolfkil.database.windows.net;Initial Catalog=WolfKill;Persist Security Info=True;User ID=dba;Password=Wolf8888";
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
                    total.ForEach(x => data[i].PlayerPic = x.Pic);
                }
                //var total = conn.Query<AspNetUsers>(sql, data).ToList();
                //return total[0].Pic;
                return data;
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
