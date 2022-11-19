using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ModHub;
using ModHub.Authentication;
using ModHub.Handlers;
using ModHub.Models;

var builder = WebApplication.CreateBuilder(args);
var jwtTokenConfig = builder.Configuration.GetSection("jwtTokenConfig").Get<JwtTokenConfig>();


builder.Services.AddSingleton(jwtTokenConfig);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtTokenConfig.Issuer,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtTokenConfig.Secret)),
        ValidAudience = jwtTokenConfig.Audience,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromMinutes(1)
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy =>
        policy.RequireClaim(ClaimTypes.Role, "Admin"));
});

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:4200").AllowAnyHeader();
        });
});

builder.Services.AddSingleton<IJwtAuthManager, JwtAuthManager>();
builder.Services.AddHostedService<JwtRefreshTokenCache>();

builder.Services.AddControllers();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddTransient<ModsHandler>();
builder.Services.AddTransient<GamesHandler>();
builder.Services.AddTransient<CommentsHandler>();
builder.Services.AddTransient<UsersHandler>();
builder.Services.AddTransient<RatingsHandler>();
builder.Services.AddTransient<AuthHandler>();
builder.Services.AddTransient<ImagesHandler>();

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlPath = AppDomain.CurrentDomain.BaseDirectory + nameof(ModHub) + ".xml";
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ModHub API",
        Version = "v1",
        Description = "API for ModHub: uploading, sharing mods and feedback about them",
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "Bearer {token goes here}"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();
app.UsePathBase(new PathString("/api"));
app.UseRouting();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(myAllowSpecificOrigins);

app.MapControllers();
PrepDb.PrepPopulation(app);

app.Run();