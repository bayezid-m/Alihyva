using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Dtos
{
  public class ProductReadDto
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public float Price { get; set; }
    public int Inventory { get; set; }
    public string Category { get; set; }
    public string[] url { get; set; }
  }
  public class ProductCreateDto
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public float Price { get; set; }
    public int Inventory { get; set; }
    public string Category { get; set; }
    public string[] url { get; set; }

  }
  public class ProductUpdateDto
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public float Price { get; set; }
    public int Inventory { get; set; }
    public string Category { get; set; }
    public string[] url { get; set; }
  }
}