using System.ComponentModel.DataAnnotations;

namespace ModHub.DTO;

public class RatingDtoPut
{
    [Range(1, 5)]
    public int Rating { get; set; }
}