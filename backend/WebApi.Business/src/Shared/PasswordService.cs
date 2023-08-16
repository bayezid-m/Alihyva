using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Business.src.Shared
{
    public class PasswordService
    {
        public static void HashPassword(string originalPassword, out string hashPassword, out byte[] salt)
        {
            var hmac = new HMACSHA256();
            salt = hmac.Key;
            hashPassword = Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)));
        }

        public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt)
        {
           var hmac = new HMACSHA256(salt);
           var hashedOriginal =  Encoding.UTF8.GetString(hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword))) ;
           return hashedOriginal == hashedPassword;
        }
    }
}