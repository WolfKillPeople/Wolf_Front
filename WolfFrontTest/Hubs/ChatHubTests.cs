using Wolf_Front.Hubs;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using Wolf_Front.ViewModels;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using System.Linq;

namespace Wolf_Front.Hubs.Tests
{
    [TestClass()]
    public class ChatHubTests
    {
        static ConcurrentDictionary<int, List<RoomInfo>> _Rooms = new ConcurrentDictionary<int, List<RoomInfo>>();
        static ConcurrentDictionary<int, List<VotePlayers>> _votePlayers = new ConcurrentDictionary<int, List<VotePlayers>>();
        static ConcurrentDictionary<int, List<GameRoom>> _GameRoom = new ConcurrentDictionary<int, List<GameRoom>>();

        [TestMethod()]
        public void CreateRoomTest()
        {
            int roomId = 1;
            string account = "oo";
            List<string> accountTemp = new List<string>();
            var model = new List<RoomInfo>();
            int TempNextRoom = 0;

            accountTemp.Add(account);
            model.Add(new RoomInfo { RoomId = roomId, Count = accountTemp.Count, Account = accountTemp.ToArray() });
            _Rooms.TryAdd(model[0].RoomId, model);

            var RoomList = _Rooms.Values.SelectMany(o => o).ToList();
            if (RoomList.Count == 0)
            {
                TempNextRoom = 1;
            }

            for (int i = 0; i < RoomList.Count; i++)
            {
                if (RoomList[i].RoomId != i + 1)
                {
                    TempNextRoom = i + 1;
                }
                else
                {
                    TempNextRoom = RoomList.Last().RoomId + 1;
                }

            }


            Assert.AreEqual(2, TempNextRoom);
        }

        [TestMethod()]
        public void JoinRoomTest()
        {
            int roomId = 1;
            string account = "oo";
            List<RoomInfo> _list = new List<RoomInfo>();
            string[] ary = new string[] { account};
            _list.Add(new RoomInfo { RoomId = 1, Account = ary, Count = 1 });
            _Rooms.TryAdd(roomId, _list);
            foreach (var item in _Rooms.Values)
            {
                var _target = item.Find(x => x.RoomId == roomId);
                if (_target != null && _target.Count.Equals(10))
                {
                    Assert.Fail();
                }
                else
                {
                    break;
                }
            }

            _Rooms.TryGetValue(roomId, out var target);

            var acc = target[0].Account;
            var tempList = new List<string>();

            //assign old value and new value to new List
            foreach (var item in acc)
            {
                tempList.Add(item);
            }
            tempList.Add(account);

            var newRoomValue = (from t in target
                                select new RoomInfo
                                {
                                    RoomId = roomId,
                                    Account = tempList.ToArray(),
                                    Count = tempList.Count,
                                }).ToList();

            _Rooms.TryUpdate(roomId, newRoomValue, target);

            //value assign to gamerooom

            _GameRoom.TryGetValue(roomId, out var newgameRooms);
            newgameRooms.Add(new GameRoom { RoomId = roomId, Account = account, isAlive = true });
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, newgameRooms);

            Assert.IsNotNull(_GameRoom);
            Assert.IsNotNull(_Rooms);
        }

        [TestMethod()]
        public void RemoveRoomTest()
        {
            int roomId = 1;
            int temp = 0;
            _Rooms.TryRemove(roomId, out _);
            _GameRoom.TryRemove(roomId, out _);
            var target = _Rooms.Values.SelectMany(x => x);

            for (int i = 0; i < target.ToList().Count; i++)
            {
                if (_Rooms.Keys.ToList()[i] != i + 1)
                {
                    temp = 0;
                    temp = i + 1;
                    break;
                }
            }

            Assert.AreEqual(1,temp);
        }
    }
}