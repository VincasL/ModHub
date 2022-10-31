using System.Net.Mime;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
    private readonly GamesHandler _usersHandler;

    
    public ModsController(ModsHandler modsHandler, CommentsHandler commentsHandler, GamesHandler gamesHandler, GamesHandler usersHandler)
    {
        _modsHandler = modsHandler;
        _commentsHandler = commentsHandler;
        _gamesHandler = gamesHandler;
        _usersHandler = usersHandler;
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
    
    [Authorize(Roles = "User,Moderator,Admin")]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ModDtoGet>> PostMod([FromBody] ModDto modDto, [FromRoute] int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_gamesHandler.GameExists(gameId))
        {
            return NotFound();
        }

        var result = await _modsHandler.AddMod(modDto, gameId, userId);
        return CreatedAtAction(nameof(GetMod), new { id = result.Id, gameId }, result);
    }

    [Authorize(Roles = "User,Moderator,Admin")]
    [HttpPut("{modId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutMod(int modId, ModDtoPut modDto, int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }
        
        if (!_modsHandler.ModBelongsToUserOrUserIsAdmin(modId, userId))
        {
            return Forbid();
        }
        


        var result = await _modsHandler.UpdateMod(modId, modDto);
        return Ok(result);
    }
    
    [Authorize(Roles = "Moderator,Admin")]
    [HttpPut("{modId}/modStatus")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ChangeModStatus(int modId, ModChangeStatusDto modChangeStatusDto, int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }
        
        var result = await _modsHandler.ChangeModStatus(modId, modChangeStatusDto);
        return Ok(result);
    }
    
    
    [Authorize(Roles = "User,Moderator,Admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpDelete("{modId}")]
    public async Task<IActionResult> DeleteMod(int modId, int gameId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_modsHandler.ModBelongsToUserOrUserIsAdmin(modId, userId))
        {
            return Forbid();
        }
        
        if (!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }
        
        await _modsHandler.SoftDeleteMod(modId);
        return Ok();
    }
}