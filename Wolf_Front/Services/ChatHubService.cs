using System;
using System.Collections.Generic;
using Wolf_Front.Interface;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Services
{
    public class ChatHubService : IChatHubService
    {
        private readonly IChatRepo _repo;
        private int _o;
        public ChatHubService(IChatRepo repo, int o = 0)
        {
            _repo = repo;
            _o = o;
        }

        public string GetPlayerPic(string account)
        {
            return _repo.GetPlayerPic(account);
        }

        public List<GameRoom> GetRole(List<GameRoom> data, string connectionId)
        {
            var _list = _repo.GetRoles();
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
                d.Name = _list[_o].Name;
                d.OccupationId = _list[_o].OccupationId;
                d.ImgUrl = _list[_o].ImgUrl;
                d.IsGood = _list[_o].IsGood;
                d.Description = _list[_o].Description;
                _o++;
            }

            var t = data.Find(x => x.ConnectionId == connectionId);
            result.Add(t);
            return result;
        }
    }
}
