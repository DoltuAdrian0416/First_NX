using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace TodoApi.Models;


public class Board
{
    [Key]
    public int Id { get; set; }
    public int Size { get; set; }
    public Values[] Rows { get; set; } = [];
}