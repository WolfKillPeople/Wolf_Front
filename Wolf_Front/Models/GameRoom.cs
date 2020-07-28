using System;
using System.Collections.Generic;

namespace Wolf_Front.Models
{
    public partial class GameRoom
    {
        public int RoomId { get; set; }
        public string Players { get; set; }
        public int? OccupationId { get; set; }
        public string IsAlive { get; set; }
        public int Id { get; set; }
    }
}
