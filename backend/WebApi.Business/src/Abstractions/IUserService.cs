using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Abstractions
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
       Task<UserReadDto> UpdatePassword(string id, string newPassword);
       // UserDto GetProfile(string id);
    }
}