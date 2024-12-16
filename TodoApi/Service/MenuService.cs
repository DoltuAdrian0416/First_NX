using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public interface IMenuService
    {
        Task<Menu> CreateMenuAsync(Menu menu);
        Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant);
        Task<bool> DeleteMenuAsync(int menuId);
        Task<bool> DeleteMenuItemAsync(int menuItemId);
        Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<object>> GetMenusWithItemCountAsync();
    }
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _repository;

        public MenuService(IMenuRepository repository)
        {
            _repository = repository;
        }

        public Task<Menu> CreateMenuAsync(Menu menu) => _repository.CreateMenuAsync(menu);

        public Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant) =>
            _repository.AddMenuItemAsync(menuItem, relatedRestaurant);

        public Task<bool> DeleteMenuAsync(int menuId) => _repository.DeleteMenuAsync(menuId);

        public Task<bool> DeleteMenuItemAsync(int menuItemId) => _repository.DeleteMenuItemAsync(menuItemId);

        public Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant) =>
            _repository.GetMenuByRestaurantAsync(relatedRestaurant);

        public async Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant)
        {
            var menuItems = await _repository.GetMenuItemsByRestaurantAsync(relatedRestaurant);
            return menuItems ?? new List<MenuItem>();
        }

        public Task<IEnumerable<object>> GetMenusWithItemCountAsync() =>
            _repository.GetMenusWithItemCountAsync();
    }


}
