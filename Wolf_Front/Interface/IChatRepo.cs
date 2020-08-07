using System.Collections.Generic;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Interface
{
    public interface IChatRepo
    {
        public string GetPlayerPic(string account);
        public List<GameRoom> GetRoles();

    }
}
