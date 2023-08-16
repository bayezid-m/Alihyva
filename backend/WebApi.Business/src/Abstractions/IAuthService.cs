using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Business.src.Dtos;

namespace WebApi.Business.src.Abstractions
{
    public interface IAuthService
    {
        Task<string> VerifyCredentials(UserCredentialsDto credentials);
    }
}