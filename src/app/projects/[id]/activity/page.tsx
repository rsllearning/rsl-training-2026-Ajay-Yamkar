import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { Eyebrow } from "@/components/ui";

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();
  return (
    <>
      <Eyebrow>Project timeline</Eyebrow>
      <h2>Recent activity</h2>
      <p className="muted">The latest updates from the {p.name} team.</p>
      <div className="content-card">
        <div className="activity-list">
          {p.activity.map((a, i) => (
            <div className="activity-item" key={a.title}>
              <div className={`activity-icon activity-icon-${i % 3}`}>✦</div>
              <div className="activity-copy">
                <strong>{a.title}</strong>
                <p>{a.detail}</p>
                <span>{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
