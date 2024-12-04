using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models;
public class User
{
    [Key]
    [Required]
    public int Id { get; set; }
    [EmailAddress]
    [Required]

    public string Email { get; set; }
    [Required]
    public string PasswordHash { get; set; }
    [Required]
    public byte[] PasswordSalt { get; set; }

}

public class UserDTO
{
    [EmailAddress]
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }


}