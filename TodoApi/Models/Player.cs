using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class Player
{
    [Key]
    public string Id { get; set; }
    public string? Name { get; set; }
}