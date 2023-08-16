using AutoMapper;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Shared;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Implementations
{
    public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
    {
        private readonly IUserRepo _userRepo;
        public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
        {
            _userRepo = userRepo;
        }

        public  async Task<UserReadDto> UpdatePassword(string id, string newPassword)
        {
            var foundUser = await _userRepo.GetOneById(id);
            if (foundUser is null)
            {
                // _baseRepo.DeleteOneById(foundItem);
                throw new Exception("Item not found");
            }
            return _mapper.Map<UserReadDto>(_userRepo.UpdatePassword(foundUser, newPassword));
        }

        public override async Task<UserReadDto> CreateOne(UserCreateDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashPassword, out var salt);
            entity.Password = hashPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateOne(entity);
            return _mapper.Map<UserReadDto>(created);
        }
    }
}