using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.Models;

namespace ModHub.Handlers;

public class RatingHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public RatingHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<RatingDtoGet> AddRating(RatingDto ratingDto)
    {
        var rating = _mapper.Map<RatingDto, ModRating>(ratingDto);
        await _context.ModRatings.AddAsync(rating);
        await _context.SaveChangesAsync();
        var ratingToReturn = _mapper.Map<ModRating, RatingDtoGet>(rating);
        return ratingToReturn;
    }
    
    public async Task<RatingDtoGet> GetRating(int id)
    {
        var rating = await _context.ModRatings.FirstAsync(x => x.Id == id);
        var ratingDto = _mapper.Map<ModRating, RatingDtoGet>(rating);
        return ratingDto;
    }
    
    public async Task<IEnumerable<RatingDtoGet>> GetRatingsByModId(int id)
    {
        var ratings = await _context.ModRatings.Where(x => x.ModId == id).ToListAsync();
        var ratingsDto = _mapper.Map<IEnumerable<ModRating>, IEnumerable<RatingDtoGet>>(ratings);
        return ratingsDto;
    }
    
    public async Task UpdateRating(int id, RatingDto ratingDto)
    {
        var rating = await _context.ModRatings.FirstAsync( x=> x.Id == id);
        _context.Entry(rating).State = EntityState.Modified;

        _mapper.Map(ratingDto, rating);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteRating(int id)
    {
        var rating = await _context.ModRatings.FirstAsync( x=> x.Id == id);
        _context.ModRatings.Remove(rating);
        await _context.SaveChangesAsync();
    }

    public bool RatingExists(int id)
    {
        return _context.ModRatings.Any(x => x.Id == id);
    }
}