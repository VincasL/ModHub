using System.ComponentModel.DataAnnotations;

namespace ModHub.DTO.Auth
{
    public class UserLoginDto
    {
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; }
        [MaxLength(255)]
        public string Password { get; set; }
    }
}
