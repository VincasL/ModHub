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
        int? userId = int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;
  
        if (!_gamesHandler.GameExists(gameId))
        {
            return NotFound();
        }
        
        var result =  await _modsHandler.GetModsByGameId(gameId, userId);
        return Ok(result);
    }
    
    [Authorize]
    [HttpGet("user")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    public async Task<ActionResult> GetAllUserMods()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        var result =  await _modsHandler.GetModsByUserId(userId);
        return Ok(result);
    }
    
    [HttpGet("submissions")]
    [Authorize(Roles = "Moderator,Admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ModDtoGet>))]
    public async Task<ActionResult> GetWaitingForApprovalMods()
    {
        var result =  await _modsHandler.GetWaitingForApprovalMods();
        return Ok(result);
    }

    
    [HttpGet("{modId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ModDtoGet>> GetMod(int modId, int gameId)
    {
        int? userId = int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        if (!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }

        var result = await _modsHandler.GetMod(modId, userId);

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
        return CreatedAtAction(nameof(GetMod), new { modId = result.Id, gameId }, result);
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
    
    [HttpPost("{modId}/download")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DownloadMod(int modId, int gameId)
    {
        if (!_modsHandler.ModExists(modId, gameId))
        {
            return NotFound();
        }
        
        var result = await _modsHandler.DownloadMod(modId);
        return Ok(result);
    }
    
    [Authorize]
    [HttpPut("{modId}/modRating")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ModDtoGet))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ChangeModRating(int gameId, int modId, [FromBody] int rating)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_modsHandler.ModExists(modId))
        {
            return NotFound();
        }
        
        await _modsHandler.ChangeModRating(modId, userId, rating);
        return Ok();
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