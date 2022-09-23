using ModHub.Enums;

namespace ModHub.DTO;

public class ModDtoGet
{
    public int Id {get; set;}
    public int TotalDownloads {get; set;}
    public string? FileKey {get; set;}
    public string? DownloadLink {get; set;}
    public string? ImageKey {get; set;}
    public ModStatus ModStatus {get; set;}
    public string Description {get; set;}
}