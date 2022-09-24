using System.ComponentModel.DataAnnotations;

namespace ModHub.DTO;

public class RatingDto
{
    public int ModId { get; set; }
    
    [Range(1, 5)]
    public int Rating { get; set; }
}