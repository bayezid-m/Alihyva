using Microsoft.EntityFrameworkCore;
using Npgsql;
using WebApi.Domain.src.Entities;

namespace WebApi.WebApi.src.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Image> Images { get; set; }

        public DatabaseContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }
        static DatabaseContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
            builder.MapEnum<Role>();
            optionsBuilder.AddInterceptors(new TimeStampIntercepter());
            optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<Role>();
            modelBuilder.Entity<OrderProduct>().HasKey("OrderId", "ProductId");
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}