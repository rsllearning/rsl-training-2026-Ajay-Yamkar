import { BarChart3, TrendingUp } from "lucide-react";
import { Eyebrow, Progress } from "@/components/ui";
import { projects } from "@/lib/projects";

export default function AnalyticsPage() {
  const completed = projects.filter((p) => p.status === "Completed").length;
  return (
    <>
      <Eyebrow>Workspace insights</Eyebrow>
      <h1>Analytics</h1>
      <p className="muted">
        A quick view of project delivery and portfolio health.
      </p>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            Delivery rate{" "}
            <span className="stat-icon">
              <TrendingUp size={17} />
            </span>
          </div>
          <div className="stat-number">75%</div>
          <div className="stat-foot">
            <span className="positive">+8%</span> this quarter
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            Completed projects{" "}
            <span className="stat-icon">
              <BarChart3 size={17} />
            </span>
          </div>
          <div className="stat-number">{completed}</div>
          <div className="stat-foot">Of {projects.length} total projects</div>
        </div>
      </div>
      <div className="content-card">
        <h2>Progress by project</h2>
        {projects.map((p) => (
          <div key={p.id} style={{ padding: "15px 0" }}>
            <div className="progress-head">
              <span>{p.name}</span>
              <strong>{p.progress}%</strong>
            </div>
            <Progress value={p.progress} />
          </div>
        ))}
      </div>
    </>
  );
}
