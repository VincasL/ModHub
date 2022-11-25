using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ModHub.Authentication;
using ModHub.DTO.Auth;
using ModHub.Handlers;

namespace ModHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UsersHandler _usersHandler;
        private readonly AuthHandler _authHandler;
        private readonly IJwtAuthManager _jwtAuthManager;

        public AuthController(IJwtAuthManager jwtAuthManager, UsersHandler usersHandler, AuthHandler authHandler)
        {
            _usersHandler = usersHandler;
            _authHandler = authHandler;
            _jwtAuthManager = jwtAuthManager;
        }
        
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (_usersHandler.UserEmailExists(registerDto.Email))
            {
                return BadRequest("User with this email address already exists.");
            }

            var user = await _authHandler.Register(registerDto);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(registerDto.Email, claims, DateTime.Now);
            return Ok(new LoginResult
            {
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString,
            });
        }
        
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _authHandler.Login(loginDto);

            if (user == null)
            {
                return Unauthorized("Invalid login creditentials");
            }
            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(loginDto.Email, claims, DateTime.Now);
            return Ok(new LoginResult
            {
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString,
            });
        }

        [HttpPost("Logout")]
        [Authorize]
        public ActionResult Logout()
        {
            // optionally "revoke" JWT token on the server side --> add the current token to a block-list
            // https://github.com/auth0/node-jsonwebtoken/issues/375

            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            _jwtAuthManager.RemoveRefreshTokenByEmail(email);
            return Ok();
        }

        [HttpPost("RefreshToken")]
        public ActionResult RefreshToken([FromBody] RefreshTokenRequestDto request)
        {
            try
            {
                var accessToken = request.AccessToken;
                var refreshToken = request.RefreshToken;

                if (string.IsNullOrWhiteSpace(accessToken) || string.IsNullOrWhiteSpace(refreshToken))
                {
                    return BadRequest();
                }

                var jwtResult = _jwtAuthManager.Refresh(refreshToken, accessToken, DateTime.Now);

                var (newJwtClaims, _) = _jwtAuthManager.DecodeJwtToken(jwtResult.AccessToken);

                var result = new LoginResult
                {
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                };

                return Ok(result);
            }
            catch (SecurityTokenException)
            {
                return Forbid("Token is invalid"); // return 403 so that the client side can redirect the user to login page
            }
        }
    }
}
