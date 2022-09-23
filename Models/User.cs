using ModHub.Enums;

namespace ModHub.Models;

public class User : BaseModel
{
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Role Role { get; set; }
}