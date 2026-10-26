import Link from "next/link";
import { SearchX } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="not-found">
      <div className="project-symbol" style={{ margin: "0 auto 20px" }}>
        <SearchX size={23} />
      </div>
      <h1>Project not found</h1>
      <p>
        We couldn’t find a project with that ID. It may have moved or no longer
        exists.
      </p>
      <Link href="/projects" className="primary-button">
        Browse all projects
      </Link>
    </div>
  );
}
