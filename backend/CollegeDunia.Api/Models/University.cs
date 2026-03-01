namespace CollegeDunia.Api.Models;

public class University
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required string Location { get; set; }
    public required string Description { get; set; }
    public string Approvals { get; set; } = "UGC";
    public string? LogoUrl { get; set; }

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
