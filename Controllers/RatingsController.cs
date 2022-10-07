using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("[controller]")]
public class RatingsController : ControllerBase
{
    private readonly RatingsHandler _handler;
    private ModsHandler _modsHandler;

    public RatingsController(RatingsHandler handler, ModsHandler modsHandler)
    {
        _handler = handler;
        _modsHandler = modsHandler;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RatingDtoGet))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RatingDtoGet>> GetRating(int id)
    {
        if (!_handler.RatingExists(id))
        {
            return NotFound();
        }
        
        var result = await _handler.GetRating(id);

        return result;
    }
    
    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<RatingDtoGet>> PostRating([FromBody] RatingDtoPost ratingDtoPost)
    {
        var result = await _handler.AddRating(ratingDtoPost);
        return CreatedAtAction(nameof(GetRating), new { id = result.Id }, result);
    }

    
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PutRating(int id, RatingDtoPut ratingDtoPut)
    {
        if (!_handler.RatingExists(id))
        {
            return NotFound();
        }
        
        await _handler.UpdateRating(id, ratingDtoPut);
        return Ok();
    }

    
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteRating(int id)
    {
        if (!_handler.RatingExists(id))
        {
            return NotFound();
        }
        
        await _handler.DeleteRating(id);
        return Ok();
    }

}