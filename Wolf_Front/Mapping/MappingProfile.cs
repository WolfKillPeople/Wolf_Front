using AutoMapper;
using Wolf_Front.Models;
using GameRoom = Wolf_Front.ViewModels.GameRoom;


namespace Wolf_Front.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GameRoom, Occupation>();
            CreateMap<Occupation, GameRoom>()
                .ForMember(d => d.IsGood, o => o.MapFrom(s => s.Occupation_GB))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.About))
                .ForMember(d => d.OccupationId, o => o.MapFrom(s => s.Occupation_ID))
                .ForMember(d => d.ImgUrl, o => o.MapFrom(s => s.Pic))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Occupation_Name))
                .ForMember(d=>d.IsAlive,o=>o.MapFrom(s=>true));
        }
    }
}
