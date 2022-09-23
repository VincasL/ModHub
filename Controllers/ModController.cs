using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;
using ModHub.Models;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class ModController : ControllerBase
{
    private ModHandler _handler;

    public ModController(ModHandler handler)
    {
        _handler = handler;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ModDtoGet>> GetMod(int id)
    {
        if (!_handler.ModExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetMod(id);

        return result;
    }
    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ModDtoGet>> PostMod([FromBody] ModDto modDto)
    {
        var result = await _handler.AddMod(modDto);
        return CreatedAtAction(nameof(GetMod), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutMod(int id, ModDto modDto)
    {
        if (!_handler.ModExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateMod(id, modDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMod(int id)
    {
        if (!_handler.ModExists(id))
        {
            return NotFound();
        }
        
        await _handler.DeleteMod(id);
        return Ok();
    }

}