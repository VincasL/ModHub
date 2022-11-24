using System.Net.Mime;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.DTO.User;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersHandler _handler;

    public UsersController(UsersHandler handler)
    {
        _handler = handler;
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDtoGet>))]
    public async Task<IEnumerable<UserDtoGet>> GetAllUsers()
    {
        var result = await _handler.GetAllUsers();
        return result;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDtoGet>> GetUser([FromRoute] int id)
    {

        if (!_handler.UserExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetUser(id);

        return result;
    }
    
    [Authorize]
    [HttpGet("profile")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDtoGet>> GetUser()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_handler.UserExists(userId))
        {
            return NotFound();
        }
        
        var result = await _handler.GetUser(userId);

        return result;
    }

    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser( UserDtoPut userDtoPut)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (!_handler.UserExists(userId))
        {
            return NotFound();
        }
        
        await _handler.UpdateUser(userId, userDtoPut);
        return Ok();
    }
    
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [HttpPut("{id}/role")]
    public async Task<IActionResult> PutUserRole(int id, UserChangeRoleDto changeRoleDto)
    {
        if (!_handler.UserExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateUserRole(id, changeRoleDto);
        return Ok();
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (!_handler.UserExists(id))
        {
            return NotFound();
        }
        
        await _handler.SoftDeleteUser(id);
        return Ok();
    }
}