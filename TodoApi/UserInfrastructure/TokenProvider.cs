using System.Security.Claims;
using System.Text;
using TodoApi.Models;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace TodoApi.UserInfrastrucutre;

internal sealed class TokenProvider(IConfiguration configuration)
{
    public void Create(User user)
    {
        string secretKey = configuration["Jwt:Secret"]!;
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
              [
                 new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                 new Claim(JwtRegisteredClaimNames.Email, user.Email),
              ]),
            Expires = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("Jws:ExpirationInMinutes")),
            SigningCredentials = credentials,
            Issuer = configuration["Jws:Issuer"],
            Audience = configuration["Jwt:Audience"]
        };
    }
}