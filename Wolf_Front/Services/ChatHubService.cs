using System;
using System.Collections.Generic;
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

        public List<GameRoom> GetRole(List<GameRoom> data)
        {
            int _o = 0;
            var _list = _repo.GetRoles();
            var GetPicList = _repo.GetPlayerPic(data);

            //var random = new Random();
            //for (var i = 0; i < _list.Count; i++)
            //{
            //    var index = random.Next(0, _list.Count - 1);
            //    if (index != i)
            //    {
            //        var temp = _list[i];
            //        _list[i] = _list[index];
            //        _list[index] = temp;
            //    }
            //};

            foreach (var d in GetPicList)
            {
                d.Name = _list[_o].Name;
                d.OccupationId = _list[_o].OccupationId;
                d.ImgUrl = _list[_o].ImgUrl;
                d.IsGood = _list[_o].IsGood;
                d.Description = _list[_o].Description;
                d.Vote = (_o + 1).ToString();
                _o++;
                //測
                //d.IsAlive = true;
                //d.RoomId = d.RoomId;
            }

            return GetPicList;
        }
    }
}
