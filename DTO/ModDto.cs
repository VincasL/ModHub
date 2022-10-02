using ModHub.Enums;

namespace ModHub.DTO;

public class ModDto
{
    public string Name { get; set; }
    public string? FileKey { get; set; }
    public string? DownloadLink { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public int GameId { get; set; }
}