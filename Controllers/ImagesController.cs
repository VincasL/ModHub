using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

public class ImagesController : ControllerBase
{
    private readonly ImagesHandler _imagesHandler;

    public ImagesController(ImagesHandler imagesHandler)
    {
        _imagesHandler = imagesHandler;
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> PostImage([FromBody] string imageBase64)
    {
        var result = await _imagesHandler.PostImage(imageBase64);
        return Ok(result);
    }
}