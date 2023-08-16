using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;

namespace WebApi.Business.src.Shared
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _userRepo;
        public AuthService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }
        public async Task<string> VerifyCredentials(UserCredentialsDto credentials)
        {
            var foundUserByEmail = await _userRepo.FindOneByEmail(credentials.Email);
            var isAuthenticated = PasswordService.VerifyPassword(credentials.Password, foundUserByEmail.Password, foundUserByEmail.Salt);
            if (!isAuthenticated)
            {
                throw new Exception("Credentials do not match");
            }
            return GenerateToken(foundUserByEmail);
        }

        private string GenerateToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            var securityKey = new JsonWebKey("my-secrete-key");
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "fullstack-backend",
                Expires = DateTime.Now.AddMinutes(30),
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = signingCredentials
            };
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            return token.ToString();
        }
    }
}