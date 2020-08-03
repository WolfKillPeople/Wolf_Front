using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wolf_Front.Models;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Hubs
{

    public class ChatHub : Hub
    {
        //static ConcurrentDictionary<int, RoomInfo> _Rooms = new ConcurrentDictionary<int, RoomInfo>();

        static ConcurrentDictionary<int, List<RoomInfo>> _Rooms = new ConcurrentDictionary<int, List<RoomInfo>>();


        static ConcurrentDictionary<int, List<VotePlayers>> _votePlayers = new ConcurrentDictionary<int, List<VotePlayers>>();

        static List<VotePlayers> votePlayers = new List<VotePlayers>();
        /// <summary>
        /// SendMessage
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        /// <summary>
        /// CreateRoom
        /// </summary>
        /// <param name="roomName"></param>
        /// /// <param name="account"></param>
        /// <returns></returns>
        public Task<ResponseBase<string>> CreateRoom(string roomName, string account)
        {
            if (_Rooms.ContainsKey(int.Parse(roomName.Substring(0, 2))) == true)
            {
                return Task.FromResult(new ResponseBase<string>() { Success = false, Message = "房間已存在" });
            }
            var roomKey = _Rooms[int.Parse(roomName.Substring(0, 2))];

            List<string> accountTemp = new List<string>();
            accountTemp.Add(account);

            var model = new List<RoomInfo>();

            model.Add(new RoomInfo { RoomId = int.Parse(roomName.Substring(0, 2)), RoomName = roomName, Count = 1, Account = accountTemp.ToArray() });
            roomKey.AddRange(model);
            _Rooms.TryAdd(model[0].RoomId, model);
            _votePlayers.TryAdd(model[0].RoomId, new List<VotePlayers>());
            Groups.AddToGroupAsync(base.Context.ConnectionId, model[0].RoomId.ToString());

            //將roomId傳給大家
            Clients.All.SendAsync("NewRoom", model[0].RoomId);

            return Task.FromResult(new ResponseBase<string>() { Success = true, Data = model[0].RoomId.ToString(), Count = model[0].Count });
        }

        /// <summary>
        /// JoinRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="count"></param>
        /// <param name="Account"></param>
        /// <returns></returns>
        public Task<ResponseBase<List<RoomInfo>>> JoinRoom(int roomId, int count, string Account, string roomName)
        {
            int i = 0;
            if (!_Rooms.ContainsKey(roomId))
            {
                return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = false });
            }
            foreach (var item in _Rooms.Values)
            {
                if (item[i].RoomId == roomId && item[i].Count.Equals(10))
                {
                    return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = false });
                }
                i++;
            }
            _Rooms.TryGetValue(roomId, out var target);

            var acc = target[0].Account;
            var tempList = new List<string>();
            //assign old value and new value to new List
            foreach (var item in acc)
            {
                tempList.Add(item);
            }
            tempList.Add(Account);

            var newValue = (from t in target
                            select new RoomInfo
                            {
                                RoomId = roomId,
                                RoomName = roomName,
                                Account = tempList.ToArray(),
                                Count = tempList.Count,
                            }).ToList();

            _Rooms.TryUpdate(roomId, newValue, target);


            Groups.AddToGroupAsync(base.Context.ConnectionId, roomId.ToString());
            //只在這個房間傳送訊息
            Clients.Groups(roomId.ToString()).SendAsync("JoinRoom", "歡迎" + Account);

            return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = true, Data = newValue });
        }

        /// <summary>
        /// GetAllRoom
        /// </summary>
        /// <returns></returns>
        public Task<ResponseBase<List<RoomInfo>>> GetAllRoom()
        {
            var data = _Rooms.Values.SelectMany(x => x).ToList();
            return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = true, Data = data });
        }


        /// <summary>
        /// RemoveRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public Task<ResponseBase<bool>> RemoveRoom(int roomId)
        {
            Clients.Groups(roomId.ToString()).SendAsync("RemoveRoom");
            _Rooms.TryRemove(roomId, out _);
            return Task.FromResult(new ResponseBase<bool>() { Success = true });
        }

        /// <summary>
        /// Vote
        /// </summary>
        /// <param name="data"></param>
        public void Vote(IEnumerable<VotePlayers> data)
        {
            if (_votePlayers.ContainsKey(data.ToList()[0].RoomID))
            {
                _votePlayers.TryRemove(data.ToList()[0].RoomID, out _);
            }

            var roomKey = _votePlayers[data.ToList()[0].RoomID];

            votePlayers.ForEach(x => x.VoteTickets = 0);

            if (votePlayers.Exists(x => data.ToList()[0].User == x.User) == false)
            {
                votePlayers.AddRange(data);
            }
            else
            {
                var index = votePlayers.IndexOf(data.ToList()[0]);
                votePlayers.InsertRange(index, data);
            }

            for (int i = 0; i < votePlayers.Count; i++)
            {
                for (int o = 0; o < votePlayers.Count; o++)
                {
                    if (votePlayers[i].Vote == votePlayers[o].Vote)
                    {
                        votePlayers[i].VoteTickets++;
                    }
                }
            }

            var ran = new Random();
            var newVotePlayers = votePlayers.OrderByDescending(x => x.VoteTickets).ToList();

            for (int i = 0; i < newVotePlayers.Count; i++)
            {
                for (int o = 0; o < newVotePlayers.Count; o++)
                {
                    if (newVotePlayers[i].VoteTickets == newVotePlayers[o].VoteTickets)
                    {
                        dynamic temp;
                        for (var r = 0; r < newVotePlayers.Count; r++)
                        {
                            var index = ran.Next(0, newVotePlayers.Count - 1);
                            if (index != r)
                            {
                                temp = newVotePlayers[r];
                                newVotePlayers[r] = newVotePlayers[index];
                                newVotePlayers[index] = temp;
                            }
                        };


                        newVotePlayers.ForEach(x => { x.voteResult = x.Vote; x.User = null; });
                        roomKey.AddRange(newVotePlayers.Take(1));
                    }
                }
            }


            newVotePlayers.ForEach(x => { x.voteResult = x.Vote; x.User = null; });
            roomKey.AddRange(newVotePlayers.Take(1));
        }


        /// <summary>
        /// VoteResult
        /// </summary>
        /// <param name="RoomId"></param>
        /// <returns></returns>
        public Task VoteResult(int RoomId)
        {
            var data = _votePlayers[RoomId].ToList();
            var target = data[0];
            return Clients.Groups(RoomId.ToString()).SendAsync("VoteResult", target);
        }
    }
}
