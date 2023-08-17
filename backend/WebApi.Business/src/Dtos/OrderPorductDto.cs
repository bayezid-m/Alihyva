namespace WebApi.Business.src.Dtos
{
      public class OrderProductReadDto
    {
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductCreateDto
    {
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
    public class OrderProductUpdateDto
    {
        public Guid ProductId { get; set; }
        public int Amount { get; set; }
    }
}