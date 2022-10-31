using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO.Auth;
using ModHub.Models;

namespace ModHub.Handlers
{
    public class AuthHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AuthHandler(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<User?> Login(UserLoginDto loginDto)
        {
            var user = await _context.Users.Where(u => u.Email == loginDto.Email).SingleOrDefaultAsync();

            if (user == null)
            {
                return null;
            }

            Console.WriteLine(BCrypt.Net.BCrypt.HashPassword(loginDto.Password));

            var isPasswordCorrect = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash);

            return isPasswordCorrect ? user : null;
        }

        public async Task<User> Register(UserRegisterDto registerDto)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            var newUser = _mapper.Map<UserRegisterDto, User>(registerDto);

            newUser.PasswordHash = passwordHash;

            await _context.Users.AddAsync(newUser);

            await _context.SaveChangesAsync();

            return newUser;
        }
    }
}