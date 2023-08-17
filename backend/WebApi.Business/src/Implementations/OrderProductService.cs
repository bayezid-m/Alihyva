using AutoMapper;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Implementations
{
     public class OrderProductService : BaseService<OrderProduct, OrderProductReadDto, OrderProductCreateDto, OrderProductUpdateDto>, IOrderProductService
    {
        private readonly IOrderProductRepo _orderProductRepo;
        private readonly IProductRepo _productRepo;
        private readonly IOrderRepo _orderRepo;
        public OrderProductService(IOrderProductRepo orderProductRepo, IOrderRepo orderRepository, IProductRepo productRepository, IMapper mapper) : base(orderProductRepo, mapper)
        {
            _orderProductRepo = orderProductRepo;
            _productRepo = productRepository;
            _orderRepo = orderRepository;
        }

        public async Task<OrderProduct> CreateOrderProduct(OrderProduct entity)
        {
            var product = await _productRepo.GetOneById(entity.Product.Id);

            var createdOrderProduct = await _orderProductRepo.CreateOne(entity);
            
            return createdOrderProduct;
        }

        public override async Task<OrderProductReadDto> CreateOne(OrderProductCreateDto dto)
        {
            var orderProduct = _mapper.Map<OrderProduct>(dto);
            var product = await _productRepo.GetOneById(dto.ProductId);

            if (product == null || product.Inventory < dto.Amount) {
                throw new Exception("Product not available");
            }
            return _mapper.Map<OrderProductReadDto>(await _orderProductRepo.CreateOne(orderProduct));   
        }
    }
}