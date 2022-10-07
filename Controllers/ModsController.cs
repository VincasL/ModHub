using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("Games/{gameId}/[controller]")]
public class ModsController : ControllerBase
{
    private readonly ModsHandler _modsHandler;
    private readonly CommentsHandler _commentsHandler;
    private readonly GamesHandler _gamesHandler;
    
    public ModsController(ModsHandler modsHandler, CommentsHandler commentsHandler, GamesHandler gamesHandler)
    {
        _modsHandler = modsHandler;
        _commentsHandler = commentsHandler;
        _gamesHandler = gamesHandler;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    public async Task<ActionResult> GetAllMods(int gameId)
    {
        if (!_gamesHandler.GameExists(gameId))
        {
            return NotFound();
        }
        
        var result =  await _modsHandler.GetModsByGameId(gameId);
        return Ok(result);
    }

    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ModDtoGet>> GetMod(int id, int gameId)
    {
        if (!_modsHandler.ModExists(id, gameId))
        {
            return NotFound();
        }

        var result = await _modsHandler.GetMod(id);

        return result;
    }
    
    // [HttpGet("{id}/comments")]
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public async Task<ActionResult> GetCommentsByModId(int id, int gameId)
    // {
    //     if (!_modsHandler.ModExists(id))
    //     {
    //         return NotFound();
    //     }
    //     
    //     var result = await _commentsHandler.GetCommentsByModId(id);
    //
    //     return Ok(result);
    // }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ModDtoGet>> PostMod([FromBody] ModDto modDto, [FromRoute] int gameId)
    {
        if (!_gamesHandler.GameExists(gameId))
        {
            return NotFound();
        }

        var result = await _modsHandler.AddMod(modDto, gameId);
        return CreatedAtAction(nameof(GetMod), new { id = result.Id, gameId }, result);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutMod(int id, ModDtoPut modDto, int gameId)
    {
        
        if (!_modsHandler.ModExists(id, gameId))
        {
            return NotFound();
        }

        var result = await _modsHandler.UpdateMod(id, modDto);
        return Ok(result);
    }

    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMod(int id, int gameId)
    {
        
        if (!_modsHandler.ModExists(id, gameId))
        {
            return NotFound();
        }
        
        await _modsHandler.SoftDeleteMod(id);
        return Ok();
    }
}