using Microsoft.EntityFrameworkCore;

namespace ModHub.Models;

public static class PrepDb
{
    public static void PrepPopulation(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        SeedData(serviceScope.ServiceProvider.GetService<ApplicationDbContext>());
    }

    public static void SeedData(ApplicationDbContext context)
    {
        Console.WriteLine("Applying Migrations...");
        context.Database.Migrate();

        if (!context.Users.Any())
        {
            Console.WriteLine("Adding data - seeding");
            context.Users.Add(new User() { Username = "Vinkas", Email = "vinkas@gmail.com", PasswordHash = "123" });
            context.SaveChanges();
        }
        else
        {
            Console.WriteLine("Already have data - not seeding");
        }
    }
}