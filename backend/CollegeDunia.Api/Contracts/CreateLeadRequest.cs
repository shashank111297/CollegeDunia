namespace CollegeDunia.Api.Contracts;

public record CreateLeadRequest(
    string Name,
    string Phone,
    string Email,
    string State,
    string Qualification,
    Guid CourseId,
    string? Source
);
