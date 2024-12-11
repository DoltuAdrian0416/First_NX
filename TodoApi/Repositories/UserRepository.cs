using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> AddUserAsync(User user);
        Task<User> GetUserByEmail(string email);

        Task<bool> isUser(string email);

        Task<bool> UpdateUserAsync(User user);
    }
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context;
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
        // Get all users
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        // Add a new user
        public async Task<User> AddUserAsync(User user)
        {
            _context.ChangeTracker.Clear();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstAsync(user => user.Email == email);
        }
        public async Task<bool> isUser(string email)
        {
            var User = await _context.Users.Where(user => user.Email == email).ToListAsync();

            if (User.Count() == 0)
            {
                return false;
            }
            return true;
        }

    }
}