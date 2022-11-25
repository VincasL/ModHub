using System.ComponentModel.DataAnnotations.Schema;

namespace ModHub.Models;

public class ModRating : BaseModel
{
    [ForeignKey("UserId")]
    public virtual User User { get; set; }
    public int UserId { get; set; }
    
    [ForeignKey("ModId")]
    public virtual Mod Mod { get; set; }
    public int ModId { get; set; }
    
    public int Rating { get; set; }
}