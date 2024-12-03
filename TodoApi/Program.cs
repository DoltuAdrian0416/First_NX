using Microsoft.EntityFrameworkCore;
using TodoApi.Controllers;
using TodoApi.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<GamesContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<UserContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IGameContext, GamesContext>();
builder.Services.AddScoped<IGameRepository, GamesRepository>();
builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddScoped<IUserContext, UserContext>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("ApiCorsPolicy");
app.MapControllers();

app.Run();
