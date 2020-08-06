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
        ConcurrentDictionary<int, List<RoomInfo>> _Rooms = new ConcurrentDictionary<int, List<RoomInfo>>();
        ConcurrentDictionary<int, List<VotePlayers>> _votePlayers = new ConcurrentDictionary<int, List<VotePlayers>>();

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

            Assert.Fail();
        }

        [TestMethod()]
        public void RemoveRoomTest()
        {
            Assert.Fail();
        }
    }
}