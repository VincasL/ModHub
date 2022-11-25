using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModHub.DTO;
using ModHub.Handlers;

namespace ModHub.Controllers;

[ApiController]
[Route("api/[controller]")]

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
    public async Task<ActionResult> PostImage([FromBody] PostImageDto postImageDto)
    {
        var result = await _imagesHandler.PostImage(postImageDto.imageBase64);
        return Ok(new ImageGetDto(){ImageUrl = result});
    }
}