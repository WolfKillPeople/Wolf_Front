using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wolf_Front.Interface;
using Wolf_Front.ViewModels;
namespace Wolf_Front.Hubs
{
    //[Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        private static ConcurrentDictionary<int, List<RoomInfo>> _Rooms = new ConcurrentDictionary<int, List<RoomInfo>>();

        private static ConcurrentDictionary<int, List<VotePlayers>> _votePlayers = new ConcurrentDictionary<int, List<VotePlayers>>();

        private static List<VotePlayers> _svotePlayer = new List<VotePlayers>();

        private static ConcurrentDictionary<int, List<GameRoom>> _GameRoom = new ConcurrentDictionary<int, List<GameRoom>>();

        private readonly IChatHubService _service;

        /// <summary>
        /// 下一間房間的roomID
        /// </summary>
        private static int _temp;

        /// <summary>
        /// 錯誤訊息
        /// </summary>
        private const string Exce = "Fail";

        public ChatHub(IChatHubService service, int temp = 0)
        {
            _service = service;
            _temp = temp;

            //預設滿房
            var userList = new List<GameRoom>()
            {
                new GameRoom() {RoomId = 1, Account = "wdqdw@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "judy870131@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "sadasd@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "test009@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "lovemark2413@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "asddsa@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "a1256963@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "a0912870178@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "99tjjh11535@gmail.com", IsAlive = true},
                new GameRoom() {RoomId = 1, Account = "TYRFTY@gmail.com", IsAlive = true},
            };
            _GameRoom.TryAdd(1, userList);
        }

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
            if (_Rooms.ContainsKey(roomId))
            {
                await Clients.Caller.Exception(Exce);
            }

            var accountTemp = new List<string>
            {
                account
            };

            var model = new List<RoomInfo>
            {
                new RoomInfo { RoomId = roomId, Count = accountTemp.Count, Account = accountTemp.ToArray() }
            };

            _Rooms.TryAdd(model[0].RoomId, model);
            _votePlayers.TryAdd(model[0].RoomId, new List<VotePlayers>());

            await Groups.AddToGroupAsync(base.Context.ConnectionId, model[0].RoomId.ToString());

            var RoomList = _Rooms.Values.SelectMany(o => o).ToList();
            if (RoomList.Count == 0)
            {
                _temp = 1;
            }

            for (int i = 0; i < RoomList.Count; i++)
            {
                if (RoomList[i].RoomId != i + 1)
                {
                    _temp = 0;
                    _temp = i + 1;
                    break;
                }
                else
                {
                    _temp = RoomList.Last().RoomId + 1;
                }
            }
            //將玩家加入到GameRoom
            var gameModel = new List<GameRoom>
            {
                new GameRoom() { RoomId = roomId, Account = account, IsAlive = true  }
            };
            _GameRoom.TryAdd(roomId, gameModel);
            //將roomId傳給每個玩家
            await Clients.All.NewRoom(model, _temp);
        }

        /// <summary>
        /// JoinRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="account"></param>
        /// <returns></returns>
        public async Task JoinRoom(int roomId, string account)
        {
            if (!_Rooms.ContainsKey(roomId))
            {
                await Clients.Caller.Exception(Exce);
            }
            foreach (var item in _Rooms.Values)
            {
                var _target = item.Find(x => x.RoomId == roomId);
                if (_target != null && _target.Count.Equals(10))
                {
                    await Clients.Caller.Exception(Exce);
                }
                else
                {
                    break;
                }
            }
            _Rooms.TryGetValue(roomId, out var target);
            var acc = target[0].Account;
            var tempList = acc.ToList();

            //assign old value and new value to new List
            tempList.Add(account);

            var newRoomValue = (from t in target
                                select new RoomInfo
                                {
                                    RoomId = roomId,
                                    Account = tempList.ToArray(),
                                    Count = tempList.Count,
                                }).ToList();
            _Rooms.TryUpdate(roomId, newRoomValue, target);

            //value assign to gameroom

            _GameRoom.TryGetValue(roomId, out var newgameRooms);
            if (newgameRooms != null)
            {
                newgameRooms.Add(new GameRoom { RoomId = roomId, Account = account, IsAlive = true });
                _GameRoom.TryRemove(roomId, out _);
                _GameRoom.TryAdd(roomId, newgameRooms);
            }

            //將這個玩家加到指定的room
            await Groups.AddToGroupAsync(base.Context.ConnectionId, roomId.ToString());

            //將房間資訊給大家
            await Clients.All.GetAll(_Rooms.Values.SelectMany(x => x).ToList());

            //只在這個房間傳送訊息
            await Clients.Groups(roomId.ToString()).JoinRoom(account);
        }
        /// <summary>
        /// OutToRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="Account"></param>
        /// <returns></returns>
        public async Task OutToRoom(int roomId, string Account)
        {
            if (!_Rooms.ContainsKey(roomId))
            {
                await Clients.Caller.Exception(Exce);
            }

            foreach (var item in _Rooms.Values)
            {
                var _target = item.Find(x => x.RoomId == roomId);
                if (_target != null && _target.Count.Equals(10))
                {
                    await Clients.Caller.Exception(Exce);
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
            
            acc.ToList().ForEach(o => tempList.Add(o));

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
            newgameRooms.Remove(new GameRoom { RoomId = roomId, Account = Account, IsAlive = true });
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, newgameRooms);

            //將這個玩家從指定的room移除
            await Groups.RemoveFromGroupAsync(base.Context.ConnectionId, roomId.ToString());

            //只在這個房間傳送訊息
            await Clients.Groups(roomId.ToString()).OutToRoom(Account);

            if(newRoomValue.Any(x => x.RoomId == roomId && x.Count == 0))
            {
                await RemoveRoom(roomId);
            }
            //將房間資訊給大家
            await Clients.All.GetAll(_Rooms.Values.SelectMany(x => x).ToList());
            //if()
        }
        /// <summary>
        /// GetAllRoom
        /// </summary>
        /// <returns></returns>
        public async Task GetAllRoom()
        {
            //var data = _Rooms.Values.SelectMany(x => x).ToList();
            var data = _Rooms.SelectMany(x => x.Value).ToList();

            if (data.Count == 0)
            {
                _temp = 1;
            }
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
            await Clients.All.GetAllRoomInfo(data, _temp);
        }

        /// <summary>
        /// RemoveRoom
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task RemoveRoom(int roomId)
        {
            var roomisClose = "This room is closed";
            await Clients.Groups(roomId.ToString()).GroupRemoveRoom(roomisClose);
            _Rooms.TryRemove(roomId, out _);
            _GameRoom.TryRemove(roomId, out _);
            IEnumerable<RoomInfo> target;

            if (_Rooms.IsEmpty == true)
            {
                _temp = 1;
                target = null;
                await Clients.All.AllRemoveRoom(target, _temp);
            }

            target = _Rooms.Values.SelectMany(x => x);

            for (var i = 0; i < target.ToList().Count; i++)
            {
                if (_Rooms.Keys.ToList()[i] != i + 1)
                {
                    _temp = i + 1;
                    break;
                }
            }

            await Clients.All.AllRemoveRoom(target, _temp);
        }
        /// <summary>
        /// Vote
        /// </summary>
        /// <param name="data"></param>
        public void Vote(IEnumerable<VotePlayers> data)
        {

            _votePlayers.TryAdd(data.ToList()[0].RoomID, new List<VotePlayers>());
            var roomKey = _votePlayers[data.ToList()[0].RoomID];

            _svotePlayer.ForEach(x => x.VoteTickets = 0);

            if (_svotePlayer.Exists(x => data.ToList()[0].User == x.User) == false)
            {
                _svotePlayer.AddRange(data);
            }
            else
            {
                var index = _svotePlayer.IndexOf(data.ToList()[0]);
                _svotePlayer.InsertRange(index, data);
            }

            for (int i = 0; i < _svotePlayer.Count; i++)
            {
                for (int o = 0; o < _svotePlayer.Count; o++)
                {
                    if (_svotePlayer[i].Vote == _svotePlayer[o].Vote)
                    {
                        _svotePlayer[i].VoteTickets++;
                    }
                }
            }
            var ran = new Random();
            var newVotePlayers = _svotePlayer.OrderByDescending(x => x.VoteTickets).ToList();

            for (var i = 0; i < newVotePlayers.Count; i++)
            {
                for (var o = 0; o < newVotePlayers.Count; o++)
                {
                    if (newVotePlayers[i].VoteTickets == newVotePlayers[o].VoteTickets)
                    {
                        for (var r = 0; r < newVotePlayers.Count; r++)
                        {
                            var index = ran.Next(0, newVotePlayers.Count - 1);
                            if (index != r)
                            {
                                dynamic temp = newVotePlayers[r];
                                newVotePlayers[r] = newVotePlayers[index];
                                newVotePlayers[index] = temp;
                            }
                        };

                        newVotePlayers.ForEach(x => { x.voteResult = x.Vote; x.User = null; });
                        roomKey.AddRange(newVotePlayers.Take(1));
                        break;
                    }
                }
            }
        }

        /// <summary>
        /// VoteResult
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task VoteResult(int roomId)
        {
            var data = _votePlayers[roomId].ToList();
            _svotePlayer.Clear();
            _votePlayers.TryRemove(data.ToList()[0].RoomID, out _);
            //await Clients.Groups(roomId.ToString()).VoteResult(data);
            await Clients.All.VoteResult(data);
        }
        /// <summary>
        /// PeopleDie
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task PeopleDie(IEnumerable<GameRoom> data)
        {
            _GameRoom.TryGetValue(data.ToList()[0].RoomId, out var result);

            var newResult = new List<GameRoom>();
            newResult = result;
            var target = new GameRoom();
            target = newResult.Find(o => data.ToList()[0].Account == o.Account);
            target.IsAlive = false;
            
            if (data.Count() == 2)
            {
                var target2 = newResult.Find(o => data.ToList()[1].Account == o.Account);
                target2.IsAlive = false;
            }

            _GameRoom.TryUpdate(data.ToList()[0].RoomId, newResult, result);

            //await Clients.Group(data.ToList()[0].RoomId.ToString()).PeopleDie(data.ToList()[0].Account);
            await Clients.All.PeopleDie(data.ToList()[0].Account);
        }

        /// <summary>
        /// PeopleResurrection
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task PeopleResurrection(IEnumerable<GameRoom> data)
        {
            _GameRoom.TryGetValue(data.ToList()[0].RoomId, out List<GameRoom> result);

            var rrr = _GameRoom.Values.FirstOrDefault(x =>
            {
                var t = x.FirstOrDefault(p => p.RoomId == data.ToList()[0].RoomId && p.Account == data.ToList()[0].Account);
                if (t != null)
                {
                    t.IsAlive = true;
                    return true;
                }
                return false;
            });
            _GameRoom.AddOrUpdate(rrr.ToList()[0].RoomId, new List<GameRoom>(), (k, v) => rrr);
            //await Clients.Group(data.ToList()[0].RoomId.ToString()).PeopleResurrection(data.ToList()[0].Account);
            await Clients.All.PeopleResurrection(data.ToList()[0].Account);
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

        /// <summary>
        /// 遊戲開始時分配玩家職業
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task GetRole(int roomId)
        {
            _GameRoom.TryGetValue(roomId, out var userList);
            var result = _service.GetRole(userList);
            _GameRoom.TryRemove(roomId, out _);
            _GameRoom.TryAdd(roomId, result);
            //await Clients.Group(roomId.ToString()).GetRole(result);
            await Clients.All.GetRole(result);
        }
    }
}