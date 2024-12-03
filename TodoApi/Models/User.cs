namespace TodoApi.Models;
public class User
{
    public long Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }

    public string PasswordSalt { get; set; }

}

public class UserDTO
{
    public long Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }


}