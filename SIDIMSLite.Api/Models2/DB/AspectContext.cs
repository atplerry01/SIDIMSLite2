using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class AspectContext : DbContext
    {
        public AspectContext()
        {
        }

        public AspectContext(DbContextOptions<AspectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AddressBook> AddressBook { get; set; }
        public virtual DbSet<AuditUsers> AuditUsers { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Clients> Clients { get; set; }
        public virtual DbSet<Mis> Mis { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<Operations> Operations { get; set; }
        public virtual DbSet<RaisedJobs> RaisedJobs { get; set; }
        public virtual DbSet<Stock> Stock { get; set; }

        // Unable to generate entity type for table 'dbo.Directories'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.FileZilla'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.StatusHistory'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Stock_Batch'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Status'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MX'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Issues'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.JobCard'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.DeliveryNotes'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.ErrorLog'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MIS_Waste'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.StockImage'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.CS'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Drivers'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Jobs'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Users'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Mockup'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MockupImage'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.Issuance'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.customerName'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.SHA1'. Please see the warning messages.
        // Unable to generate entity type for table 'dbo.MXBadSetup'. Please see the warning messages.

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
            modelBuilder.Entity<AddressBook>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Address1)
                    .IsRequired()
                    .HasColumnName("Address 1")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Address2)
                    .IsRequired()
                    .HasColumnName("Address 2")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Attention)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ClientId).HasColumnName("ClientID");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Phone)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AuditUsers>(entity =>
            {
                entity.HasKey(e => e.Username);

                entity.ToTable("Audit_users");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.Fullname)
                    .HasColumnName("fullname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pword)
                    .HasColumnName("pword")
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.UserLevel)
                    .HasColumnName("user_level")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Item)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

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

                entity.Property(e => e.Operation)
                    .HasMaxLength(100)
                    .IsUnicode(false);

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

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .IsUnicode(false);
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

            modelBuilder.Entity<RaisedJobs>(entity =>
            {
                entity.HasKey(e => e.FileName);

                entity.Property(e => e.FileName)
                    .HasColumnName("fileName")
                    .HasMaxLength(120)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.AuditId).HasColumnName("Audit_id");

                entity.Property(e => e.CardType)
                    .HasColumnName("cardType")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerName)
                    .HasColumnName("customerName")
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Delivery)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Issuance)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Perso)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Qa)
                    .HasColumnName("QA")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Qc)
                    .HasColumnName("QC")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Quantity)
                    .HasColumnName("quantity")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.RaisedBy)
                    .HasColumnName("raisedBy")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RaisedTime)
                    .HasColumnName("raisedTime")
                    .HasColumnType("datetime");

                entity.Property(e => e.ReceuveBy)
                    .HasColumnName("receuveBy")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Remarks)
                    .HasColumnName("remarks")
                    .IsUnicode(false);

                entity.Property(e => e.UploadTime)
                    .HasColumnName("uploadTime")
                    .HasMaxLength(50)
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
