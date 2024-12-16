using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public interface IMenuRepository
    {
        Task<Menu> CreateMenuAsync(Menu menu);
        Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant);
        Task<bool> DeleteMenuAsync(int menuId);
        Task<bool> DeleteMenuItemAsync(int menuItemId);
        Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<object>> GetMenusWithItemCountAsync();
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

        public async Task<bool> DeleteMenuAsync(int menuId)
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

        public async Task<bool> DeleteMenuItemAsync(int menuItemId)
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
            return await _context.Menus.FirstAsync(m => m.RelatedRestaurant == relatedRestaurant);
            ;
        }

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant)
        {
            var menu = await _context.Menus.Include(m => m.MenuItems)
                                            .FirstOrDefaultAsync(m => m.RelatedRestaurant == relatedRestaurant);

            return menu?.MenuItems ?? new List<MenuItem>();
        }

        public async Task<IEnumerable<object>> GetMenusWithItemCountAsync()
        {
            return await _context.Menus
                .Select(m => new
                {
                    MenuName = m.RelatedRestaurant,
                    ItemCount = m.MenuItems.Count
                })
                .ToListAsync();
        }


    }


}
