namespace ModHub.DTO.Game;

public class GameDtoGet
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ShortName { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public int ModsCount { get; set; }
    public int TotalDownloads { get; set; }
    public int WaitingForApprovalModsCount { get; set; }
}