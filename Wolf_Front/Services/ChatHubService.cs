using System;
using System.Collections.Generic;
using System.Linq;
using Wolf_Front.Interface;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Services
{
    public class ChatHubService : IChatHubService
    {
        private readonly IChatRepo _repo;

        public ChatHubService(IChatRepo repo)
        {
            _repo = repo;
        }

        public string GetPlayerPic(string account)
        {
            return _repo.GetPlayerPic(account);
        }

        public List<GameRoom> GetRole(List<GameRoom> data, string connectionId)
        {
            int o = 0;
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
            return result;
        }
    }
}
