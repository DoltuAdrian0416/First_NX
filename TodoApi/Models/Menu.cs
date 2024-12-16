using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public string RelatedRestaurant { get; set; }
        public byte[] Image { get; set; }
        public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }

    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public byte[] ProductImage { get; set; }

        [ForeignKey("Id")]

        public int MenuId { get; set; }
        [JsonIgnore]
        public virtual Menu Menu { get; set; }
    }
}
