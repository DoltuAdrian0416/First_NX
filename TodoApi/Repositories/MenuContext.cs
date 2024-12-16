using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using System.Threading;
using System.Threading.Tasks;

namespace TodoApi
{
    public interface IMenuContext
    {
        DbSet<Menu> Menus { get; set; }
        DbSet<MenuItem> MenuItems { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

    public class MenuContext : DbContext, IMenuContext
    {
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }

        public MenuContext(DbContextOptions<MenuContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu>().Property(m => m.Image).HasColumnType("BLOB");
            modelBuilder.Entity<MenuItem>().Property(m => m.ProductImage).HasColumnType("BLOB");

            // Define primary keys
            modelBuilder.Entity<Menu>().HasKey(m => m.Id);
            modelBuilder.Entity<MenuItem>().HasKey(mi => mi.Id);

            // Define the relationship between Menu and MenuItem
            modelBuilder.Entity<Menu>()
                .HasMany(m => m.MenuItems)
                .WithOne(mi => mi.Menu)
                .HasForeignKey(mi => mi.MenuId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: configure cascade delete
        }
    }
}
