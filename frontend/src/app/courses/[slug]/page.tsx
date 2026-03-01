import { notFound } from "next/navigation";
import { getCourses } from "@/lib/api";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const courses = await getCourses();
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="shell section-gap">
      <section className="portal-card">
        <h1>{course.name}</h1>
        <p>Duration: {course.duration}</p>
        <p>Fees starts at Rs. {course.feesFrom.toLocaleString("en-IN")}</p>
        <p>Eligibility: {course.eligibility}</p>
        <p>University: {course.university?.name ?? "TBA"}</p>
      </section>
    </main>
  );
}
