using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;


namespace TodoApi.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/games")]
    [ApiController]

    public class GamesController : ControllerBase
    {
        private readonly IGameService _service;
        public GamesController(IGameService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var games = await _service.GetGamesAsync();
            if (games.Count() == 0)
            { return NotFound(); }
            return Ok(games);
        }

        [HttpGet("winner/{{id}}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetWinnerIdGame(string id)
        {
            var WinnerGames = await _service.GetWinnerGames(id);
            if (WinnerGames.Count() == 0) { return NotFound(); }
            return Ok(WinnerGames);
        }
        [HttpGet("player/{{id}}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetPlayerIdGame(string id)
        {
            var PlayerGames = await _service.GetPlayerGames(id);
            if (PlayerGames.Count() == 0) { return NotFound(); }
            return Ok(PlayerGames);
        }
        [HttpGet("game/{{id}}")]
        public async Task<ActionResult<Game>> GetGameById(string id)
        {
            var Game = await _service.GetGamesById(id);
            if (Game == null) { return NotFound(); }
            return Ok(Game);
        }


        [HttpPost]
        public async Task<ActionResult<IEnumerable<Game>>> PostGames([FromBody] Game game)
        {

            if (game.Player1.Id == game.Player2.Id)
            {
                return BadRequest("Ids must be different");
            }

            if (_service.IsBoard(game.Board.Id))
            {
                return BadRequest("Board with the same Id already exists");
            }
            if (!_service.ValidateWinner(game))
            {
                return BadRequest("Winners must be a player");
            }
            await _service.AddGamesAsync(game);
            return Ok(game);
        }
    }
}