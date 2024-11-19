using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IGameRepository
    {
        public Task<IEnumerable<Game>> GetGamesAsync();
        public Task<Game> AddGamesAsync(Game game);
        public Task<IEnumerable<Game>> GetPlayerGames(string name);

    }
    public class GamesRepository : IGameRepository
    {
        private readonly GamesContext _context;
        public GamesRepository(GamesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Game>> GetGamesAsync()
        {
            return await _context.Games.ToListAsync();
        }
        public async Task<Game> AddGamesAsync(Game game)
        {
            await _context.Games.AddAsync(game);
            await _context.SaveChangesAsync();
            return game;
        }

        public async Task<IEnumerable<Game>> GetPlayerGames(string id)
        {
            return await _context.Games.Where(game => game.Winner.Id == id).ToListAsync();
        }



    }
}