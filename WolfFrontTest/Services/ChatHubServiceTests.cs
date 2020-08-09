using Microsoft.VisualStudio.TestTools.UnitTesting;
using Wolf_Front.Services;
using System;
using System.Collections.Generic;
using Wolf_Front.Interface;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Services.Tests
{
    [TestClass()]
    public class ChatHubServiceTests
    {
        [TestMethod()]
        public void GetRoleTest()
        {
            int o = 0;
            var data = new List<GameRoom>()
            {
                new GameRoom(){RoomId = 1, Account = "aa", ConnectionId = "123", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "bb", ConnectionId = "234", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "cc", ConnectionId = "456", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "dd", ConnectionId = "789", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "ee", ConnectionId = "asdad", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "ff", ConnectionId = "zxcew123", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "gg", ConnectionId = "1d1", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "hh", ConnectionId = "frvwq", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "ii", ConnectionId = "bqd", IsAlive = true},
                new GameRoom(){RoomId = 1, Account = "jj", ConnectionId = "12v1v13", IsAlive = true},
            };

            var _list = new List<GameRoom>()
            {
                new GameRoom{OccupationId =1, Name="狼王",ImgUrl="https://imgur.com/fVQQgnM",Description="狼王",IsGood=false},
                new GameRoom{OccupationId=2,Name = "狼人",ImgUrl="https://imgur.com/n7knadr",Description="狼人",IsGood=false},
                new GameRoom{OccupationId=3,Name="狼人",ImgUrl="https://imgur.com/n7knadr",Description="狼人",IsGood=false},
                new GameRoom{OccupationId=4,Name="預言家",ImgUrl="https://imgur.com/8tiIFAB",Description="預言家",IsGood=true},
                new GameRoom{OccupationId=5,Name="女巫",ImgUrl="https://imgur.com/i9eRyug",Description="女巫",IsGood=true},
                new GameRoom{OccupationId=6,Name="獵人",ImgUrl="https://imgur.com/TIvcUG5",Description="獵人",IsGood=true},
                new GameRoom{OccupationId=7,Name="村民",ImgUrl="https://imgur.com/4eJqZgk",Description="村民",IsGood=true},
                new GameRoom{OccupationId=8,Name="村民",ImgUrl="https://imgur.com/D2o6MV6",Description="村民",IsGood=true},
                new GameRoom{OccupationId=9,Name="村民",ImgUrl="https://imgur.com/4eJqZgk",Description="村民",IsGood=true},
                new GameRoom{OccupationId=10,Name="村民",ImgUrl="https://imgur.com/D2o6MV6",Description="村民",IsGood=true}
            };
            string connectionId = "123";
            var result = new List<GameRoom>();

            var random = new Random();
            for (var i = 0; i < _list.Count; i++)
            {
                var index = random.Next(0, _list.Count - 1);
                if (index != i)
                {
                    var temp = _list[i];
                    _list[i] = _list[index];
                    _list[index] = temp;
                }
            };

            foreach (var d in data)
            {
                d.Name = _list[o].Name;
                d.OccupationId = _list[o].OccupationId;
                d.ImgUrl = _list[o].ImgUrl;
                d.IsGood = _list[o].IsGood;
                d.Description = _list[o].Description;
                o++;
            }

            var t = data.Find(x => x.ConnectionId == connectionId);
            result.Add(t);
            Assert.IsNotNull(result);
            Assert.AreEqual(1,result.Count);
        }
    }
}