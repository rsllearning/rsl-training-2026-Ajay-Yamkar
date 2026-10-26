import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { Eyebrow } from "@/components/ui";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();
  return (
    <>
      <Eyebrow>People & ownership</Eyebrow>
      <h2>Project team</h2>
      <p className="muted">The people making {p.name} happen.</p>
      <div className="content-card">
        {p.team.map((name, i) => (
          <div className="member-row" key={name}>
            <span className={`avatar avatar-${i % 3}`}>
              {name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </span>
            <div className="member-info">
              <strong>{name}</strong>
              <span>
                {i === 0
                  ? "Project owner"
                  : i === 1
                    ? "Engineering"
                    : "Product & delivery"}
              </span>
            </div>
            <span className="status status-active">
              <span />
              Active
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
