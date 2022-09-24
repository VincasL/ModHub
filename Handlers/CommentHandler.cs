using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.Models;

namespace ModHub.Handlers;

public class CommentHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CommentHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<CommentDtoGet> AddComment(CommentDtoPost commentDtoPost)
    {
        var comment = _mapper.Map<CommentDtoPost, Comment>(commentDtoPost);
        //TODO: replace with authenticated user id
        comment.UserId = _context.Users.First().Id;
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();
        var commentToReturn = _mapper.Map<Comment, CommentDtoGet>(comment);
        return commentToReturn;
    }
    
    public async Task<CommentDtoGet> GetComment(int id)
    {
        var comment = await _context.Comments.FirstAsync(x => x.Id == id);
        var commentDto = _mapper.Map<Comment, CommentDtoGet>(comment);
        return commentDto;
    }

    public async Task<IEnumerable<CommentDtoGet>> GetAllComments()
    {
        var comments = await _context.Comments.ToListAsync();
        var commentsDto = _mapper.Map<IEnumerable<Comment>, IEnumerable<CommentDtoGet>>(comments);
        return commentsDto;
    }

    public async Task<IEnumerable<CommentDtoGet>> GetCommentsByModId(int id)
    {
        var comments = await _context.Comments.Where(x => x.ModId == id).ToListAsync();
        var commentsDto = _mapper.Map<IEnumerable<Comment>, IEnumerable<CommentDtoGet>>(comments);
        return commentsDto;
    }
    
    public async Task UpdateComment(int id, CommentDtoPut commentDtoPut)
    {
        var comment = await _context.Comments.FirstAsync( x=> x.Id == id);
        _context.Entry(comment).State = EntityState.Modified;

        _mapper.Map(commentDtoPut, comment);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteComment(int id)
    {
        var comment = await _context.Comments.FirstAsync( x=> x.Id == id);
        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
    }

    public bool CommentExists(int id)
    {
        return _context.Comments.Any(x => x.Id == id);
    }


}