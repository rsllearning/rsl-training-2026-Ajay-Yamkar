import { Activity, ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/projects";
async function getRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 2200));

  return projects
    .slice(0, 3)
    .map((p) => ({ project: p.name, activity: p.activity[0] }));
}
export default async function SlowActivity() {
  const items = await getRecentActivity();

  return (
    <div className="activity-list">
      {items.map((item, i) => (
        <div className="activity-item" key={item.project}>
          <div className={`activity-icon activity-icon-${i}`}>
            <Activity size={17} />
          </div>
          <div className="activity-copy">
            <strong>{item.activity.title}</strong>
            <p>{item.activity.detail}</p>
            <span>
              {item.project} · {item.activity.time}
            </span>
          </div>
          <ArrowUpRight size={16} className="muted-icon" />
        </div>
      ))}
    </div>
  );
}
