using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public interface IMenuRepository
    {
        Task<Menu> CreateMenuAsync(Menu menu);
        Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant);
        Task<bool> DeleteMenuAsync(string menuId);
        Task<bool> DeleteMenuItemAsync(string menuItemId);
        Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<object>> GetMenusWithItemCountAsync();
        Task UpdateMenuAsync(Menu menu);
        Task UpdateMenuItemAsync(MenuItem menuItem);
        Task<MenuItem> GetMenuItemAsync(string relatedRestaurant, string menuItemId);
        Task<List<string>> GetMenuCategoriesAsync(string relatedRestaurant);
        Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(string relatedRestaurant, string category);
        Task<bool> UpdateImagesFromDb();
    }
    public class MenuRepository : IMenuRepository
    {
        private readonly MenuContext _context;

        public MenuRepository(MenuContext context)
        {
            _context = context;
        }

        public async Task<Menu> CreateMenuAsync(Menu menu)
        {
            _context.Menus.Add(menu);
            await _context.SaveChangesAsync();
            return menu;
        }

        public async Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant)
        {
            var menu = await _context.Menus.FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);
            if (menu == null) return null;

            menuItem.MenuId = menu.Id;
            _context.MenuItems.Add(menuItem);
            await _context.SaveChangesAsync();
            return menuItem;
        }

        public async Task UpdateMenuAsync(Menu menu)
        {
            _context.Entry(menu).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task UpdateMenuItemAsync(MenuItem menuItem)
        {
            _context.Entry(menuItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteMenuAsync(string menuId)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems).FirstOrDefaultAsync(m => m.Id == menuId);
            if (menu != null)
            {
                _context.Menus.Remove(menu);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteMenuItemAsync(string menuItemId)
        {
            var menuItem = await _context.MenuItems.FindAsync(menuItemId);
            if (menuItem != null)
            {
                _context.MenuItems.Remove(menuItem);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant)
        {
            return await _context.Menus
                .Include(m => m.MenuItems)
                .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);
        }

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems)
                                            .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);

            return menu?.MenuItems ?? new List<MenuItem>();
        }
        public async Task<MenuItem> GetMenuItemAsync(string relatedRestaurant, string menuItemId)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems)
                                            .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);

            var menuItem = menu.MenuItems.ElementAt(int.Parse(menuItemId) - 1);
            return menuItem;
        }

        public async Task<IEnumerable<object>> GetMenusWithItemCountAsync()
        {
            return await _context.Menus
                .Select(m => new
                {
                    MenuName = m.RelatedRestaurant,
                    ItemCount = m.MenuItems.Count,
                    ImageBlob = m.Image,
                    MenuDescription = m.Description
                })
                .ToListAsync();
        }

        public async Task<List<string>> GetMenuCategoriesAsync(string relatedRestaurant)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems)
                                            .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);
            return menu.MenuItems.Select(m => m.Category).Distinct().ToList();
        }
        public async Task<IEnumerable<MenuItem>> GetMenuItemsByCategoryAsync(string relatedRestaurant, string category)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems)
                                            .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);
            return menu.MenuItems.Where(m => m.Category == category).ToList();
        }
        public async Task<bool> UpdateImagesFromDb()
        {
            DirectoryInfo di = new DirectoryInfo(@"C:\Users\adoltu\Downloads\archive\Fast Food Classification V2\Train\Pizza");

            FileInfo[] Images = di.GetFiles("*.jpeg");

            for (int i = 0; i < _context.MenuItems.Count(); i++)
            {
                var existingMenuItem = _context.MenuItems.ElementAt(i);
                using (FileStream fs = Images[i].OpenRead())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await fs.CopyToAsync(memoryStream);
                        existingMenuItem.ProductImage = memoryStream.ToArray();
                    }
                }
            }
            await _context.SaveChangesAsync();
            return true;
        }

    }


}
