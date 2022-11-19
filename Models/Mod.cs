using System.ComponentModel.DataAnnotations.Schema;
using ModHub.Enums;

namespace ModHub.Models;

public class Mod : BaseModel
{
    public int TotalDownloads { get; set; }
    public string? FileKey { get; set; }
    public string? DownloadLink { get; set; }
    public ModStatus ModStatus { get; set; } = ModStatus.WaitingForApproval;
    public string Description { get; set; }
    public string Name { get; set; }
    
    [ForeignKey("GameId")]
    public virtual Game? Game { get; set; }
    public int GameId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User CreatedBy { get; set; }
    public int UserId { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    [ForeignKey("RatingId")]
    public virtual double Rating { get; set; }
    public int? RatingId { get; set; }
    
    public ICollection<Comment> Comments { get; set; }
    public ICollection<ModRating> ModRatings { get; set; }

    public string? ImageUrl { get; set; } =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-1TdKSOZKyiSG-APZM5nO9-p5clXCmeUcNQ&usqp=CAU";

    [NotMapped] public string? GameName => Game?.Name;
    [NotMapped] public int? CurrentUserRating { get; set; }
    [NotMapped] public int TotalRatings { get; set; }

}