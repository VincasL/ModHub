using Microsoft.EntityFrameworkCore;
using ModHub.Models;

namespace ModHub;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    
    public DbSet<Comment> Comments  { get; set; }
    public DbSet<Game> Games  { get; set; }    
    public DbSet<Mod> Mods  { get; set; } 
    public DbSet<ModRating> ModRatings  { get; set; }
    public DbSet<User> Users  { get; set; }    
}