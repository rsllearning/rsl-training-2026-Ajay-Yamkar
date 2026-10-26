import { notFound } from "next/navigation";
import { Check, Circle } from "lucide-react";
import { getProject } from "@/lib/projects";
import { Eyebrow } from "@/components/ui";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();
  return (
    <>
      <Eyebrow>Delivery checklist</Eyebrow>
      <h2>Tasks & milestones</h2>
      <p className="muted">A snapshot of the work tracked for this project.</p>
      <div className="content-card">
        <div className="section-title">
          <h3>All tasks</h3>
          <span className="muted" style={{ fontSize: 11 }}>
            {p.tasks.filter((t) => t.done).length}/{p.tasks.length} complete
          </span>
        </div>
        {p.tasks.map((t) => (
          <div className="task-row" key={t.title}>
            <span className={`task-check ${t.done ? "done" : ""}`}>
              {t.done ? <Check size={13} /> : <Circle size={12} />}
            </span>
            <span className={`task-title ${t.done ? "done" : ""}`}>
              {t.title}
            </span>
            <span className="task-assignee">{t.assignee}</span>
          </div>
        ))}
      </div>
    </>
  );
}
