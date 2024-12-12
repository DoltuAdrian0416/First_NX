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
        [HttpGet("user/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserByEmail(string email)
        {
            var user = await _service.GetUserByEmail(email);
            if (user == null)
            { return NotFound(); }
            return Ok(user);
        }

        [HttpGet("user/profilePicture/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserProfilePicture(string email)
        {
            var user = await _service.GetUserByEmail(email);
            if (user == null)
            { return NotFound(); }
            return Ok(user.ProfilePicture);
        }


        [HttpPost("/login")]

        public async Task<ActionResult<IEnumerable<User>>> LoginUser([FromBody] UserDTO user)
        {
            string token = await _service.LoginUser(user);
            if (token != null)
            { return Ok(token); }
            return BadRequest(token);
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
        [HttpPut("/updatePFP")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> UpdateProfilePicture(string email, IFormFile profilePicture)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            if (profilePicture == null || profilePicture.Length == 0)
            {
                return BadRequest("Profile picture is required.");
            }

            using var memoryStream = new MemoryStream();
            await profilePicture.CopyToAsync(memoryStream);
            var profilePictureBytes = memoryStream.ToArray();

            var result = await _service.UpdateProfilePicture(email, profilePictureBytes);
            if (!result)
            {
                return NotFound("User not found or update failed.");
            }

            return Ok(profilePictureBytes);
        }

        [HttpPut("/updateUsername")]
        public async Task<ActionResult> UpdateUsername(string email, [FromForm] string username)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            if (string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Username is required.");
            }

            var result = await _service.UpdateUsername(email, username);
            if (!result)
            {
                return NotFound("User not found or update failed.");
            }

            return Ok("Username updated successfully.");
        }

    }
}