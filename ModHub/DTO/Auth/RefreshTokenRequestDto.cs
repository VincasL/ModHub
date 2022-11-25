using System.ComponentModel.DataAnnotations;

namespace ModHub.DTO.Auth
{
    public class RefreshTokenRequestDto
    {
        [Required]
        public string AccessToken { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
