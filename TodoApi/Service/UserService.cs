using TodoApi.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
namespace TodoApi.Controllers
{
    public interface IUserService
    {

        Task<User> AddUserAsync(UserDTO userDTO);
        Task<IEnumerable<User>> GetUsersAsync();

        Task<bool> LoginUser(UserDTO userDTO);

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
            bool ExistingUser = await _userRepository.isUser(userDTO.Email);
            if (ExistingUser == true)
            {
                return null;
            }
            User User = new User();
            User.Email = userDTO.Email;
            User.PasswordSalt = GenerateSalt();
            // var ConvertedFrom64Password = Encoding.ASCII.GetBytes(PasswordWithSalt);
            // var md5 = new MD5CryptoServiceProvider();
            // var md5data = md5.ComputeHash(ConvertedFrom64Password);
            User.PasswordHash = HashPassword(userDTO.Password, User.PasswordSalt);
            await _userRepository.AddUserAsync(User);
            return User;
        }

        static byte[] GenerateSalt()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] salt = new byte[16]; // Adjust the size based on your security requirements
                rng.GetBytes(salt);
                return salt;
            }
        }

        static string HashPassword(string password, byte[] salt)
        {
            using (var sha256 = new SHA256Managed())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];

                // Concatenate password and salt
                Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

                // Hash the concatenated password and salt
                byte[] hashedBytes = sha256.ComputeHash(saltedPassword);

                // Concatenate the salt and hashed password for storage
                byte[] hashedPasswordWithSalt = new byte[hashedBytes.Length + salt.Length];
                Buffer.BlockCopy(salt, 0, hashedPasswordWithSalt, 0, salt.Length);
                Buffer.BlockCopy(hashedBytes, 0, hashedPasswordWithSalt, salt.Length, hashedBytes.Length);

                return Convert.ToBase64String(hashedPasswordWithSalt);
            }
        }

        public async Task<bool> LoginUser(UserDTO userDTO)
        {
            var User = await _userRepository.GetUserByEmail(userDTO.Email);
            string userStoredPass = User.PasswordHash;
            byte[] userStoredPassSalt = User.PasswordSalt;
            string inputPassowrd = userDTO.Password;
            byte[] passwordBytes = Encoding.UTF8.GetBytes(inputPassowrd);

            byte[] hashedPasswordWithSalt = new byte[passwordBytes.Length + userStoredPassSalt.Length];
            Buffer.BlockCopy(userStoredPassSalt, 0, hashedPasswordWithSalt, 0, userStoredPassSalt.Length);
            Buffer.BlockCopy(passwordBytes, 0, hashedPasswordWithSalt, userStoredPassSalt.Length, passwordBytes.Length);

            string inputPasswordHashed = HashPassword(inputPassowrd, userStoredPassSalt);

            if (userStoredPass == inputPasswordHashed)
            {
                return true;
            }

            return false;

        }

    }
}