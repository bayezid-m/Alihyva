using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Dtos
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Avater { get; set; }
        public Role Role { get; set; }
    }
} 