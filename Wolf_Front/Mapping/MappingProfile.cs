using AutoMapper;
using Wolf_Front.Models;
using Wolf_Front.ViewModels;
using GameRoom = Wolf_Front.ViewModels.GameRoom;


namespace Wolf_Front.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GameRoom, Occupation>();
            CreateMap<Occupation, GameRoom>()
                .ForMember(d => d.IsGood, o => o.MapFrom(s => s.OccupationGb))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.About))
                .ForMember(d => d.OccupationId, o => o.MapFrom(s => s.OccupationId))
                .ForMember(d => d.ImgUrl, o => o.MapFrom(s => s.Pic))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.OccupationName));
        }
    }
}
