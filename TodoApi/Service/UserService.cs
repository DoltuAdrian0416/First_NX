using TodoApi.Models;
using System.Security.Cryptography;
using System.Text;
namespace TodoApi.Controllers
{
    public interface IUserService
    {

        Task<User> AddUserAsync(UserDTO userDTO);
        Task<IEnumerable<User>> GetUsersAsync();

    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }
        public async Task<User> AddUserAsync(UserDTO userDTO)
        {
            User User = new User();
            User.Id = userDTO.Id;
            User.Email = userDTO.Email;
            User.PasswordSalt = Guid.NewGuid().ToString();
            var PasswordWithSalt = User.PasswordSalt.ToString() + userDTO.Password;
            // var ConvertedFrom64Password = Encoding.ASCII.GetBytes(PasswordWithSalt);
            // var md5 = new MD5CryptoServiceProvider();
            // var md5data = md5.ComputeHash(ConvertedFrom64Password);
            byte[] buffer = System.Text.Encoding.UTF8.GetBytes(PasswordWithSalt);
            User.PasswordHash = System.Text.Encoding.UTF8.GetString(buffer, 0, buffer.Length);
            await _userRepository.AddUserAsync(User);
            return User;
        }



    }
}