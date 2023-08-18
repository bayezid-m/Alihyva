namespace WebApi.Domain.src.Entities
{
    public class Product : BaseEntityId
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Inventory { get; set; }
        public float Price { get; set; }
        public string Category { get; set; }
       // public List<Image> Images { get; set; }
        public string[] url { get; set; }
    }
}