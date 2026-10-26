import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  FolderKanban,
  CheckCircle2,
  Clock3,
  Users,
  Sparkles,
} from "lucide-react";

import { projects } from "@/lib/projects";

import { Eyebrow, Progress, StatusBadge, AvatarStack } from "@/components/ui";

export default function HomePage() {
  const active = projects.filter((p) => p.status === "Active").length;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>Your work, in orbit</Eyebrow>
          <h1>Good things happen when teams move together.</h1>
          <p>
            One calm, clear space to see what’s moving, what needs attention,
            and what your team can make happen next.
          </p>
          <Link href="/dashboard" className="primary-button">
            Explore your workspace <ArrowRight size={16} />
          </Link>
        </div>
        <div className="hero-note">A little more clarity, every day ✦</div>
      </section>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            Total projects{" "}
            <span className="stat-icon">
              <FolderKanban size={17} />
            </span>
          </div>
          <div className="stat-number">
            {projects.length.toString().padStart(2, "0")}
          </div>
          <div className="stat-foot">
            <span className="positive">+2</span> added this month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Active projects{" "}
            <span className="stat-icon">
              <Clock3 size={17} />
            </span>
          </div>
          <div className="stat-number">
            {active.toString().padStart(2, "0")}
          </div>
          <div className="stat-foot">Across 4 workstreams</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Tasks completed{" "}
            <span className="stat-icon">
              <CheckCircle2 size={17} />
            </span>
          </div>
          <div className="stat-number">
            84<span style={{ fontSize: 14, color: "#8a8da0" }}> / 112</span>
          </div>
          <div className="stat-foot">
            <span className="positive">75%</span> completion rate
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Team members{" "}
            <span className="stat-icon">
              <Users size={17} />
            </span>
          </div>
          <div className="stat-number">18</div>
          <div className="stat-foot">Across all projects</div>
        </div>
      </div>
      <div className="section-title">
        <div>
          <Eyebrow>In progress</Eyebrow>
          <h2>Projects worth a look</h2>
        </div>
        <Link href="/projects" className="text-link">
          All projects <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="project-grid">
        {projects.slice(0, 3).map((p, i) => (
          <Link href={`/projects/${p.id}`} className="project-card" key={p.id}>
            <div className="card-top">
              <div
                className={`project-symbol ${i === 1 ? "green" : i === 2 ? "orange" : ""}`}
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
      <div style={{ marginTop: 22 }} className="notice">
        <Sparkles
          size={15}
          style={{ verticalAlign: "middle", marginRight: 7 }}
        />
        Your workspace is looking good. Take a moment to check in on projects
        that need a little extra attention.
      </div>
    </>
  );
}
