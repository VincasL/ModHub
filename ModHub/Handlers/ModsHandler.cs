using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.DTO.Mod;
using ModHub.Enums;
using ModHub.Models;

namespace ModHub.Handlers;

public class ModsHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ImagesHandler _imagesHandler;
    
    public ModsHandler(ApplicationDbContext context, IMapper mapper, ImagesHandler imagesHandler)
    {
        _context = context;
        _mapper = mapper;
        _imagesHandler = imagesHandler;
    }



    public async Task<ModDtoGet> AddMod(ModDto modDto, int gameId, int userId)
    {
        var mod = _mapper.Map<ModDto, Mod>(modDto);
        mod.GameId = gameId;
        mod.UserId = userId;
        await _context.Mods.AddAsync(mod);
        await _context.SaveChangesAsync();
        var modToReturn = _mapper.Map<Mod, ModDtoGet>(mod);
        return modToReturn;
    }
    
    public async Task<ModDtoGet> GetMod(int id, int? userId)
    {
        var mod = await _context.Mods
            .Include(x=> x.CreatedBy)
            .Include(x => x.Game)
            .FirstAsync(x => x.Id == id);
        
        mod.Rating = _context.ModRatings.Any(rating => rating.ModId == mod.Id)
            ? _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating)
            : 0;

        mod.CurrentUserRating = userId != null?
            _context.ModRatings.FirstOrDefault(rating => rating.ModId == mod.Id && rating.UserId == userId)?.Rating : null;

        mod.TotalRatings = _context.ModRatings.Count(rating => rating.ModId == mod.Id);
        
        var modDto = _mapper.Map<Mod, ModDtoGet>(mod);
        return modDto;
    }
    
    public async Task<IEnumerable<ModDtoGet>> GetAllMods()
    {
        var mods = await _context.Mods.Where(x => x.ModStatus != ModStatus.Deleted)
            .Include(x=> x.CreatedBy)
            .ToListAsync();
        
        foreach (var mod in mods)
        {
            mod.Rating = _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating);
        }
        
        var modsDto = _mapper.Map<IEnumerable<Mod>, IEnumerable<ModDtoGet>>(mods);
        return modsDto;
    }
    

    
    public async Task<IEnumerable<ModDtoGet>> GetModsByGameId(int id, int? userId)
    {
        var mods = await _context.Mods
            .Include(x=> x.Game)
            .Include(x => x.CreatedBy)
            .Where(x => x.ModStatus == ModStatus.Approved && x.GameId == id)
            .ToListAsync();

        foreach (var mod in mods)
        {
            mod.Rating = _context.ModRatings.Any(rating => rating.ModId == mod.Id)
                ? _context.ModRatings.Where(rating => rating.ModId == mod.Id).Average(r => r.Rating)
                : 0;

            mod.CurrentUserRating =
                _context.ModRatings.FirstOrDefault(rating => rating.ModId == mod.Id && rating.UserId == userId)?.Rating;

            mod.TotalRatings = _context.ModRatings.Count(rating => rating.ModId == mod.Id);
        }
        
        var modsDto = _mapper.Map<IEnumerable<Mod>, IEnumerable<ModDtoGet>>(mods);
        return modsDto;
    }
    
    public async Task<object?> GetModsByUserId(int userId)
    {
        var mods = await _context.Mods
            .Include(x=> x.Game)
            .Include(x => x.CreatedBy)
            .Where(x => x.ModStatus != ModStatus.Deleted && x.CreatedBy.Id == userId)
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
        return _context.Mods.Any(x => x.Id == modId && x.ModStatus != ModStatus.Deleted && x.GameId == gameId);
    }
    
    public bool ModExists(int modId)
    {
        return _context.Mods.Any(x => x.Id == modId && x.ModStatus != ModStatus.Deleted);
    }
    
    public bool ModBelongsToUserOrUserIsAdmin(int modId, int userId)
    {
        var user = _context.Users.First(x => x.Id == userId);
        var isAdmin = user.Role is Role.Admin or Role.Moderator;
        var belongsToUser = _context.Mods.First(x => x.Id == modId).UserId == userId;

        return isAdmin || belongsToUser;
    }

    public async Task<ModDtoGet> ChangeModStatus(int id, ModChangeStatusDto modChangeStatusDto)
    {
        var mod = await _context.Mods.FirstAsync( x=> x.Id == id);
        _context.Entry(mod).State = EntityState.Modified;

        mod.ModStatus = modChangeStatusDto.ModStatus;

        await _context.SaveChangesAsync();
        
        var modToReturn = _mapper.Map<Mod, ModDtoGet>(mod);
        return modToReturn;
    }


    public async Task<object?> GetWaitingForApprovalMods()
    {
        var mods = await _context.Mods
            .Include(x=> x.Game)
            .Include(x => x.CreatedBy)
            .Where(x => x.ModStatus == ModStatus.WaitingForApproval)
            .ToListAsync();

        var modsDto = _mapper.Map<IEnumerable<Mod>, IEnumerable<ModDtoGet>>(mods);
        return modsDto;
    }

    public async Task ChangeModRating(int modId, int userId, int rating)
    {
        var ratingModel = await _context.ModRatings.FirstOrDefaultAsync( x => x.ModId == modId && x.UserId == userId);
        if (ratingModel == null)
        {
            var newRating = new ModRating
            {
                UserId = userId,
                ModId = modId,
                Rating = rating
            };
            await _context.ModRatings.AddAsync(newRating);
        }
        else
        {
            _context.Entry(ratingModel).State = EntityState.Modified;
            ratingModel.Rating = rating;
        }

        await _context.SaveChangesAsync();
    }

    public async Task<ModDtoGet> DownloadMod(int modId)
    {
        var mod = await _context.Mods.FirstAsync( x=> x.Id == modId);
        _context.Entry(mod).State = EntityState.Modified;

        mod.TotalDownloads++;

        await _context.SaveChangesAsync();
        
        var modToReturn = _mapper.Map<Mod, ModDtoGet>(mod);
        return modToReturn;
    }
}