using Microsoft.EntityFrameworkCore;
using TodoApi.Controllers;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseInMemoryDatabase("TodoList"), ServiceLifetime.Singleton);
builder.Services.AddDbContext<GamesContext>(opt =>
    opt.UseInMemoryDatabase("Games"), ServiceLifetime.Singleton);
builder.Services.AddSingleton<IGameContext, GamesContext>();
builder.Services.AddSingleton<IGameRepository, GamesRepository>();
builder.Services.AddSingleton<IGameService, GameService>();
builder.Services.AddControllers();
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

app.MapControllers();

app.Run();
