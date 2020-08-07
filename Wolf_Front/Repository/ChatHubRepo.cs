using AutoMapper;
using System.Collections.Generic;
using Wolf_Front.Data;
using Wolf_Front.Interface;
using Wolf_Front.Models;
using GameRoom = Wolf_Front.ViewModels.GameRoom;


namespace Wolf_Front.Repository
{
    public class ChatHubRepo : IChatRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ChatHubRepo(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public string GetPlayerPic(string account)
        {
            var total = _context.AspNetUsers.Where(x => account == x.UserName).ToList();
            return total[0].Pic;
        }

        public List<GameRoom> GetRoles()
        {
            var _list = _context.Occupation.Take(10).ToList();
            var result = _mapper.Map<List<Occupation>, List<GameRoom>>(_list);
            return result;
        }

    }
}
