using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.Enums;
using ModHub.Models;

namespace ModHub.Handlers;

public class CommentsHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CommentsHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<CommentDtoGet> AddComment(CommentDtoPost commentDtoPost, int modId, int userId)
    {
        var comment = _mapper.Map<CommentDtoPost, Comment>(commentDtoPost);
        comment.ModId = modId;
        comment.UserId = userId;
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
    
    public async Task<CommentDtoGet> UpdateComment(int id, CommentDtoPut commentDtoPut)
    {
        var comment = await _context.Comments.FirstAsync( x=> x.Id == id);
        _context.Entry(comment).State = EntityState.Modified;

        _mapper.Map(commentDtoPut, comment);

        await _context.SaveChangesAsync();
        
        var commentToReturn = _mapper.Map<Comment, CommentDtoGet>(comment);
        return commentToReturn;
    }

    public async Task DeleteComment(int id)
    {
        var comment = await _context.Comments.FirstAsync( x=> x.Id == id);
        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
    }

    public bool CommentExists(int id, int gameId, int modId)
    {
        var comment = _context.Comments.FirstOrDefault(x => x.Id == id);
        if (comment == null)
        {
            return false;
        }

        if (comment.ModId != modId)
        {
            return false;
        }
        
        var mod = _context.Mods.FirstOrDefault(x => x.Id == modId && x.ModStatus != ModStatus.Deleted);
        if (mod == null) return false;
        if (mod.ModStatus == ModStatus.Deleted) return false;
        if (mod.GameId != gameId) return false;
        return true;
    }
    
    public bool CommentBelongsToUserOrUserIsAdmin(int commentId, int userId)
    {
        var isAdmin = _context.Users.First(x => x.Id == userId).Role == Role.Admin;
        var belongsToUser = _context.Comments.First(x => x.Id == commentId).UserId == userId;

        return isAdmin || belongsToUser;
    }
}