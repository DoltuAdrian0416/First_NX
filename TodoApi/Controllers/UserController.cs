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



        [HttpPost]
        public async Task<ActionResult<IEnumerable<User>>> PostUser([FromBody] UserDTO user)
        {
            await _service.AddUserAsync(user);
            return Ok(user);
        }
    }
}