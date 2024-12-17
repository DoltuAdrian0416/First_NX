namespace TodoApi.Models
{
    public class MenuInputDto
    {
        public string Description { get; set; }
        public string RelatedRestaurant { get; set; }
        public IFormFile Image { get; set; }
    }

    public class MenuItemInputDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public IFormFile ProductImage { get; set; }
        public int MenuId { get; set; }
    }
}
