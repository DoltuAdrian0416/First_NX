using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class Player
{
    public string Id { get; set; }
    public string? Name { get; set; }
}