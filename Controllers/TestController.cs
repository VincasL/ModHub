using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{


    public TestController()
    {
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GameDtoGet>))]
    public async Task<IEnumerable<GameDtoGet>> GetAllGames()
    {
        var result = new List<GameDtoGet>();
        return result;
    }
    
  
}