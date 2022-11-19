namespace ModHub.Models;

public class Game : BaseModel
{
    public string? Name { get; set; }
    public string Description { get; set; }
    public bool IsDeleted { get; set; }

    public string? ImageUrl { get; set; } =
        "https://assets-prd.ignimgs.com/2022/01/07/gta-san-andreas-collage-button2-1641589094079.jpg";
}