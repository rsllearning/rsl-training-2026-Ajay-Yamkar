"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="error-page">
      <div
        className="project-symbol"
        style={{
          margin: "0 auto 20px",
          background: "#fff0e7",
          color: "#c77928",
        }}
      >
        <AlertTriangle size={23} />
      </div>
      <h1>We couldn’t load this project</h1>
      <p>
        Something unexpected happened while loading the project details.
        <br />
        Your other workspace pages are still available.
      </p>
      <button className="primary-button" onClick={() => reset()}>
        <RefreshCw size={15} /> Try again
      </button>
    </div>
  );
}
