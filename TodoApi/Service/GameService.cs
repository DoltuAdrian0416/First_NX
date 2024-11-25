using TodoApi.Models;

namespace TodoApi.Controllers
{
    public interface IGameService
    {

        public Task<IEnumerable<Game>> GetGamesAsync();
        public Task<Game> AddGamesAsync(Game game);
        public Task<IEnumerable<Game>> GetWinnerGames(string id);
        public Task<IEnumerable<Game>> GetPlayerGames(string id);
        public Task<Game> GetGamesById(string id);
        public bool IsBoard(string id);
        public bool ValidateWinner(Game game);
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

        public async Task<IEnumerable<Game>> GetWinnerGames(string id)
        {
            return await _gameRepository.GetWinnerGames(id);
        }
        public async Task<IEnumerable<Game>> GetPlayerGames(string id)
        {
            return await _gameRepository.GetPlayerGames(id);
        }
        public async Task<Game> GetGamesById(string id)
        {
            return await _gameRepository.GetGameById(id);
        }

        public bool IsBoard(string id)
        {
            return _gameRepository.IsBoard(id);
        }

        public bool ValidateWinner(Game game)
        {
            if (game.Winner.Id != game.Player1.Id && game.Winner.Id != game.Player2.Id)
            {
                return false;
            }

            return true;
        }

    }
}