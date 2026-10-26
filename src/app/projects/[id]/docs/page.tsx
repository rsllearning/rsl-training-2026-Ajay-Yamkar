import Link from "next/link";

import { notFound } from "next/navigation";

import { FileText, ArrowRight } from "lucide-react";

import { getProject } from "@/lib/projects";

import { Eyebrow } from "@/components/ui";

export default async function DocsIndex({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();

  return (
    <>
      <Eyebrow>Knowledge base</Eyebrow>
      <h2>{p.name} documentation</h2>
      <p className="muted">
        Helpful references for getting started and working with this project.
      </p>
      <div className="content-card">
        {[
          {
            label: "Setup guide",
            slug: "setup",
            detail: "Local environment and prerequisites.",
          },
          {
            label: "Database configuration",
            slug: "setup/database",
            detail: "Connection settings and schema basics.",
          },
          {
            label: "Troubleshooting",
            slug: "troubleshooting",
            detail: "Common issues and resolutions.",
          },
        ].map((d) => (
          <Link
            href={`/projects/${id}/docs/${d.slug}`}
            className="activity-item"
            key={d.slug}
          >
            <div className="activity-icon">
              <FileText size={17} />
            </div>
            <div className="activity-copy">
              <strong>{d.label}</strong>
              <p>{d.detail}</p>
            </div>
            <ArrowRight size={16} />
          </Link>
        ))}
      </div>
    </>
  );
}
