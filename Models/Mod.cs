using System.ComponentModel.DataAnnotations.Schema;
using ModHub.Enums;

namespace ModHub.Models;

public class Mod : BaseModel
{
    public int TotalDownloads { get; set; }
    public string? FileKey { get; set; }
    public string? DownloadLink { get; set; }
    public string? ImageKey { get; set; }
    public ModStatus ModStatus { get; set; } = ModStatus.WaitingForApproval;
    public string Description { get; set; }
    public string Name { get; set; }
    
    [ForeignKey("GameId")]
    public virtual Game Game { get; set; }
    public int GameId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; }
    public int UserId { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<ModRating> ModRatings { get; set; }
}