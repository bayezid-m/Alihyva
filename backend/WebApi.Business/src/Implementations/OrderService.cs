using AutoMapper;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Implementations
{
    public class OrderService : BaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>, IOrderService
    {
        private readonly IOrderRepo _orderRepo;
        private readonly IUserRepo _userRepo;
        private readonly IOrderProductService _orderProductService;
        private readonly IProductRepo _productRepo;
        private readonly IOrderProductRepo _orderProductRepo;

        public OrderService(IOrderRepo orderRepo, IUserRepo userRepository, IOrderProductService orderProductService, 
        IProductRepo productRepository, IOrderProductRepo orderProductRepository, IMapper mapper ) : base(orderRepo, mapper)
        {
            _orderRepo = orderRepo;
            _userRepo = userRepository;
            _orderProductService = orderProductService;
            _productRepo = productRepository;
            _orderProductRepo = orderProductRepository;
        }


        public override async Task<OrderReadDto> CreateOne(OrderCreateDto entity)
        {
            var user = await _userRepo.GetOneById(entity.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            
            var order = new Order
            {
                User = user,
                Status = OrderStatus.Pending,
                OrderProducts = new List<OrderProduct>()
            };

            var createdOrder = await _orderRepo.CreateOne(order);

            var orderProducts = _mapper.Map<List<OrderProduct>>(entity.OrderProducts);

            for(int i = 0; i < orderProducts.Count(); i++ ) {
                var orderProductAtCurrentIndex = orderProducts.ElementAt(i);
                orderProductAtCurrentIndex.Order = createdOrder;
                orderProductAtCurrentIndex.Product = await _productRepo.GetOneById(entity.OrderProducts.ElementAt(i).ProductId);

                await _orderProductService.CreateOrderProduct(orderProductAtCurrentIndex);
            }

            var orderReadDto = new OrderReadDto {
                UserId = order.User.Id,
                Status = order.Status,
                OrderProducts = _mapper.Map<List<OrderProductReadDto>>(order.OrderProducts)
            };

            return orderReadDto;
        }
    }
}