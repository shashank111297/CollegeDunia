export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export type Course = {
  id: string;
  name: string;
  slug: string;
  duration: string;
  feesFrom: number;
  eligibility: string;
  university: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type University = {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
  approvals: string;
  logoUrl: string | null;
};

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE_URL}/api/courses`, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

export async function getUniversities(): Promise<University[]> {
  const response = await fetch(`${API_BASE_URL}/api/universities`, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("Failed to fetch universities");
  }

  return response.json();
}
