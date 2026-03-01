import { notFound } from "next/navigation";
import { getUniversities } from "@/lib/api";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UniversityPage({ params }: PageProps) {
  const { slug } = await params;
  const universities = await getUniversities();
  const university = universities.find((item) => item.slug === slug);

  if (!university) {
    notFound();
  }

  return (
    <main className="shell section-gap">
      <section className="portal-card">
        <h1>{university.name}</h1>
        <p>{university.location}</p>
        <p>{university.description}</p>
        <p>Approvals: {university.approvals}</p>
      </section>
    </main>
  );
}
