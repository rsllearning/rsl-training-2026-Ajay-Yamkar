import Link from "next/link";

import { notFound } from "next/navigation";

import {
  ArrowLeft,
  LayoutDashboard,
  Users,
  CheckSquare,
  Activity,
  FileText,
} from "lucide-react";

import { getProject } from "@/lib/projects";

import { StatusBadge, Progress, Eyebrow } from "@/components/ui";

const tabs = [
  { slug: "", label: "Overview", icon: LayoutDashboard },
  { slug: "team", label: "Team", icon: Users },
  { slug: "tasks", label: "Tasks", icon: CheckSquare },
  { slug: "activity", label: "Activity", icon: Activity },
];

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  return (
    <div>
      <Link href="/projects" className="text-link" style={{ marginBottom: 22 }}>
        <ArrowLeft size={15} /> Back to projects
      </Link>
      <div className="page-heading" style={{ marginTop: 20, marginBottom: 22 }}>
        <div>
          <Eyebrow>Project workspace</Eyebrow>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <div className="project-layout">
        <aside className="project-sidebar">
          <div className="sidebar-label">Project menu</div>
          {tabs.map(({ slug, label, icon: Icon }) => (
            <Link
              key={slug}
              href={`/projects/${id}${slug ? `/${slug}` : ""}`}
              className="project-side-link"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <Link
            href={`/projects/${id}/docs/setup`}
            className="project-side-link"
          >
            <FileText size={16} />
            Documentation
          </Link>
          <div className="content-card" style={{ marginTop: 20, padding: 15 }}>
            <div className="detail-label">Overall progress</div>
            <div
              style={{
                fontSize: 24,
                fontFamily: "Manrope",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {project.progress}%
            </div>
            <Progress value={project.progress} />
            <p className="muted" style={{ fontSize: 10, margin: "10px 0 0" }}>
              Target date: {project.dueDate}
            </p>
          </div>
        </aside>
        <section className="project-main">
          <div className="project-tabs">
            {tabs.map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/projects/${id}${slug ? `/${slug}` : ""}`}
                className="project-tab"
              >
                {label}
              </Link>
            ))}
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
