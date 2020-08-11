using System.Collections.Generic;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Interface
{
    public interface IChatRepo
    {
        public List<GameRoom> GetPlayerPic(List<GameRoom> data);
        public List<GameRoom> GetRoles();
    }
}
