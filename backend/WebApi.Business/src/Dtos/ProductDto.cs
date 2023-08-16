using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Dtos
{
    public class ProductReadDto
    {
         public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
    }
      public class ProductCreateDto
    {
         public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
    }
      public class ProductUpdateDto
    {
         public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public List<Image> Images { get; set; }
    }
}