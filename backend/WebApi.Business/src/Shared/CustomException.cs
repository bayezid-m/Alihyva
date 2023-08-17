namespace WebApi.Business.src.Shared
{
    public class CustomException : Exception
    {
        public int StatusCode { get; set; } 
        public string ErrorMessage { get; set; }

        public CustomException(int statusCode = 500, string errorMessage ="Internal server error")
        {
            StatusCode = statusCode;
            ErrorMessage = errorMessage;
        } 
        public static CustomException NotFoundException(string message = "Item not found")
        {
            return new CustomException(404, message);
        }
    }
}