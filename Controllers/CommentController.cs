using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly CommentHandler _handler;
    private ModHandler _modHandler;

    public CommentController(CommentHandler handler, ModHandler modHandler)
    {
        _handler = handler;
        _modHandler = modHandler;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameDtoGet))]
    public async Task<IEnumerable<CommentDtoGet>> GetAllComments()
    {
        var result = await _handler.GetAllComments();
        return result;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CommentDtoGet>> GetComment(int id)
    {
        if (!_handler.CommentExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetComment(id);

        return result;
    }
    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CommentDtoGet>> PostComment([FromBody] CommentDtoPost commentDtoPost)
    {
        var result = await _handler.AddComment(commentDtoPost);
        return CreatedAtAction(nameof(GetComment), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutComment(int id, CommentDtoPut commentDtoPut)
    {
        if (!_handler.CommentExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateComment(id, commentDtoPut);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        if (!_handler.CommentExists(id))
        {
            return NotFound();
        }
        
        await _handler.DeleteComment(id);
        return Ok();
    }

}