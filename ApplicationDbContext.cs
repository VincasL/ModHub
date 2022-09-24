﻿using Microsoft.EntityFrameworkCore;
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
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasMany(x => x.Mods)
                .WithOne(x => x.User)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasMany(x => x.Comments)
                .WithOne(x => x.User)
                .OnDelete(DeleteBehavior.NoAction);
            
            entity.HasMany(x => x.ModRatings)
                .WithOne(x => x.User)
                .OnDelete(DeleteBehavior.NoAction);
        });
        
        modelBuilder.Entity<Mod>(entity =>
        {
            entity.HasMany(x => x.Comments)
                .WithOne(x => x.Mod)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasMany(x => x.ModRatings)
                .WithOne(x => x.Mod)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(x => x.User)
                .WithMany(x => x.Mods);
        });
    }
}