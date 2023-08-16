using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
       Task<UserReadDto> UpdatePassword(Guid id, string newPassword);

       Task<UserReadDto> CreateAdmin(UserCreateDto dto);
       // UserDto GetProfile(string id);
    }
}