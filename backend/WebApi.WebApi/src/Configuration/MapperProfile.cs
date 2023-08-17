using AutoMapper;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.WebApi.src.Configuration
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserReadDto>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, User>();

            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();

            CreateMap<OrderProduct, OrderProductReadDto>();
            CreateMap<OrderProductCreateDto, OrderProduct>();
            CreateMap<OrderProductUpdateDto, OrderProduct>();
        }
    }
}