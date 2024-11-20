using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace TodoApi.Models;


public class Board
{
    public string Id { get; set; }
    public int Size { get; set; }
    public Values[] Rows { get; set; } = [];
}