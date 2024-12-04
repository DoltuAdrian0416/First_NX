using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;


namespace TodoApi.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            var users = await _service.GetUsersAsync();
            if (users.Count() == 0)
            { return NotFound(); }
            return Ok(users);
        }

        [HttpPost("/login")]

        public async Task<ActionResult<IEnumerable<User>>> LoginUser([FromBody] UserDTO user)
        {
            if (await _service.LoginUser(user))
            { return Ok(); }
            return BadRequest("Invalid email or password!");
        }

        [HttpPost("/register")]
        public async Task<ActionResult<IEnumerable<User>>> PostUser([FromBody] UserDTO user)
        {
            var RegisteredUser = await _service.AddUserAsync(user);
            if (RegisteredUser == null)
            {
                return BadRequest("This email is already registered");
            }
            return Ok(user);
        }
    }
}