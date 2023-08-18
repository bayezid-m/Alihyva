using AutoMapper;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Implementations
{
    public class ProductService : BaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>, IProductService
    {
        private readonly IProductRepo _productRepo;
        public ProductService(IProductRepo productRepo, IMapper mapper) : base(productRepo, mapper)
        {
            _productRepo = productRepo;
        }
        public override async Task<ProductReadDto> CreateOne(ProductCreateDto dto)
        {
            var product = _mapper.Map<Product>(dto);
            // foreach (var image in product.Images)
            // {
            //     image.Id = Guid.NewGuid();
            // }

            var createdProduct = await _productRepo.CreateOne(product);
            return _mapper.Map<ProductReadDto>(createdProduct);
        }
        public virtual async Task<ProductReadDto> UpdateOneById(Guid id, ProductUpdateDto updated)
        {
            var foundItem = await _productRepo.GetOneById(id);
            if (foundItem is null)
            {
                throw new Exception("Item not found");
            }

            foundItem.Title = updated.Title;
            foundItem.Description = updated.Description;
            foundItem.Price = updated.Price;
            foundItem.Inventory = updated.Inventory;
            foundItem.Category = updated.Category;

            var updatedEntity = await _productRepo.UpdateOneById(foundItem);

            return _mapper.Map<ProductReadDto>(updatedEntity);
        }
    }
}