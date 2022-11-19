using ModHub.Enums;

namespace ModHub.DTO.User;

public class UserDtoGet
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public Role Role { get; set; }
    public string? ImageUrl { get; set; }

}