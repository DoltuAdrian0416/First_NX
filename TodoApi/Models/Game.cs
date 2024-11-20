using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;
public class Game
{

    public string Id { get; set; }
    public DateTime EndDate { get; set; }
    public Player Player1 { get; set; }
    public Player Player2 { get; set; }

    public Player Winner { get; set; }
    public Board Board { get; set; }
}