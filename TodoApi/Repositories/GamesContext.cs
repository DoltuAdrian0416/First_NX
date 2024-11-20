using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IGameContext
    {

    }
    public class GamesContext : DbContext, IGameContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Player { get; set; }
        public DbSet<Board> Board { get; set; }

        public GamesContext(DbContextOptions<GamesContext> options) : base(options)
        {

        }


    }
}