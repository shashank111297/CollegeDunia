namespace CollegeDunia.Api.Models;

public class Lead
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string Phone { get; set; }
    public required string Email { get; set; }
    public required string State { get; set; }
    public required string Qualification { get; set; }
    public string Source { get; set; } = "website";
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public Guid CourseId { get; set; }
    public Course? Course { get; set; }

    public string? AssignedTo { get; set; }
}
