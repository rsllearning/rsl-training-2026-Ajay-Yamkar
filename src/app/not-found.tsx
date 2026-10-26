import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="project-symbol" style={{ margin: "0 auto 20px" }}>
        <SearchX size={23} />
      </div>
      <h1>That page wandered off</h1>
      <p>The page you’re looking for doesn’t exist or may have moved.</p>
      <Link href="/" className="primary-button">
        Back to home
      </Link>
    </div>
  );
}
