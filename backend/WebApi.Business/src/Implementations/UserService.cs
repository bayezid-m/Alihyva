using System.IdentityModel.Tokens.Jwt;
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

        public async Task<UserReadDto> UpdatePassword(Guid id, string newPassword)
        {
            var foundUser = await _userRepo.GetOneById(id);
            if (foundUser is null)
            {
                // _baseRepo.DeleteOneById(foundItem);
                throw new Exception("Item not found");
            }
            PasswordService.HashPassword(newPassword, out var hashedPassword, out var salt);
            foundUser.Password = hashedPassword;
            foundUser.Salt = salt;
            return _mapper.Map<UserReadDto>(await _userRepo.UpdatePassword(foundUser));
        }

        public override async Task<UserReadDto> CreateOne(UserCreateDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateOne(entity);
            return _mapper.Map<UserReadDto>(created);
        }

        public async Task<UserReadDto> CreateAdmin(UserCreateDto dto)
        {
            var entity = _mapper.Map<User>(dto);
            PasswordService.HashPassword(dto.Password, out var hashedPassword, out var salt);
            entity.Password = hashedPassword;
            entity.Salt = salt;
            var created = await _userRepo.CreateAdmin(entity);
            return _mapper.Map<UserReadDto>(created);
        }
             public async Task<UserReadDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepo.FindOneByEmail(email);
            var readUserDto = _mapper.Map<UserReadDto>(user);
            return readUserDto;
        }
    }
}