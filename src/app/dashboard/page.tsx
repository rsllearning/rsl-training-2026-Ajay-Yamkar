import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";
import { projects } from "@/lib/projects";
import { Eyebrow, StatusBadge, Progress } from "@/components/ui";
import SlowActivity from "@/components/slow-activity";
function ActivityFallback() {
  return (
    <div>
      {[1, 2, 3].map((n) => (
        <div className="skeleton" key={n} />
      ))}
    </div>
  );
}
export default function DashboardPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <Eyebrow>Monday, October 26, 2026</Eyebrow>
          <h1>Your dashboard</h1>
          <p>Here’s what’s happening across your workspace.</p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            Projects{" "}
            <span className="stat-icon">
              <FolderKanban size={17} />
            </span>
          </div>
          <div className="stat-number">{projects.length}</div>
          <div className="stat-foot">Across all workstreams</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Completed{" "}
            <span className="stat-icon">
              <CheckCircle2 size={17} />
            </span>
          </div>
          <div className="stat-number">
            {projects.filter((p) => p.status === "Completed").length}
          </div>
          <div className="stat-foot">Successfully delivered</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            At risk{" "}
            <span className="stat-icon">
              <Clock3 size={17} />
            </span>
          </div>
          <div className="stat-number">
            {projects.filter((p) => p.status === "At risk").length}
          </div>
          <div className="stat-foot">Needs a closer look</div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Contributors{" "}
            <span className="stat-icon">
              <Users size={17} />
            </span>
          </div>
          <div className="stat-number">18</div>
          <div className="stat-foot">Working together</div>
        </div>
      </div>
      <div className="two-column">
        <div className="panel">
          <div className="section-title">
            <h2>Project health</h2>
            <Link href="/projects" className="text-link">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          {projects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              style={{ padding: "14px 0", borderBottom: "1px solid #f0f0f5" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 9,
                }}
              >
                <Link
                  href={`/projects/${p.id}`}
                  style={{ fontWeight: 700, fontSize: 12 }}
                >
                  {p.name}
                </Link>
                <StatusBadge status={p.status} />
              </div>
              <Progress value={p.progress} />
              <div
                className="progress-head"
                style={{ marginTop: 7, marginBottom: 0 }}
              >
                <span>Progress</span>
                <strong>{p.progress}%</strong>
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="section-title">
            <h2>Recent activity</h2>
            <span className="project-symbol" style={{ width: 30, height: 30 }}>
              <Clock3 size={15} />
            </span>
          </div>
          <Suspense fallback={<ActivityFallback />}>
            <SlowActivity />
          </Suspense>
        </div>
      </div>
    </>
  );
}
