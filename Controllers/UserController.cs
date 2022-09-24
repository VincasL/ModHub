using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserHandler _handler;

    public UserController(UserHandler handler)
    {
        _handler = handler;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDtoGet))]
    public async Task<IEnumerable<UserDtoGet>> GetAllUsers()
    {
        var result = await _handler.GetAllUsers();
        return result;
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UserDtoGet>> GetUser(int id)
    {
        if (!_handler.UserExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetUser(id);

        return result;
    }
    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDtoGet>> PostUser([FromBody] UserDto userDto)
    {
        var result = await _handler.AddUser(userDto);
        return CreatedAtAction(nameof(GetUser), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, UserDto userDto)
    {
        if (!_handler.UserExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateUser(id, userDto);
        return Ok();
    }

    [HttpDelete("{id}")]
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