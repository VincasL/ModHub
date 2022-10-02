using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class ModController : ControllerBase
{
    private readonly ModHandler _modHandler;
    private readonly CommentHandler _commentHandler;
    
    public ModController(ModHandler modHandler, CommentHandler commentHandler)
    {
        _modHandler = modHandler;
        _commentHandler = commentHandler;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    public async Task<IEnumerable<ModDtoGet>> GetAllMods()
    {
        var result = await _modHandler.GetAllMods();
        return result;
    }

    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ModDtoGet>> GetMod(int id)
    {
        if (!_modHandler.ModExists(id))
        {
            return NotFound();
        }
        
        var result = await _modHandler.GetMod(id);

        return result;
    }
    
    [HttpGet("{id}/comments")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetCommentsByModId(int id)
    {
        if (!_modHandler.ModExists(id))
        {
            return NotFound();
        }
        
        var result = await _commentHandler.GetCommentsByModId(id);

        return Ok(result);
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ModDtoGet>> PostMod([FromBody] ModDto modDto)
    {
        var result = await _modHandler.AddMod(modDto);
        return CreatedAtAction(nameof(GetMod), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutMod(int id, ModDto modDto)
    {
        if (!_modHandler.ModExists(id))
        {
            return NotFound();
        }
        
        await _modHandler.UpdateMod(id, modDto);
        return Ok();
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMod(int id)
    {
        if (!_modHandler.ModExists(id))
        {
            return NotFound();
        }
        
        await _modHandler.SoftDeleteMod(id);
        return Ok();
    }
}