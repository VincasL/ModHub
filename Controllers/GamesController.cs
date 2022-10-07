using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class GamesController : ControllerBase
{
    private readonly GamesHandler _gamesHandler;
    private readonly ModsHandler _modsHandler;

    public GamesController(GamesHandler gamesHandler, ModsHandler modsHandler)
    {
        _gamesHandler = gamesHandler;
        _modsHandler = modsHandler;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GameDtoGet>))]
    public async Task<IEnumerable<GameDtoGet>> GetAllGames()
    {
        var result = await _gamesHandler.GetAllGames();
        return result;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GameDtoGet>> GetGame(int id)
    {
        if (!_gamesHandler.GameExists(id))
        {
            return NotFound();
        }
        
        var result = await _gamesHandler.GetGame(id);

        return Ok(result);
    }
    
    // [HttpGet("{id}/mods")]
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GameDtoGet>))]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public async Task<ActionResult> GetGameMods(int id)
    // {
    //     if (!_gamesHandler.GameExists(id))
    //     {
    //         return NotFound();
    //     }
    //     
    //     var result = await _modsHandler.GetModsByGameId(id);
    //
    //     return Ok(result);
    // }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GameDtoGet>> PostGame([FromBody] GameDto gameDto)
    {
        var result = await _gamesHandler.AddGame(gameDto);
        return CreatedAtAction(nameof(GetGame), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GameDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutGame(int id, GameDto gameDto)
    {
        if (!_gamesHandler.GameExists(id))
        {
            return NotFound();
        }
        
        var result = await _gamesHandler.UpdateGame(id, gameDto);
        return Ok(result);
    }
    
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame(int id)
    {
        if (!_gamesHandler.GameExists(id))
        {
            return NotFound();
        }
        
        await _gamesHandler.SoftDeleteGame(id);
        return NoContent();
    }

}