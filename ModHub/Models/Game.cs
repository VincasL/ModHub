using System.ComponentModel.DataAnnotations.Schema;
using ModHub.Enums;

namespace ModHub.Models;

public class Game : BaseModel
{
    public string? Name { get; set; }
    public string ShortName { get; set; }
    public string Description { get; set; }
    public bool IsDeleted { get; set; }

    public string? ImageUrl { get; set; } =
        "https://assets-prd.ignimgs.com/2022/01/07/gta-san-andreas-collage-button2-1641589094079.jpg";

    public ICollection<Mod> Mods { get; set; } = new List<Mod>();

    [NotMapped] public int ModsCount => Mods.Count(x => x.ModStatus is ModStatus.Approved);
    [NotMapped] public int WaitingForApprovalModsCount => Mods.Count(x => x.ModStatus is ModStatus.WaitingForApproval);
    [NotMapped] public int TotalDownloads => Mods.Aggregate(0, (sum, mod) => sum + mod.TotalDownloads);

}