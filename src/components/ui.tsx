import type { ProjectStatus } from "@/lib/projects";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}
export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}>
      <span />
      {status}
    </span>
  );
}
export function Progress({ value }: { value: number }) {
  return (
    <div className="progress-track">
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
export function AvatarStack({ names }: { names: string[] }) {
  return (
    <div className="avatar-stack">
      {names.slice(0, 3).map((name, i) => (
        <span key={name} title={name} className={`avatar avatar-${i}`}>
          {name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
      ))}
      {names.length > 3 && (
        <span className="avatar avatar-more">+{names.length - 3}</span>
      )}
    </div>
  );
}
