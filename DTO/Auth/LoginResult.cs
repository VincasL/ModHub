namespace ModHub.DTO.Auth
{
    public class LoginResult
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public bool IsOfficeAdmin { get; set; }
        public int DefaultOfficeId { get; set; }
        public int PrefferedNotification { get; set; }
    }
}
