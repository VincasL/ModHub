using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;
using ModHub.Models;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private GameHandler _handler;

    public GameController(GameHandler handler)
    {
        _handler = handler;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GameDtoGet>> GetGame(int id)
    {
        if (!_handler.GameExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetGame(id);

        return result;
    }
    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GameDtoGet>> PostGame([FromBody] GameDto gameDto)
    {
        var result = await _handler.AddGame(gameDto);
        return CreatedAtAction(nameof(GetGame), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutGame(int id, GameDto gameDto)
    {
        if (!_handler.GameExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateGame(id, gameDto);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(int id)
    {
        if (!_handler.GameExists(id))
        {
            return NotFound();
        }
        
        await _handler.DeleteGame(id);
        return Ok();
    }

}