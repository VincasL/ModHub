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

    public CommentController(CommentHandler handler)
    {
        _handler = handler;
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
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CommentDtoGet>))]
    public async Task<ActionResult<CommentDtoGet>> GetAllComments()
    {
        var result = await _handler.GetAllComments();

        return Ok(result);
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CommentDtoGet>> PostComment([FromBody] CommentDtoPost commentDtoPost)
    {
        var result = await _handler.AddComment(commentDtoPost);
        return CreatedAtAction(nameof(GetComment), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutComment(int id, CommentDtoPut commentDtoPut)
    {
        if (!_handler.CommentExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateComment(id, commentDtoPut);
        return Ok();
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CommentDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
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