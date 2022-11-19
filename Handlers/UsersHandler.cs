using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ModHub.DTO;
using ModHub.DTO.User;
using ModHub.Models;

namespace ModHub.Handlers;

public class UsersHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UsersHandler(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<UserDtoGet> AddUser(UserDto userDto)
    {
        var user = _mapper.Map<UserDto, User>(userDto);
        // TODO: use real password
        user.PasswordHash = "abc";
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        var userToReturn = _mapper.Map<User, UserDtoGet>(user);
        return userToReturn;
    }
    
    public async Task<IEnumerable<UserDtoGet>> GetAllUsers()
    {
        var users = await _context.Users.ToListAsync();
        var usersDto = _mapper.Map<IEnumerable<User>, IEnumerable<UserDtoGet>>(users);
        return usersDto;
    }
    
    public async Task<UserDtoGet> GetUser(int id)
    {
        var user = await _context.Users.FirstAsync(x => x.Id == id);
        var userDto = _mapper.Map<User, UserDtoGet>(user);
        return userDto;
    }
    
    public async Task UpdateUser(int id, UserDto userDto)
    {
        var user = await _context.Users.FirstAsync( x=> x.Id == id);
        _context.Entry(user).State = EntityState.Modified;

        _mapper.Map(userDto, user);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(int id)
    {
        var user = await _context.Users.FirstAsync( x=> x.Id == id);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
    
    public async Task SoftDeleteUser(int id)
    {
        var user = await _context.Users.FirstAsync( x=> x.Id == id);
        _context.Entry(user).State = EntityState.Modified;
        user.IsDeleted = true;
        await _context.SaveChangesAsync();
    }

    public bool UserExists(int id)
    {
        return _context.Users.Any(x => x.Id == id && !x.IsDeleted);
    }


    public bool UserEmailExists(string email)
    {
        return _context.Users.Any(u => u.Email == email);
    }
}