namespace ModHub.Models;

public class Game : BaseModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public bool IsDeleted { get; set; }
}