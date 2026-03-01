"use client";

import { FormEvent, useState } from "react";
import { API_BASE_URL, Course } from "@/lib/api";

type LeadFormProps = {
  courses: Course[];
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  state: string;
  qualification: string;
  courseId: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  state: "",
  qualification: "",
  courseId: "",
};

export function LeadForm({ courses }: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "homepage",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit lead.");
      }

      setForm(initialState);
      setStatus("success");
      setMessage("Thanks. A counselor will contact you shortly.");
    } catch {
      setStatus("error");
      setMessage("Submission failed. Please try again.");
    }
  };

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <h2>Get Free Counseling</h2>
      <input
        type="text"
        placeholder="Full name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        required
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="State"
        required
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />
      <input
        type="text"
        placeholder="Qualification"
        required
        value={form.qualification}
        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
      />
      <select
        required
        value={form.courseId}
        onChange={(e) => setForm({ ...form, courseId: e.target.value })}
      >
        <option value="">Select course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name} {course.university ? `- ${course.university.name}` : ""}
          </option>
        ))}
      </select>

      <button disabled={status === "loading"} type="submit">
        {status === "loading" ? "Submitting..." : "Request Callback"}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
