using TodoApi.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using TodoApi.UserInfrastructure;
using NuGet.Common;
namespace TodoApi.Controllers
{
    public interface IUserService
    {

        Task<User> AddUserAsync(UserDTO userDTO);
        Task<IEnumerable<User>> GetUsersAsync();

        Task<string> LoginUser(UserDTO userDTO);

        Task<User> GetUserByEmail(string email);

        Task<bool> UpdateProfilePicture(string email, byte[] profilePicture);

    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenProvider _tokenProvider;

        public UserService(IUserRepository userRepository, TokenProvider tokenProvider)
        {
            _userRepository = userRepository;
            _tokenProvider = tokenProvider;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }

        public async Task<User> GetUserByEmail(string email){
            return await _userRepository.GetUserByEmail(email);
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

        public async Task<string> LoginUser(UserDTO userDTO)
        {
            User User = await GetUserByEmail(userDTO.Email);
            if (User == null) { throw new Exception("Invalid email! No user corresponding to this email was found!"); }
            string userStoredPass = User.PasswordHash;
            byte[] userStoredPassSalt = User.PasswordSalt;
            string inputPassword = userDTO.Password;
            byte[] passwordBytes = Encoding.UTF8.GetBytes(inputPassword);

            byte[] hashedPasswordWithSalt = new byte[passwordBytes.Length + userStoredPassSalt.Length];
            Buffer.BlockCopy(userStoredPassSalt, 0, hashedPasswordWithSalt, 0, userStoredPassSalt.Length);
            Buffer.BlockCopy(passwordBytes, 0, hashedPasswordWithSalt, userStoredPassSalt.Length, passwordBytes.Length);

            string inputPasswordHashed = HashPassword(inputPassword, userStoredPassSalt);

            if (userStoredPass != inputPasswordHashed)
            {
                throw new Exception("Incorrect password!");
            }

            string token = _tokenProvider.Create(User);

            return token;

        }
        
         public async Task<bool> UpdateProfilePicture(string email, byte[] profilePicture)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return false;
            }

            user.ProfilePicture = profilePicture;
            return await _userRepository.UpdateUserAsync(user);
        }
    }
}