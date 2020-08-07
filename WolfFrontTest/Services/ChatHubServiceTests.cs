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
            List<GameRoom> data = new List<GameRoom>()
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
            string connectionId = "123";
            var _list = _repo.GetRoles();
            var result = new List<GameRoom>();

            var random = new Random();
            dynamic temp;
            for (var i = 0; i < _list.Count; i++)
            {
                var index = random.Next(0, _list.Count - 1);
                if (index != i)
                {
                    temp = _list[i];
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
        }
    }
}