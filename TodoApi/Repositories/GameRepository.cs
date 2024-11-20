using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IGameRepository
    {
        public Task<IEnumerable<Game>> GetGamesAsync();
        public Task<Game> AddGamesAsync(Game game);
        public Task<IEnumerable<Game>> GetWinnerGames(string name);
        public Task<IEnumerable<Game>> GetPlayerGames(string name);

        public bool IsBoard(string id);

    }
    public class GamesRepository : IGameRepository
    {
        private readonly GamesContext _context;
        public IIncludableQueryable<Game, Player> ComposeGame(DbSet<Game> games)
        {
            return games.Include(g => g.Board).Include(g => g.Player1).Include(g => g.Player2).Include(g => g.Winner);
        }

        public GamesRepository(GamesContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Game>> GetGamesAsync()
        {
            return await _context.Games.Include(g => g.Board).Include(g => g.Player1).Include(g => g.Player2).Include(g => g.Winner).ToListAsync();
        }
        public async Task<Game> AddGamesAsync(Game game)
        {
            _context.ChangeTracker.Clear();
            _context.Games.Add(game);
            Console.WriteLine(game);
            await _context.SaveChangesAsync();

            return game;
        }

        public async Task<IEnumerable<Game>> GetWinnerGames(string id)
        {
            return await ComposeGame(_context.Games).Where(game => game.Winner.Id == id).ToListAsync();
        }
        public async Task<IEnumerable<Game>> GetPlayerGames(string id)
        {
            return await ComposeGame(_context.Games).Where(game => game.Player1.Id == id || game.Player2.Id == id).ToListAsync();
        }


        public bool IsBoard(string id)
        {
            if (_context.Games.Where(game => game.Board.Id == id).Count() > 0)
            {
                return true;
            }
            return false;
        }





    }
}