namespace ModHub.DTO.Auth
{
    public class CurrentUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string ProfilePictureUrl { get; set; }
        public bool IsOfficeAdmin { get; set; }
    }
}
