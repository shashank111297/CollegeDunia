using CollegeDunia.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CollegeDunia.Api.Data;

public static class SeedData
{
    public static async Task EnsureSeededAsync(AppDbContext dbContext)
    {
        if (await dbContext.Universities.AnyAsync())
        {
            return;
        }

        var amity = new University
        {
            Name = "Amity University Online",
            Slug = "amity-university-distance",
            Location = "Noida, Uttar Pradesh",
            Description = "UGC-entitled online programs for working professionals.",
            Approvals = "UGC, AICTE, NAAC A+"
        };

        var manipal = new University
        {
            Name = "Manipal University Jaipur Online",
            Slug = "manipal-university-jaipur-online",
            Location = "Jaipur, Rajasthan",
            Description = "Online UG and PG degree programs with flexible schedules.",
            Approvals = "UGC, NAAC A+"
        };

        var courses = new List<Course>
        {
            new()
            {
                Name = "Online MBA",
                Slug = "mba-distance",
                Duration = "2 Years",
                FeesFrom = 130000,
                Eligibility = "Graduation with 50%",
                University = amity
            },
            new()
            {
                Name = "Online BBA",
                Slug = "bba-distance",
                Duration = "3 Years",
                FeesFrom = 90000,
                Eligibility = "10+2 from recognized board",
                University = manipal
            }
        };

        await dbContext.Universities.AddRangeAsync(amity, manipal);
        await dbContext.Courses.AddRangeAsync(courses);
        await dbContext.SaveChangesAsync();
    }
}
