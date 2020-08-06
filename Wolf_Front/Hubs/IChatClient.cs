using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wolf_Front.ViewModels;

namespace Wolf_Front.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string message);

        Task NewRoom(List<RoomInfo> model,int temp);

        Task GetAll(IEnumerable<RoomInfo> allInfo);

        Task JoinRoom(string Account);

        Task GetAllRoomInfo(List<RoomInfo> data,int temp);

        Task GroupRemoveRoom(string roomisClose);

        Task AllRemoveRoom(IEnumerable<RoomInfo> newList ,int temp);

        Task VoteResult(List<VotePlayers> data);

        Task PeopleDie(string Account);
    }
}
