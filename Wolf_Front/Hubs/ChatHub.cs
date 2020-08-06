using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Hubs
{
    //[Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        static ConcurrentDictionary<int, List<RoomInfo>> _Rooms = new ConcurrentDictionary<int, List<RoomInfo>>();

        static ConcurrentDictionary<int, List<VotePlayers>> _votePlayers = new ConcurrentDictionary<int, List<VotePlayers>>();

        static List<VotePlayers> votePlayers = new List<VotePlayers>();

        static ConcurrentDictionary<int, List<GameRoom>> _GameRoom = new ConcurrentDictionary<int, List<GameRoom>>();

        private static int temp = 0;

        /// <summary>
        /// SendMessage
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task SendMessage(string user, string message, int roomId)
        {
            await Clients.Group(roomId.ToString()).ReceiveMessage(user, message);
        }

        /// <summary>
        /// CreateRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task CreateRoom(int roomId, string account)
        {
            if (_Rooms.ContainsKey(roomId) == true)
            {
                return Task.FromResult(new ResponseBase<string>() { Success = false, Message = "房間已存在" });
            }

            List<string> accountTemp = new List<string>();
            accountTemp.Add(account);

            var model = new List<RoomInfo>();

            model.Add(new RoomInfo { RoomId = roomId, Count = accountTemp.Count, Account = accountTemp.ToArray() });
            _Rooms.TryAdd(model[0].RoomId, model);
            _votePlayers.TryAdd(model[0].RoomId, new List<VotePlayers>());

            Groups.AddToGroupAsync(base.Context.ConnectionId, model[0].RoomId.ToString());

            var RoomList = _Rooms.Values.SelectMany(o => o).ToList();
            //int TempNextRoom = 0;
            if (RoomList.Count == 0)
            {
                temp = 1;
            }


            for (int i = 0; i < RoomList.Count; i++)
            {
                if (RoomList[i].RoomId != i + 1)
                {
                    temp = 0;
                    temp = i + 1;
                    break;
                }
                else
                {
                    temp = RoomList.Last().RoomId + 1;
                }

            }

            //將玩家加入到GameRoom
            var gameModel = new List<GameRoom>();
            gameModel.Add(new GameRoom() { RoomId = roomId, Account = account, isAlive = true });
            _GameRoom.TryAdd(roomId, gameModel);

            //將roomId傳給每個玩家
            await Clients.All.NewRoom(model, temp);

            //return Task.FromResult(new ResponseBase<string>() { Success = true, Data = model[0].RoomId.ToString(), Count = accountTemp.Count, TempNextRoom = temp, Message = "創建房間成功" });
        }


        /// <summary>
        /// JoinRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="Account"></param>
        /// <returns></returns>
        public async Task/*<ResponseBase<List<RoomInfo>>>*/ JoinRoom(int roomId, string Account)
        {
            if (!_Rooms.ContainsKey(roomId))
            {
                return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = false });
            }

            foreach (var item in _Rooms.Values)
            {
                var _target = item.Find(x => x.RoomId == roomId);
                if (_target != null && _target.Count.Equals(10))
                {
                    return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = false });
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
            tempList.Add(Account);

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
            newgameRooms.Add(new GameRoom { RoomId = roomId, Account = Account, isAlive = true });
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, newgameRooms);

            //將這個玩家加到指定的room
            Groups.AddToGroupAsync(base.Context.ConnectionId, roomId.ToString());

            //將房間資訊給大家
            //var allInfo = _Rooms.Values.SelectMany(x => x);
            Clients.All.GetAll(newRoomValue);

            //只在這個房間傳送訊息
            await Clients.Groups(roomId.ToString()).JoinRoom(Account);

            //return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = true, Data = newRoomValue });
        }


        /// <summary>
        /// OutToRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="count"></param>
        /// <param name="Account"></param>
        /// <returns></returns>
        public Task<ResponseBase<List<RoomInfo>>> OutToRoom(int roomId, string Account)
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
            tempList.Remove(Account);

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
            var a = newgameRooms.FirstOrDefault(x => x.Account == Account);
            newgameRooms.Remove(a);
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, newgameRooms);

            //將這個玩家加到指定的room
            Groups.RemoveFromGroupAsync(base.Context.ConnectionId, roomId.ToString());

            //只在這個房間傳送訊息
            Clients.Groups(roomId.ToString()).SendAsync("aa",Account + "離開");

            return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = true, Data = newRoomValue });
        }



        /// <summary>
        /// GetAllRoom
        /// </summary>
        /// <returns></returns>
        public async Task/*<ResponseBase<List<RoomInfo>>>*/ GetAllRoom()
        {
            var data = _Rooms.Values.SelectMany(x => x).ToList();


            if (data.Count == 0)
            {
                temp = 1;
            }

            for (int i = 0; i < data.Count; i++)
            {
                if (data[i].RoomId != i + 1)
                {
                    temp = 0;
                    temp = i + 1;
                    break;
                }
                else
                {
                    temp = data.LastOrDefault().RoomId + 1;
                }
            }

            await Clients.All.GetAllRoomInfo(data, temp);

            //return Task.FromResult(new ResponseBase<List<RoomInfo>>() { Success = true, Data = data, TempNextRoom = temp });
        }


        /// <summary>
        /// RemoveRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task/*<ResponseBase<int>>*/ RemoveRoom(int roomId)
        {
            string roomisClose = "This room is closed";
            Clients.Groups(roomId.ToString()).GroupRemoveRoom(roomisClose);
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


            await Clients.All.AllRemoveRoom(target, temp);
            //return Task.FromResult(new ResponseBase<int>() { Success = true, TempNextRoom = temp });
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

            _votePlayers.TryAdd(data.ToList()[0].RoomID, new List<VotePlayers>());
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

        }


        /// <summary>
        /// VoteResult
        /// </summary>
        /// <param name="RoomId"></param>
        /// <returns></returns>
        public Task<ResponseBase<List<VotePlayers>>> VoteResult(int RoomId)
        {
            var data = _votePlayers[RoomId].ToList();
            votePlayers.Clear();
            Clients.Groups(RoomId.ToString()).VoteResult(data);
            return Task.FromResult(new ResponseBase<List<VotePlayers>>() { Success = true, Data = data });
        }

        /// <summary>
        /// PeopleDie
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Task<List<GameRoom>> PeopleDie(IEnumerable<GameRoom> data)
        {
            _GameRoom.TryGetValue(data.ToList()[0].RoomId, out List<GameRoom> result);

            List<GameRoom> newResult = new List<GameRoom>();
            newResult = result;
            var target = newResult.Find(x => x.RoomId == data.ToList()[0].RoomId && x.Account == data.ToList()[0].Account);
            target.isAlive = false;

            _GameRoom.TryUpdate(data.ToList()[0].RoomId, newResult, result);

            Clients.Group(data.ToList()[0].RoomId.ToString()).PeopleDie(data.ToList()[0].Account);

            return Task.FromResult(newResult);
        }





        /// <summary>
        /// PeopleResurrection
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public Task<List<GameRoom>> PeopleResurrection(IEnumerable<GameRoom> data)
        {
            _GameRoom.TryGetValue(data.ToList()[0].RoomId, out List<GameRoom> result);
          
            var rrr = _GameRoom.Values.FirstOrDefault(x => 
            {
                var t = x.FirstOrDefault(p => p.RoomId == data.ToList()[0].RoomId && p.Account == data.ToList()[0].Account);
                if(t != null)
                {
                    t.isAlive = true;
                    return true;
                }
                return false;
            });
            _GameRoom.AddOrUpdate(rrr.ToList()[0].RoomId, new List<GameRoom>() ,(k ,v) => rrr);
            return Task.FromResult(rrr);
        }




        /// <summary>
        /// 連線時自動加入玩家ID
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectionIds.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// 離現時自動減少該玩家ID
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectionIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }



    }
}
