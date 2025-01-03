using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public interface IMenuService
    {
        Task<Menu> CreateMenuAsync(Menu menu);
        Task<MenuItem> AddMenuItemAsync(MenuItem menuItem, string relatedRestaurant);
        Task<bool> DeleteMenuAsync(string menuId);
        Task<bool> DeleteMenuItemAsync(string menuItemId);
        Task<Menu> GetMenuByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<MenuItem>> GetMenuItemsByRestaurantAsync(string relatedRestaurant);
        Task<IEnumerable<object>> GetMenusWithItemCountAsync();
        Task<bool> UpdateMenuNameAsync(string relatedRestaurant, MenuInputDto updateRequest);
        Task<bool> UpdateMenuItemAsync(string relatedRestaurant, string menuItemId, MenuItemInputDto updateRequest);
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

        public async Task<bool> UpdateMenuNameAsync(string relatedRestaurant, MenuInputDto updateRequest)
        {
            var existingMenu = await _repository.GetMenuByRestaurantAsync(relatedRestaurant);
            if (existingMenu == null)
            {
                return false;
            }

            if (!string.IsNullOrWhiteSpace(updateRequest.RelatedRestaurant))
            {
                existingMenu.RelatedRestaurant = updateRequest.RelatedRestaurant;
            }

            if (updateRequest.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await updateRequest.Image.CopyToAsync(memoryStream);
                    existingMenu.Image = memoryStream.ToArray();
                }
            }


            await _repository.UpdateMenuAsync(existingMenu);
            return true;
        }
        public async Task<bool> UpdateMenuItemAsync(string relatedRestaurant, string menuItemId, MenuItemInputDto updateRequest)
        {
            var existingMenuItem = await _repository.GetMenuItemAsync(relatedRestaurant, menuItemId);
            if (existingMenuItem == null)
            {
                return false;
            }

            if (!string.IsNullOrWhiteSpace(updateRequest.Name))
            {
                existingMenuItem.Name = updateRequest.Name;
            }

            if (updateRequest.ProductImage != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await updateRequest.ProductImage.CopyToAsync(memoryStream);
                    existingMenuItem.ProductImage = memoryStream.ToArray();
                }
            }


            await _repository.UpdateMenuItemAsync(existingMenuItem);
            return true;
        }
        public Task<bool> DeleteMenuAsync(string menuId) => _repository.DeleteMenuAsync(menuId);

        public Task<bool> DeleteMenuItemAsync(string menuItemId) => _repository.DeleteMenuItemAsync(menuItemId);

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
