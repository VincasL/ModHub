using ModHub.DTO.User;

namespace ModHub.DTO;

public class CommentDtoGet
{
    public int Id { get; set; }
    public string Text { get; set; }
    public UserDtoGet CreatedBy { get; set; }
    public int UserId { get; set; }
    public int ModId { get; set; }
    public DateTime DateStamp { get; set; }
    public bool CanEdit { get; set; }

}