using System;
using Wolf_Front.Hubs;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Wolf_Front.ViewModels;

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
            var list = new List<GameRoom>();
            string[] ary = new string[] { account };
            _list.Add(new RoomInfo { RoomId = 1, Account = ary, Count = 1 });
            list.Add(new GameRoom() { RoomId = 1, Account = account, IsAlive = true });

            _Rooms.TryAdd(roomId, _list);
            _GameRoom.TryAdd(roomId, list);
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
            newgameRooms.Add(new GameRoom { RoomId = roomId, Account = account, IsAlive = true });
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, newgameRooms);

            Assert.IsNotNull(_GameRoom);
            Assert.IsNotNull(_Rooms);
        }

        [TestMethod()]
        public void RemoveRoomTest()
        {
            var account = "oo";
            var _list = new List<RoomInfo>();
            var list = new List<GameRoom>();
            string[] ary = { account };
            _list.Add(new RoomInfo { RoomId = 1, Account = ary, Count = 1 });
            list.Add(new GameRoom() { RoomId = 1, Account = account, IsAlive = true });

            _Rooms.TryAdd(1, _list);
            _GameRoom.TryAdd(1, list);

            int temp = 0;
            _Rooms.TryRemove(1, out _);
            _GameRoom.TryRemove(1, out _);

            IEnumerable<RoomInfo> target;

            if (_Rooms.IsEmpty == true)
            {
                temp = 1;
                target = null;
                Assert.IsTrue(target == null && temp == 1);
            }

            target = _Rooms.Values.SelectMany(x => x);

            for (int i = 0; i < target.ToList().Count; i++)
            {
                if (_Rooms.Keys.ToList()[i] != i + 1)
                {
                    temp = 0;
                    temp = i + 1;
                    break;
                }
            }

            Assert.AreEqual(1, temp);
        }

        [TestMethod()]
        public void GetAllRoomTest()
        {
            var account = "oo";
            var _list = new List<RoomInfo>();
            string[] ary = { account };
            _list.Add(new RoomInfo { RoomId = 1, Account = ary, Count = 1 });
            _Rooms.TryAdd(1, _list);

            var _temp = 0;
            var data = _Rooms.SelectMany(x => x.Value).ToList();

            if (data.Count == 0) _temp = 1;

            for (int i = 0; i < data.Count; i++)
            {
                if (data[i].RoomId != i + 1)
                {
                    _temp = 0;
                    _temp = i + 1;
                    break;
                }
                else
                {
                    _temp = Enumerable.LastOrDefault(data).RoomId + 1;
                }

            }

            Assert.AreEqual(2, _temp);
            Assert.AreEqual(1, data.Count);
        }

        [TestMethod()]
        public void VoteResultTest()
        {
            var data = new List<VotePlayers>()
            {
                new VotePlayers{RoomID = 1, Account="Text001@gmail.com", Vote="1",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text002@gmail.com", Vote="2",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text003@gmail.com", Vote="2",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text004@gmail.com", Vote="2",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text005@gmail.com", Vote="4",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text006@gmail.com", Vote="3",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text007@gmail.com", Vote="8",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text008@gmail.com", Vote="2",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text009@gmail.com", Vote="1",voteResult = null},
                new VotePlayers{RoomID = 1, Account="Text0010@gmail.com", Vote="9",voteResult = null},
            };

            var newData = data.ToList().FindAll(x => x.Vote != null).ToList();
            newData.ForEach(i => data[Convert.ToInt32(i.Vote) - 1].VoteTickets++);

            var ran = new Random();
            var newVotePlayers = data.OrderByDescending(x => x.VoteTickets).ToList();
            newVotePlayers.ForEach(x => { x.voteResult = x.Vote; x.Account = null; });

            if (newVotePlayers.Count > 1 && newVotePlayers[0].VoteTickets == newVotePlayers[1].VoteTickets)
            {
                for (var r = 0; r < newVotePlayers.Count; r++)
                {
                    var index = ran.Next(0, newVotePlayers.Count - 1);
                    if (index == r) continue;
                    var temp = newVotePlayers[r];
                    newVotePlayers[r] = newVotePlayers[index];
                    newVotePlayers[index] = temp;
                };
            }

            Assert.AreEqual(4, newVotePlayers.Take(1).ToList()[0].VoteTickets);
        }
    }
}