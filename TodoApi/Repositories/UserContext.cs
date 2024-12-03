using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IUserContext
    {

    }
    public class UserContext : DbContext, IUserContext
    {
        public DbSet<User> Users { get; set; }


        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }


    }
}