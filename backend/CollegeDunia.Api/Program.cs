using CollegeDunia.Api.Contracts;
using CollegeDunia.Api.Data;
using CollegeDunia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CollegeDunia.Api;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args) ;

        var dbProvider = (builder.Configuration["DatabaseProvider"] ?? "sqlite").ToLowerInvariant();
        if (dbProvider == "postgres")
        {
            var postgresConnection = builder.Configuration.GetConnectionString("PostgresConnection")
                ?? "Host=localhost;Port=5432;Database=collegedunia_mvp;Username=postgres;Password=postgres";
            builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(postgresConnection));
        }
        else
        {
            var sqliteConnection = builder.Configuration.GetConnectionString("SqliteConnection")
                ?? "Data Source=collegedunia.db";
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(sqliteConnection));
        }
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("frontend", policy =>
            {
                var allowedOrigin = builder.Configuration["FrontendUrl"] ?? "http://localhost:3000";
                policy.WithOrigins(allowedOrigin).AllowAnyHeader().AllowAnyMethod();
            });
        });

        var app = builder.Build();

        app.UseCors("frontend");

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await db.Database.EnsureCreatedAsync();
            await SeedData.EnsureSeededAsync(db);
        }

        app.MapGet("/api/health", () => Results.Ok(new { status = "ok", timestamp = DateTimeOffset.UtcNow }));

        app.MapGet("/api/courses", async (AppDbContext db) =>
        {
            var courses = await db.Courses
                .AsNoTracking()
                .Include(x => x.University)
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Slug,
                    x.Duration,
                    x.FeesFrom,
                    x.Eligibility,
                    University = x.University == null ? null : new { x.University.Id, x.University.Name, x.University.Slug }
                })
                .ToListAsync();

            return Results.Ok(courses);
        });

        app.MapGet("/api/universities", async (AppDbContext db) =>
        {
            var universities = await db.Universities
                .AsNoTracking()
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Slug,
                    x.Location,
                    x.Description,
                    x.Approvals,
                    x.LogoUrl
                })
                .ToListAsync();

            return Results.Ok(universities);
        });

        app.MapPost("/api/leads", async (CreateLeadRequest request, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Phone) ||
                string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.State) ||
                string.IsNullOrWhiteSpace(request.Qualification))
            {
                return Results.BadRequest(new { message = "All required fields must be provided." });
            }

            var courseExists = await db.Courses.AnyAsync(x => x.Id == request.CourseId);
            if (!courseExists)
            {
                return Results.BadRequest(new { message = "Selected course is invalid." });
            }

            var lead = new Lead
            {
                Name = request.Name.Trim(),
                Phone = request.Phone.Trim(),
                Email = request.Email.Trim(),
                State = request.State.Trim(),
                Qualification = request.Qualification.Trim(),
                CourseId = request.CourseId,
                Source = string.IsNullOrWhiteSpace(request.Source) ? "website" : request.Source.Trim()
            };

            await db.Leads.AddAsync(lead);
            await db.SaveChangesAsync();

            return Results.Created($"/api/leads/{lead.Id}", new { lead.Id, lead.CreatedAt });
        });

        app.MapGet("/api/leads", async (HttpContext context, AppDbContext db, IConfiguration config) =>
        {
            var apiKey = context.Request.Headers["x-admin-key"].FirstOrDefault();
            var expectedKey = config["AdminApiKey"];

            if (string.IsNullOrWhiteSpace(expectedKey) || apiKey != expectedKey)
            {
                return Results.Unauthorized();
            }

            var leads = await db.Leads
                .AsNoTracking()
                .Include(x => x.Course)
                .OrderByDescending(x => x.CreatedAt)
                .Take(200)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.Phone,
                    x.Email,
                    x.State,
                    x.Qualification,
                    x.Source,
                    x.CreatedAt,
                    Course = x.Course == null ? null : x.Course.Name
                })
                .ToListAsync();

            return Results.Ok(leads);
        });

        await app.RunAsync();
    }
}
