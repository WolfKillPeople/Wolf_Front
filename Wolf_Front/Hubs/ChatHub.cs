using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Hubs
{

    public class ChatHub : Hub
    {
        static ConcurrentDictionary<int, RoomInfo> _Rooms = new ConcurrentDictionary<int, RoomInfo>();

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
        /// <param name="roomId"></param>
        /// /// <param name="account"></param>
        /// <returns></returns>
        public Task<ResponseBase<string>> CreateRoom(int roomId, string account)
        {
            if (_Rooms.Values.Count(x => x.RoomId == roomId) > 0)
            {
                return Task.FromResult(new ResponseBase<string>() { Success = false, Message = "房間已存在" });
            }

            var model = new RoomInfo() { RoomId = roomId++, ConnectionId = base.Context.ConnectionId, Count = 1, Account = account };
            _Rooms.TryAdd(model.RoomId, model);
            _votePlayers.TryAdd(model.RoomId, new List<VotePlayers>());
            Groups.AddToGroupAsync(base.Context.ConnectionId, model.RoomId.ToString());
            //將roomId傳給大家
            Clients.All.SendAsync("NewRoom", model.RoomId);

            return Task.FromResult(new ResponseBase<string>() { Success = true, Data = model.RoomId.ToString(), Count = 1 });
        }

        /// <summary>
        /// JoinRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="count"></param>
        /// <param name="Account"></param>
        /// <returns></returns>
        public Task<ResponseBase<string>> JoinRoom(int roomId, int count, string Account)
        {
            if (!_Rooms.ContainsKey(roomId) || _Rooms.Values.Where(x => x.RoomId == roomId).Select(x => x.Count).Equals(10))
            {
                return Task.FromResult(new ResponseBase<string>() { Success = false, Message = "無法進入房間" });
            }
            count++;
            Groups.AddToGroupAsync(base.Context.ConnectionId, roomId.ToString());
            //只在這個房間傳送訊息
            Clients.Groups(roomId.ToString()).SendAsync("JoinRoom", "歡迎" + Account);

            return Task.FromResult(new ResponseBase<string>() { Success = true, Count = count, Account = Account });
        }

        /// <summary>
        /// GetAllRoom
        /// </summary>
        /// <returns></returns>
        public Task<ResponseBase<List<RoomInfo>>> GetAllRoom()
        {
            var data = (from l in _Rooms.Values
                        select new RoomInfo
                        {
                            RoomId = l.RoomId,
                            Count = l.Count,
                            ConnectionId = l.ConnectionId,
                            Account = l.Account
                        }).ToList();
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
        public  Task VoteResult(int RoomId)
        {
            var data = _votePlayers[RoomId].ToList();
            var target = data[0];
            return Clients.Groups(RoomId.ToString()).SendAsync("VoteResult", target);
        }
    }
}
