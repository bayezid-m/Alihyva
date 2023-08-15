namespace WebApi.Domain.src.Entities
{
    public class OrderProduct : BaseEntity
    {
        public Order OrderId { get; set; }
        public Product Product { get; set; }
        public int Amount { get; set; } 
    }
}