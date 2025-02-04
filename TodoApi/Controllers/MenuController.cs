using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMenu([FromForm] MenuInputDto menuDto)
        {
            byte[] image = null;
            if (menuDto.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await menuDto.Image.CopyToAsync(memoryStream);
                    image = memoryStream.ToArray();
                }
            }

            var menu = new Menu
            {
                RelatedRestaurant = menuDto.RelatedRestaurant,
                Image = image
            };

            var createdMenu = await _menuService.CreateMenuAsync(menu);
            return Ok(createdMenu);
        }

        [HttpPut("updateMenu/{relatedRestaurant}")]
        public async Task<IActionResult> UpdateMenu(string relatedRestaurant, [FromForm] MenuInputDto updatedMenu)
        {
            var result = await _menuService.UpdateMenuNameAsync(relatedRestaurant, updatedMenu);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
        [HttpPut("updateMenu/{relatedRestaurant}/{menuItemId}")]
        public async Task<IActionResult> UpdateMenuItem(string relatedRestaurant, string menuItemId, [FromForm] MenuItemInputDto updatedMenu)
        {
            var result = await _menuService.UpdateMenuItemAsync(relatedRestaurant, menuItemId, updatedMenu);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("{relatedRestaurant}/items")]
        public async Task<IActionResult> AddMenuItem(string relatedRestaurant, [FromForm] MenuItemInputDto menuItemDto)
        {
            byte[] productImage = null;
            if (menuItemDto.ProductImage != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await menuItemDto.ProductImage.CopyToAsync(memoryStream);
                    productImage = memoryStream.ToArray();
                }
            }

            var menuItem = new MenuItem
            {
                Name = menuItemDto.Name,
                Description = menuItemDto.Description,
                Price = menuItemDto.Price,
                ProductImage = productImage
            };

            var createdMenuItem = await _menuService.AddMenuItemAsync(menuItem, relatedRestaurant);
            if (createdMenuItem == null)
            {
                return NotFound();
            }

            return Ok(createdMenuItem);
        }



        [HttpDelete("{menuId}")]

        public async Task<IActionResult> DeleteMenu(string menuId)
        {
            var result = await _menuService.DeleteMenuAsync(menuId);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("items/{menuItemId}")]
        public async Task<IActionResult> DeleteMenuItem(string menuItemId)
        {
            var result = await _menuService.DeleteMenuItemAsync(menuItemId);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("{relatedRestaurant}")]
        public async Task<IActionResult> GetMenuByRestaurant(string relatedRestaurant)
        {
            var menu = await _menuService.GetMenuByRestaurantAsync(relatedRestaurant);
            if (menu == null)
            {
                return NotFound();
            }

            return Ok(menu);
        }

        [HttpGet("{relatedRestaurant}/items")]
        public async Task<IActionResult> GetMenuItemsByRestaurant(string relatedRestaurant)
        {
            var menuItems = await _menuService.GetMenuItemsByRestaurantAsync(relatedRestaurant);
            return Ok(menuItems);
        }

        [HttpGet("with-item-count")]
        public async Task<IActionResult> GetMenusWithItemCount()
        {
            var menusWithItemCount = await _menuService.GetMenusWithItemCountAsync();
            return Ok(menusWithItemCount);
        }

        [HttpGet("{relatedRestaurant}/categories")]

        public async Task<IActionResult> GetMenuCategoriesAsync(string relatedRestaurant)
        {

            var menuCategories = await _menuService.GetMenuCategoriesAsync(relatedRestaurant);

            return Ok(menuCategories);
        }

        [HttpGet("{relatedRestaurant}/{category}/items")]
        public async Task<IActionResult> GetMenuItemsByCategoryAsync(string relatedRestaurant, string category)
        {

            var menuCategoryItems = await _menuService.GetMenuItemsByCategoryAsync(relatedRestaurant, category);

            return Ok(menuCategoryItems);
        }

        [HttpGet("InsertPhotosInDB")]
        public async Task<IActionResult> UpdateImagesFromDb()
        {
            await _menuService.UpdateImagesFromDb();
            return Ok();
        }
    }


}
