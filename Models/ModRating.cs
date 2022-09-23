namespace ModHub.Models;

public class ModRating : BaseModel
{
    public User User { get; set; }
    public int Rating { get; set; }
}