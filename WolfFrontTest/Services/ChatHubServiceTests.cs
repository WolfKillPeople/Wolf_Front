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
            int _o = 0;
            var GetPicList = new List<GameRoom>()
            {
                new GameRoom(){RoomId = 1, Account = "aa", IsAlive = true, UserPic = "213.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "bb", IsAlive = true,UserPic = "321.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "cc", IsAlive = true,UserPic = "wdfwf.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "dd", IsAlive = true,UserPic = "dsadac.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "ee", IsAlive = true,UserPic = "zxcv.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "ff", IsAlive = true,UserPic = "123ds.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "gg", IsAlive = true,UserPic = "43f.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "hh", IsAlive = true,UserPic = "3eds.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "ii", IsAlive = true,UserPic = "5tgb.imgur.com"},
                new GameRoom(){RoomId = 1, Account = "jj", IsAlive = true,UserPic = "zxcd.imgur.com"},
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

            foreach (var d in GetPicList)
            {
                d.Name = _list[_o].Name;
                d.OccupationId = _list[_o].OccupationId;
                d.ImgUrl = _list[_o].ImgUrl;
                d.IsGood = _list[_o].IsGood;
                d.Description = _list[_o].Description;
                _o++;
            }

            Assert.IsNotNull(GetPicList);
        }
    }
}