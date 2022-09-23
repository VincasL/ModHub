using System.ComponentModel.DataAnnotations.Schema;

namespace ModHub.Models;

public class Comment : BaseModel
{
    public string Text { get; set; }
    
    [ForeignKey("UserId")]
    public User User { get; set; }
    
    [ForeignKey("ModId")]
    public Mod Mod { get; set; }
}