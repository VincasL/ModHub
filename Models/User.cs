using ModHub.Enums;

namespace ModHub.Models;

public class User : BaseModel
{
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Role Role { get; set; }
    public ICollection<Mod> Mods { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<ModRating> ModRatings { get; set; }
    public bool IsDeleted { get; set; }


}