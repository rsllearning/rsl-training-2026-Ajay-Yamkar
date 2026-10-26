import { Suspense } from "react";

import Link from "next/link";

import { FolderKanban, ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/projects";

import { Eyebrow, Progress, StatusBadge, AvatarStack } from "@/components/ui";

import ProjectSearch from "@/components/project-search";
function ProjectResults({
  search,
  status,
}: {
  search: string;
  status: string;
}) {
  const filtered = projects.filter(
    (p) =>
      (!search ||
        `${p.name} ${p.description} ${p.category}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (!status ||
        status === "all" ||
        p.status.toLowerCase().replace(" ", "-") === status),
  );

  return (
    <>
      <div className="results-count">
        Showing <strong>{filtered.length}</strong> of {projects.length} projects
      </div>
      {filtered.length ? (
        <div className="project-grid">
          {filtered.map((p, i) => (
            <Link
              href={`/projects/${p.id}`}
              className="project-card"
              key={p.id}
            >
              <div className="card-top">
                <div
                  className={`project-symbol ${i % 3 === 1 ? "green" : i % 3 === 2 ? "orange" : ""}`}
                >
                  <FolderKanban size={20} />
                </div>
                <StatusBadge status={p.status} />
              </div>
              <h3>{p.name}</h3>
              <p className="description">{p.description}</p>
              <div className="progress-head">
                <span>Project progress</span>
                <strong>{p.progress}%</strong>
              </div>
              <Progress value={p.progress} />
              <div className="card-bottom">
                <AvatarStack names={p.team} />
                <span className="card-due">Due {p.dueDate}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="project-symbol">
            <FolderKanban size={22} />
          </div>
          <h2>No projects found</h2>
          <p>Try a different search term or status filter.</p>
          <Link className="secondary-button" href="/projects">
            Clear filters
          </Link>
        </div>
      )}
    </>
  );
}
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const status = params.status || "all";
  return (
    <>
      <div className="page-heading">
        <div>
          <Eyebrow>Your portfolio</Eyebrow>
          <h1>Projects</h1>
          <p>All the work your team is moving forward, in one place.</p>
        </div>
        <div className="project-symbol">
          <FolderKanban size={23} />
        </div>
      </div>
      <Suspense fallback={<div className="skeleton" />}>
        <ProjectSearch />
      </Suspense>
      <ProjectResults search={search} status={status} />
      <p className="muted" style={{ fontSize: 11, marginTop: 24 }}>
        Tip: filters are stored in the URL, so you can share a filtered view
        with your team.{" "}
        <ArrowUpRight size={12} style={{ verticalAlign: "middle" }} />
      </p>
    </>
  );
}
