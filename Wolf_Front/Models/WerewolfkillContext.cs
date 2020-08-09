using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Wolf_Front.Models
{
    public partial class WerewolfkillContext : IdentityDbContext
    {
        public WerewolfkillContext()
        {
        }

        public WerewolfkillContext(DbContextOptions<WerewolfkillContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<GameRoom> GameRoom { get; set; }
        public virtual DbSet<Occupation> Occupation { get; set; }
        public virtual DbSet<Room> Room { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.ProviderKey).HasMaxLength(128);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.LoginProvider).HasMaxLength(128);

                entity.Property(e => e.Name).HasMaxLength(128);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.Pic).HasMaxLength(150);

                entity.Property(e => e.RoomId).HasColumnName("RoomID");

                entity.Property(e => e.TotalPlay).HasColumnName("total_play");

                entity.Property(e => e.UserName).HasMaxLength(256);

                entity.Property(e => e.Win).HasColumnName("win");
            });

            modelBuilder.Entity<GameRoom>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsAlive)
                    .HasColumnName("isAlive")
                    .HasMaxLength(10);

                entity.Property(e => e.Players).HasMaxLength(450);
            });

            modelBuilder.Entity<Occupation>(entity =>
            {
                entity.Property(e => e.Occupation_ID)
                    .HasColumnName("Occupation_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.About)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Occupation_GB)
                    .IsRequired()
                    .HasColumnName("Occupation_GB")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Occupation_Name)
                    .IsRequired()
                    .HasColumnName("Occupation_Name")
                    .HasMaxLength(3);

                entity.Property(e => e.Pic)
                    .IsRequired()
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.Property(e => e.RoomId)
                    .HasColumnName("RoomID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Player1)
                    .HasColumnName("player1")
                    .HasMaxLength(450);

                entity.Property(e => e.Player10)
                    .HasColumnName("player10")
                    .HasMaxLength(450);

                entity.Property(e => e.Player2)
                    .HasColumnName("player2")
                    .HasMaxLength(450);

                entity.Property(e => e.Player3)
                    .HasColumnName("player3")
                    .HasMaxLength(450);

                entity.Property(e => e.Player4)
                    .HasColumnName("player4")
                    .HasMaxLength(450);

                entity.Property(e => e.Player5)
                    .HasColumnName("player5")
                    .HasMaxLength(450);

                entity.Property(e => e.Player6)
                    .HasColumnName("player6")
                    .HasMaxLength(450);

                entity.Property(e => e.Player7)
                    .HasColumnName("player7")
                    .HasMaxLength(450);

                entity.Property(e => e.Player8)
                    .HasColumnName("player8")
                    .HasMaxLength(450);

                entity.Property(e => e.Player9)
                    .HasColumnName("player9")
                    .HasMaxLength(450);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
