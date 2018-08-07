using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SIDIMSLite.Api.Models;
using SIDIMSLite.Api.Models.Account;
using SIDIMSLite.Api.Persistence.Configuration;

namespace SIDIMSLite.Api.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.RemovePluralizingTableNameConvention();

            modelBuilder.Entity<RefreshToken>()
                .HasAlternateKey(c => c.UserId)
                .HasName("refreshToken_UserId");
            modelBuilder.Entity<RefreshToken>()
                .HasAlternateKey(c => c.Token)
                .HasName("refreshToken_Token");

            base.OnModelCreating(modelBuilder);
        }

        ///Account Sections
        public DbSet<Client> Clients { get; set; }
        public DbSet<Audience> Audiences { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        ///Lookups
        public DbSet<ClientUser> ClientUsers { get; set; }
        public DbSet<SidClient> SidClients { get; set; }

        public void InsertNew(RefreshToken token)
        {
            var tokenModel = RefreshTokens.SingleOrDefault(i => i.UserId == token.UserId);
            if (tokenModel != null)
            {
                RefreshTokens.Remove(tokenModel);
                SaveChanges();
            }
            RefreshTokens.Add(token);
            SaveChanges();
        }


    }
}