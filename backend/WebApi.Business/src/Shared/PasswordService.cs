using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Business.src.Shared
{
    public class PasswordService
    {
        public static void HashPassword(string originalPassword, out string HashPassword, out byte[] salt)
        {
            var hmac = new HMACSHA256();
            salt = hmac.Key;
            HashPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)).ToString();
        }

        public static bool VerifyPassword(string originalPassword, string hashedPassword, byte[] salt)
        {
           var hmac = new HMACSHA256(salt);
           var hashedOriginal = hmac.ComputeHash(Encoding.UTF8.GetBytes(originalPassword)).ToString();
           return hashedOriginal == hashedPassword;
        }
    }
}