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

        [HttpGet("{playerId}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetPlayerIdGame(string playerId)
        {
            var PlayerGames = await _service.GetPlayerGames(playerId);
            if (PlayerGames.Count() == 0) { return NotFound(); }
            return Ok(PlayerGames);
        }


        [HttpPost]
        public async Task<ActionResult<IEnumerable<Game>>> PostGames([FromBody] Game game)
        {
            await _service.AddGamesAsync(game);
            return Ok(game);
        }
    }
}