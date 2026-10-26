import { Users } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { projects } from "@/lib/projects";

export default function DashboardTeam() {
  const names = [...new Set(projects.flatMap((p) => p.team))];
  return (
    <>
      <Eyebrow>People & collaboration</Eyebrow>
      <h1>Team directory</h1>
      <p className="muted">
        Meet the contributors working across your project portfolio.
      </p>
      <div className="project-grid">
        {names.map((n, i) => (
          <div className="content-card" key={n}>
            <span
              className={`avatar avatar-${i % 3}`}
              style={{ width: 43, height: 43, fontSize: 12 }}
            >
              {n
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <h3 style={{ marginTop: 14 }}>{n}</h3>
            <p className="muted" style={{ fontSize: 11 }}>
              {i === 0
                ? "Project lead"
                : i % 2
                  ? "Software engineer"
                  : "Product contributor"}
            </p>
            <div className="detail-label">
              <Users
                size={12}
                style={{ verticalAlign: "middle", marginRight: 5 }}
              />
              Contributor
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
