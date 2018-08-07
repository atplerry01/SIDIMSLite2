using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SIDIMSLite.Api.Models
{
    public class AspectContext : DbContext
    {
        public AspectContext()
        {
        }

        public AspectContext(DbContextOptions<AspectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Clients> Clients { get; set; }
        public virtual DbSet<Mis> Mis { get; set; }

        public virtual DbSet<Stock> Stock { get; set; }
        public virtual DbSet<Operations> Operations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("server=192.168.1.27; database=Aspect; user id=sa; password=kolawole");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Clients>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Client)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Mis>(entity =>
            {
                entity.ToTable("MIS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Batch)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CardQuantity).HasColumnName("Card Quantity");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.ClosingBalance).HasColumnName("Closing Balance");

                entity.Property(e => e.DataGen)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DataQuantity)
                    .HasColumnName("Data Quantity")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FileName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Fulfillment)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OpeningStock).HasColumnName("Opening Stock");

                entity.Property(e => e.OperationId).HasColumnName("OperationID");

                entity.Property(e => e.OperationId2).HasColumnName("OperationID_2");

                entity.Property(e => e.Others)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Personalization)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PreviousDelivery).HasColumnName("Previous Delivery");

                entity.Property(e => e.Printing)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StockId).HasColumnName("StockID");
            });

            modelBuilder.Entity<Operations>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Operation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StockId).HasColumnName("StockID");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasMaxLength(500)
                    .IsUnicode(false);
            });


            modelBuilder.Entity<Stock>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AddressBookId).HasColumnName("AddressBookID");

                entity.Property(e => e.Atr)
                    .HasColumnName("ATR")
                    .IsUnicode(false);

                entity.Property(e => e.Batchnumber).IsUnicode(false);

                entity.Property(e => e.Bin).IsUnicode(false);

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Chip).IsUnicode(false);

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Kcv)
                    .HasColumnName("KCV")
                    .IsUnicode(false);

                entity.Property(e => e.Location).IsUnicode(false);

                entity.Property(e => e.Product).IsUnicode(false);

                entity.Property(e => e.ProductType).IsUnicode(false);
            });
        }
    }
}
