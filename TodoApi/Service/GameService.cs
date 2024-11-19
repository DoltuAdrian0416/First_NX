using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IGameService
    {

        public Task<IEnumerable<Game>> GetGamesAsync();
        public Task<Game> AddGamesAsync(Game game);
        public Task<IEnumerable<Game>> GetPlayerGames(string id);
    }
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;

        public GameService(IGameRepository gamesRepository)
        {
            _gameRepository = gamesRepository;
        }

        public async Task<IEnumerable<Game>> GetGamesAsync()
        {
            return await _gameRepository.GetGamesAsync();
        }
        public async Task<Game> AddGamesAsync(Game game)
        {
            await _gameRepository.AddGamesAsync(game);
            return game;
        }

        public async Task<IEnumerable<Game>> GetPlayerGames(string id)
        {
            return await _gameRepository.GetPlayerGames(id);
        }



    }
}