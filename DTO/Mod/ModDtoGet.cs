using ModHub.DTO.User;
using ModHub.Enums;

namespace ModHub.DTO;

public class ModDtoGet
{
    public int Id {get; set;}
    public string Name { get; set; }
    public int TotalDownloads {get; set;}
    public string? FileKey {get; set;}
    public string? DownloadLink {get; set;}
    public string? ImageUrl {get; set;}
    public ModStatus ModStatus {get; set;}
    public string Description {get; set;}
    public UserDtoGet CreatedBy { get; set; }
    public double Rating { get; set; }
    public int GameId { get; set; }
    public string? GameName { get; set; }
    public DateTime CreatedAt { get; set; }
    public int? CurrentUserRating { get; set; }
    public int TotalRatings { get; set; }

}