using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("Games/{gameId}/Mods/{modId}/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly CommentsHandler _commentsHandler;
    private readonly ModsHandler _modsHandler;
    private readonly GamesHandler _gamesHandler;
    
    public CommentsController(CommentsHandler commentsHandler, GamesHandler gamesHandler, ModsHandler modsHandler)
    {
        _commentsHandler = commentsHandler;
        _gamesHandler = gamesHandler;
        _modsHandler = modsHandler;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CommentDtoGet>> GetComment(int id, int gameId, int modId)
    {
        if (!_commentsHandler.CommentExists(id, gameId, modId))
        {
            return NotFound();
        }

        var result = await _commentsHandler.GetComment(id);

        return result;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CommentDtoGet>))]
    public async Task<ActionResult<CommentDtoGet>> GetAllComments(int gameId, int modId)
    {
        if(!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }

        var result = await _commentsHandler.GetCommentsByModId(modId);

        return Ok(result);
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CommentDtoGet>> PostComment([FromBody] CommentDtoPost commentDtoPost, int gameId, int modId)
    {
        if(!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }
        
        var result = await _commentsHandler.AddComment(commentDtoPost, modId);
        return CreatedAtAction(nameof(GetComment), new { id = result.Id, gameId, modId }, result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutComment(int id, CommentDtoPut commentDtoPut, int gameId, int modId)
    {
        if (!_commentsHandler.CommentExists(id, gameId, modId))
        {
            return NotFound();
        }
        
        var result = await _commentsHandler.UpdateComment(id, commentDtoPut);
        return Ok(result);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id, int gameId, int modId)
    {
        if (!_commentsHandler.CommentExists(id, gameId, modId))
        {
            return NotFound();
        }

        await _commentsHandler.DeleteComment(id);
        return Ok();
    }
}