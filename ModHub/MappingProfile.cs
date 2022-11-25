using AutoMapper;
using ModHub.DTO;
using ModHub.DTO.Auth;
using ModHub.DTO.Game;
using ModHub.DTO.Mod;
using ModHub.DTO.User;
using ModHub.Models;

namespace ModHub;

public class MappingProfile : Profile {
    public MappingProfile() {
        // Add as many of these lines as you need to map your objects
        CreateMap<Mod, ModDtoGet>();
        CreateMap<ModDtoGet, Mod>();
        CreateMap<ModDto, Mod>();
        CreateMap<ModDtoPut, Mod>();

        
        CreateMap<Game, GameDtoGet>();
        CreateMap<GameDtoGet, Game>();
        CreateMap<GameDto, Game>();
        
        CreateMap<User, UserDtoGet>();
        CreateMap<UserDtoGet, User>();
        CreateMap<UserDtoPut, User>();
        CreateMap<UserRegisterDto, User>();
        
        CreateMap<Comment, CommentDtoGet>();
        CreateMap<CommentDtoGet, Comment>();
        CreateMap<CommentDtoPost, Comment>();
        CreateMap<CommentDtoPut, Comment>();
    }
}