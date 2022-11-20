using System.ComponentModel.DataAnnotations.Schema;
using ModHub.Enums;

namespace ModHub.Models;

public class User : BaseModel
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public Role Role { get; set; }
    public ICollection<Mod> Mods { get; set; } = new List<Mod>();
    public ICollection<Comment> Comments { get; set; }
    public ICollection<ModRating> ModRatings { get; set; }
    public bool IsDeleted { get; set; }

    public string? ImageUrl { get; set; } =
        "https://staticc.sportskeeda.com/editor/2020/11/b6b38-16042204231804-800.jpg";

    [NotMapped] public int UploadedModsCount => Mods.Count;

}