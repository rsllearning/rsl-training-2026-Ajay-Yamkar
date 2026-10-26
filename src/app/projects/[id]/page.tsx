import { notFound } from "next/navigation";

import { CalendarDays, UserRound, Layers, CheckCircle2 } from "lucide-react";

import { getProject } from "@/lib/projects";

import { Progress, StatusBadge } from "@/components/ui";

import FavoriteButton from "@/components/favorite-button";

export default async function ProjectOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();
  return (
    <>
      <div className="content-card">
        <div className="section-title">
          <h2>Project overview</h2>
          <FavoriteButton id={p.id} />
        </div>
        <p className="muted">{p.description}</p>
        <div className="detail-grid" style={{ marginTop: 24 }}>
          <div>
            <div className="detail-label">
              <UserRound
                size={13}
                style={{ verticalAlign: "middle", marginRight: 5 }}
              />
              Project owner
            </div>
            <div className="detail-value">{p.owner}</div>
          </div>
          <div>
            <div className="detail-label">
              <CalendarDays
                size={13}
                style={{ verticalAlign: "middle", marginRight: 5 }}
              />
              Target date
            </div>
            <div className="detail-value">{p.dueDate}</div>
          </div>
          <div>
            <div className="detail-label">
              <Layers
                size={13}
                style={{ verticalAlign: "middle", marginRight: 5 }}
              />
              Category
            </div>
            <div className="detail-value">{p.category}</div>
          </div>
          <div>
            <div className="detail-label">Current status</div>
            <StatusBadge status={p.status} />
          </div>
        </div>
      </div>
      <div className="content-card">
        <div className="section-title">
          <h2>Delivery progress</h2>
          <strong>{p.progress}%</strong>
        </div>
        <Progress value={p.progress} />
        <p className="muted" style={{ fontSize: 11, marginTop: 12 }}>
          {p.tasks.filter((t) => t.done).length} of {p.tasks.length} tracked
          tasks completed.
        </p>
      </div>
      <div className="content-card">
        <div className="section-title">
          <h2>Next up</h2>
          <span className="muted" style={{ fontSize: 11 }}>
            Open tasks
          </span>
        </div>
        {p.tasks
          .filter((t) => !t.done)
          .slice(0, 3)
          .map((t) => (
            <div className="task-row" key={t.title}>
              <span className="task-check">
                <CheckCircle2 size={12} />
              </span>
              <span className="task-title">{t.title}</span>
              <span className="task-assignee">{t.assignee}</span>
            </div>
          ))}
      </div>
    </>
  );
}
