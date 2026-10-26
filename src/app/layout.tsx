import type { Metadata } from "next";

import "./globals.css";

import AppShell from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Orbit · Project Explorer",
  description: "A clear, collaborative home for your projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
