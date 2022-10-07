﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.Enums;
using ModHub.Models;

namespace ModHub.Handlers;

public class ModsHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public ModsHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<ModDtoGet> AddMod(ModDto modDto, int gameId)
    {
        var mod = _mapper.Map<ModDto, Mod>(modDto);
        mod.GameId = gameId;
        //TODO: replace with authenticated user
        mod.UserId = _context.Users.First().Id;
        await _context.Mods.AddAsync(mod);
        await _context.SaveChangesAsync();
        var modToReturn = _mapper.Map<Mod, ModDtoGet>(mod);
        return modToReturn;
    }
    
    public async Task<ModDtoGet> GetMod(int id)
    {
        var mod = await _context.Mods
            .Include(x=> x.User)
            .Include(x => x.Game)
            .FirstAsync(x => x.Id == id);
        
        mod.Rating = _context.ModRatings.Any(rating => rating.ModId == mod.Id)
            ? _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating)
            : 0;
        
        var modDto = _mapper.Map<Mod, ModDtoGet>(mod);
        return modDto;
    }
    
    public async Task<IEnumerable<ModDtoGet>> GetAllMods()
    {
        var mods = await _context.Mods.Where(x => x.ModStatus != ModStatus.Deleted)
            .Include(x=> x.User)
            .ToListAsync();
        
        foreach (var mod in mods)
        {
            mod.Rating = _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating);
        }
        
        var modsDto = _mapper.Map<IEnumerable<Mod>, IEnumerable<ModDtoGet>>(mods);
        return modsDto;
    }
    
    public async Task<IEnumerable<ModDtoGet>> GetModsByGameId(int id)
    {
        var mods = await _context.Mods
            .Include(x=> x.Game)
            .Where(x => x.ModStatus != ModStatus.Deleted && x.GameId == id)
            .ToListAsync();

        foreach (var mod in mods)
        {
            mod.Rating = _context.ModRatings.Any(rating => rating.ModId == mod.Id)
                ? _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating)
                : 0;
        }
        
        var modsDto = _mapper.Map<IEnumerable<Mod>, IEnumerable<ModDtoGet>>(mods);
        return modsDto;
    }
    
    public async Task<ModDtoGet> UpdateMod(int id, ModDtoPut modDto)
    {
        var mod = await _context.Mods.FirstAsync( x=> x.Id == id);
        _context.Entry(mod).State = EntityState.Modified;

        _mapper.Map(modDto, mod);

        await _context.SaveChangesAsync();
        
        var modToReturn = _mapper.Map<Mod, ModDtoGet>(mod);
        return modToReturn;
    }

    public async Task SoftDeleteMod(int id)
    {
        var mod = await _context.Mods.FirstAsync( x=> x.Id == id);
        _context.Entry(mod).State = EntityState.Modified;
        mod.ModStatus = ModStatus.Deleted;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteMod(int id)
    {
        var mod = await _context.Mods.FirstAsync( x=> x.Id == id);
        _context.Mods.Remove(mod);
        await _context.SaveChangesAsync();
    }

    public bool ModExists(int modId, int gameId)
    {
        return _context.Mods.Any(x => x.Id == modId && x.ModStatus != ModStatus.Deleted);
    }

    public bool ModExistsInGame(int id, int gameId)
    {
        var mod = _context.Mods.FirstOrDefault(x => x.Id == id);
        if (mod == null) return false;
        if (mod.GameId != gameId) return false;
        return true;

    }
}