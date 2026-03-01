import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CollegeDunia Advisor",
  description: "Compare online universities and get free admission counseling",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
