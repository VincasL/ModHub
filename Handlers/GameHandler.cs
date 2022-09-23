using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.Enums;
using ModHub.Models;

namespace ModHub.Handlers;

public class GameHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GameHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<GameDtoGet> AddGame(GameDto gameDto)
    {
        var game = _mapper.Map<GameDto, Game>(gameDto);
        await _context.Games.AddAsync(game);
        await _context.SaveChangesAsync();
        var gameToReturn = _mapper.Map<Game, GameDtoGet>(game);
        return gameToReturn;
    }
    
    public async Task<GameDtoGet> GetGame(int id)
    {
        var game = await _context.Games.FirstAsync(x => x.Id == id);
        var gameDto = _mapper.Map<Game, GameDtoGet>(game);
        return gameDto;
    }
    
    public async Task UpdateGame(int id, GameDto gameDto)
    {
        var game = await _context.Games.FirstAsync( x=> x.Id == id);
        _context.Entry(game).State = EntityState.Modified;

        _mapper.Map(gameDto, game);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteGame(int id)
    {
        var game = await _context.Games.FirstAsync( x=> x.Id == id);
        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
    }

    public bool GameExists(int id)
    {
        return _context.Games.Any(x => x.Id == id);
    }
}