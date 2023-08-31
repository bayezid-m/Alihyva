
using AutoMapper;
using Moq;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Implementations;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;
using Xunit;

namespace WebApi.Testing.src
{
    public class ProductServiceTest
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }
        [Fact]
        public async Task CreateOne_ShouldCreateProductAndReturnMappedDto()
        {
            var productCreateDto = new ProductCreateDto
            {
                Title = "New Product 1",
                Description = "Very Good Product",
                Price = 20.00f,
                Inventory = 5,
                Category = "Cloth",
                url = {}
            };

            var product = new Product
            {
                Id = Guid.NewGuid(),
                Title = "New Product 1",
                Description = "Very Good Product",
                Price = 20.00f,
                Inventory = 5,
                Category = "Cloth",
                url = {}
            };

            var createdProductReadDto = new ProductReadDto
            {
                Id = product.Id,
                Title = "New Product 1",
                Description = "Very Good Product",
                Price = 20.00f,
                Inventory = 5,
                Category = "Cloth",
                url = {}
            };

            var mapperMock = new Mock<IMapper>();
            mapperMock.Setup(m => m.Map<Product>(It.IsAny<ProductCreateDto>()))
                      .Returns(product);
            mapperMock.Setup(m => m.Map<ProductReadDto>(It.IsAny<Product>()))
                      .Returns(createdProductReadDto);

            var productRepoMock = new Mock<IProductRepo>();
            productRepoMock.Setup(repo => repo.CreateOne(It.IsAny<Product>()))
                           .ReturnsAsync(product);

            var productService = new ProductService(
                productRepoMock.Object,
                mapperMock.Object
            );

            var result = await productService.CreateOne(productCreateDto);

            Assert.NotNull(result);
            Assert.Equal(createdProductReadDto.Id, result.Id);
            Assert.Equal(createdProductReadDto.Title, result.Title);
            Assert.Equal(createdProductReadDto.Description, result.Description);
            Assert.Equal(createdProductReadDto.Price, result.Price);

            mapperMock.Verify(m => m.Map<Product>(productCreateDto), Times.Once);
            productRepoMock.Verify(repo => repo.CreateOne(product), Times.Once);
            mapperMock.Verify(m => m.Map<ProductReadDto>(product), Times.Once);
        }
    }
}