using AutoMapper;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Implementations
{
    public class UserService : BaseService<User, UserDto>, IUserService
    {
        private readonly IUserRepo _userRepo;
        public UserService(IUserRepo userRepo, IMapper mapper) : base(userRepo, mapper)
        {
            _userRepo = userRepo;
        }

        public UserDto UpdatePassword(string id, string newPassword)
        {
            var foundUser = _userRepo.GetOneById(id);
            if (foundUser is null)
            {
                // _baseRepo.DeleteOneById(foundItem);
                throw new Exception("Item not found");
            }
            return _mapper.Map<UserDto>(_userRepo.UpdatePassword(foundUser, newPassword));
        }
    }
}