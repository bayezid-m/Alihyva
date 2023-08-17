using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Implementations;
using WebApi.Business.src.Shared;
using WebApi.Domain.src.Abstractions;
using WebApi.WebApi.MiddleWare;
using WebApi.WebApi.src.Database;
using WebApi.WebApi.src.RepoImplementations;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //automapper dependency injections
        builder.Services.AddAutoMapper(typeof(Program).Assembly);

        //Database context
        builder.Services.AddDbContext<DatabaseContext>();

        //Service DI
        builder.Services
        .AddScoped<IUserRepo, UserRepo>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IAuthService, AuthService>()
        .AddScoped<IProductRepo, ProductRepo>()
        .AddScoped<IProductService, ProductService>()
        .AddScoped<IOrderRepo, OrderRepo>()
        .AddScoped<IOrderService, OrderService>()
        .AddScoped<IOrderProductRepo, OrderProductRepo>()
        .AddScoped<IOrderProductService, OrderProductService>();

        builder.Services.AddSingleton<ErrorHandlerMW>();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Description = "Bearer token authentication",
                Name = "Authentication",
                In = ParameterLocation.Header
            });
            options.OperationFilter<SecurityRequirementsOperationFilter>();
        });

        //config route
        builder.Services.Configure<RouteOptions>(optuions =>
        {
            optuions.LowercaseUrls = true;
        });

        //config the authentication
        builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "fullstack-backend",
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("security-key-is-here-forbackendserver")),
                ValidateIssuerSigningKey = true,
            };
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors();

        app.UseHttpsRedirection();

        app.UseMiddleware<ErrorHandlerMW>();

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}