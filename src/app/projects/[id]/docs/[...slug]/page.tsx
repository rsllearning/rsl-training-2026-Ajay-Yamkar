import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, ChevronRight } from "lucide-react";
import { getProject } from "@/lib/projects";
import { Eyebrow } from "@/components/ui";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ id: string; slug: string[] }>;
}) {
  const { id, slug } = await params;
  const p = getProject(id);
  if (!p) notFound();
  const path = slug.join("/");
  const title = slug[slug.length - 1]?.replace(/-/g, " ") || "Documentation";
  return (
    <>
      <div className="doc-breadcrumb">
        <Link href={`/projects/${id}`}>{p.name}</Link>{" "}
        <ChevronRight size={12} style={{ verticalAlign: "middle" }} />{" "}
        Documentation{" "}
        <ChevronRight size={12} style={{ verticalAlign: "middle" }} />{" "}
        <span>{title}</span>
      </div>
      <div className="content-card">
        <div className="project-symbol">
          <FileText size={21} />
        </div>
        <Eyebrow>Project documentation</Eyebrow>
        <h2 style={{ textTransform: "capitalize" }}>{title}</h2>
        <p className="muted">
          Documentation resource for {p.name}. Use this section to find setup
          instructions, project conventions, and technical references.
        </p>
        <div className="notice">
          <strong>Requested path:</strong>
          <br />
          <code>
            /projects/{id}/docs/{path}
          </code>
        </div>
        <h3 style={{ marginTop: 24 }}>In this guide</h3>
        <ul className="muted" style={{ lineHeight: 2 }}>
          <li>Prerequisites and access requirements</li>
          <li>Configuration and environment setup</li>
          <li>Validation and troubleshooting</li>
        </ul>
        <Link className="secondary-button" href={`/projects/${id}/docs/setup`}>
          View setup guide
        </Link>
      </div>
    </>
  );
}
