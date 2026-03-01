import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { getCourses, getUniversities } from "@/lib/api";

export const dynamic = "force-dynamic";

const processSteps = [
  {
    title: "Share Your Profile",
    detail: "Tell us your course preference, budget, and education background.",
  },
  {
    title: "Compare Verified Options",
    detail: "Get shortlist recommendations based on approvals, fees, and outcomes.",
  },
  {
    title: "Apply With Counselor",
    detail: "Complete form filling, document checks, and admission support quickly.",
  },
  {
    title: "Start Learning",
    detail: "Join your selected university and begin classes with full onboarding help.",
  },
];

const testimonials = [
  {
    name: "Ankit Verma",
    city: "Lucknow",
    quote: "I compared 4 universities in one call. The team helped me finalize Online MBA in 2 days.",
  },
  {
    name: "Neha Sharma",
    city: "Delhi",
    quote: "The counselor explained fee EMI and eligibility clearly. The admission process was smooth.",
  },
  {
    name: "Rishabh Jain",
    city: "Jaipur",
    quote: "I was confused between BBA and BCA. Their career mapping gave me confidence to choose.",
  },
];

const blogLinks = [
  {
    title: "Top Online MBA Colleges in India 2026",
    href: "/blog/top-online-mba-colleges-india-2026",
  },
  {
    title: "Distance BBA vs Regular BBA: Which Is Better?",
    href: "/blog/distance-bba-vs-regular-bba",
  },
  {
    title: "UGC Approved Universities: How to Verify",
    href: "/blog/ugc-approved-university-checklist",
  },
];

const faqs = [
  {
    q: "Is an online degree valid for jobs and higher studies?",
    a: "Yes, if the university and program are approved by the right regulatory bodies.",
  },
  {
    q: "How much does online MBA usually cost?",
    a: "Most programs range from around Rs. 80,000 to Rs. 2,00,000 depending on university and format.",
  },
  {
    q: "Do you charge students for counseling?",
    a: "No. Counseling and comparison support are free for students on this portal.",
  },
];

export default async function HomePage() {
  const [courses, universities] = await Promise.all([getCourses(), getUniversities()]);

  return (
    <main>
      <header className="topbar">
        <div className="shell topbar-inner">
          <Link className="brand" href="/">
            CollegeDunia Advisor
          </Link>
          <nav>
            <a href="#universities">Universities</a>
            <a href="#courses">Courses</a>
            <a href="#process">How It Works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="cta-mini" href="#lead-form">
            Request Callback
          </a>
        </div>
      </header>

      <section className="hero-wrap">
        <div className="shell hero">
          <div className="hero-copy">
            <p className="eyebrow">Admissions Open 2026</p>
            <h1>Find The Right Online University Without Guesswork</h1>
            <p className="hero-text">
              Compare UGC-approved universities, understand fees and eligibility, and get expert admission support
              in one place.
            </p>
            <div className="hero-points">
              <span>150+ Programs</span>
              <span>Free Career Counseling</span>
              <span>Fast Admission Assistance</span>
            </div>
          </div>
          <div id="lead-form">
            <LeadForm courses={courses} />
          </div>
        </div>
      </section>

      <section className="shell stats-strip">
        <article>
          <strong>20,000+</strong>
          <p>Students guided</p>
        </article>
        <article>
          <strong>50+</strong>
          <p>Partner universities</p>
        </article>
        <article>
          <strong>98%</strong>
          <p>Form response rate</p>
        </article>
        <article>
          <strong>10 min</strong>
          <p>Average callback time</p>
        </article>
      </section>

      <section id="universities" className="shell section-gap">
        <div className="section-head">
          <h2>Top Universities</h2>
          <p>Explore trusted online and distance-learning institutions with detailed comparisons.</p>
        </div>
        <div className="card-grid">
          {universities.map((university) => (
            <article key={university.id} className="portal-card">
              <p className="tag">Featured</p>
              <h3>{university.name}</h3>
              <p>{university.location}</p>
              <p>{university.approvals}</p>
              <Link href={`/universities/${university.slug}`}>View university profile</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="courses" className="shell section-gap">
        <div className="section-head">
          <h2>Popular Courses</h2>
          <p>Choose from career-focused programs with flexible schedules and affordable fee options.</p>
        </div>
        <div className="card-grid">
          {courses.map((course) => (
            <article key={course.id} className="portal-card">
              <h3>{course.name}</h3>
              <p>Duration: {course.duration}</p>
              <p>Eligibility: {course.eligibility}</p>
              <p>Fees from Rs. {course.feesFrom.toLocaleString("en-IN")}</p>
              <Link href={`/courses/${course.slug}`}>Explore course details</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="shell section-gap">
        <div className="section-head">
          <h2>How Admission Support Works</h2>
          <p>Simple 4-step process from counseling to final enrollment.</p>
        </div>
        <div className="step-grid">
          {processSteps.map((step, index) => (
            <article key={step.title} className="step-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-wrap">
        <div className="shell section-gap">
          <div className="section-head">
            <h2>Student Stories</h2>
            <p>Real experiences from learners who took admission through our counseling support.</p>
          </div>
          <div className="card-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="portal-card quote-card">
                <p>"{testimonial.quote}"</p>
                <h3>{testimonial.name}</h3>
                <small>{testimonial.city}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-gap">
        <div className="section-head">
          <h2>Latest Guides</h2>
          <p>Read updated admission insights, fee guides, and career decision articles.</p>
        </div>
        <div className="card-grid">
          {blogLinks.map((blog) => (
            <article key={blog.href} className="portal-card">
              <h3>{blog.title}</h3>
              <Link href={blog.href}>Read guide</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="shell section-gap">
        <div className="section-head">
          <h2>Frequently Asked Questions</h2>
          <p>Answers to common student queries before admission.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <p>CollegeDunia Advisor</p>
          <small>
            We are an independent education counseling platform and not the official website of any university.
          </small>
        </div>
      </footer>
    </main>
  );
}
