namespace CollegeDunia.Api.Models;

public class Course
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required string Duration { get; set; }
    public decimal FeesFrom { get; set; }
    public required string Eligibility { get; set; }

    public Guid UniversityId { get; set; }
    public University? University { get; set; }

    public ICollection<Lead> Leads { get; set; } = new List<Lead>();
}
