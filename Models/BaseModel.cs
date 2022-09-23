using System.ComponentModel.DataAnnotations;

namespace ModHub.Models;

public class BaseModel
{
    [Key]
    public int Id { get; set; }
}