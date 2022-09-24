using System.ComponentModel.DataAnnotations.Schema;

namespace ModHub.Models;

public class Comment : BaseModel
{
    public string Text { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; }
    public int UserId { get; set; }
    
    [ForeignKey("ModId")]
    public virtual Mod Mod { get; set; }
    public int ModId { get; set; }
    public DateTime DateStamp { get; set; } = DateTime.Now;
}