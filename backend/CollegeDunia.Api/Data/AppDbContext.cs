using CollegeDunia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CollegeDunia.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<University> Universities => Set<University>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Lead> Leads => Set<Lead>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<University>(entity =>
        {
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(200);
            entity.Property(x => x.Location).HasMaxLength(120);
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(150);
            entity.Property(x => x.Duration).HasMaxLength(60);
            entity.Property(x => x.Eligibility).HasMaxLength(200);
            entity.Property(x => x.FeesFrom).HasPrecision(10, 2);
        });

        modelBuilder.Entity<Lead>(entity =>
        {
            entity.Property(x => x.Name).HasMaxLength(120);
            entity.Property(x => x.Phone).HasMaxLength(20);
            entity.Property(x => x.Email).HasMaxLength(120);
            entity.Property(x => x.State).HasMaxLength(80);
            entity.Property(x => x.Qualification).HasMaxLength(80);
            entity.HasIndex(x => x.CreatedAt);
        });
    }
}
