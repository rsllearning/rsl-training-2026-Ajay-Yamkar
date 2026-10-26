"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";

export default function ProjectSearch() {
  const router = useRouter();
  const params = useSearchParams();
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/projects${next.size ? `?${next.toString()}` : ""}`, {
      scroll: false,
    });
  }
  return (
    <div className="filter-row">
      <label className="search-box">
        <Search size={17} />
        <input
          aria-label="Search projects"
          placeholder="Search projects..."
          value={params.get("search") || ""}
          onChange={(e) => update("search", e.target.value)}
        />
        {params.get("search") && (
          <button
            onClick={() => update("search", "")}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
        <kbd>⌘ K</kbd>
      </label>
      <select
        aria-label="Filter by status"
        value={params.get("status") || "all"}
        onChange={(e) =>
          update("status", e.target.value === "all" ? "" : e.target.value)
        }
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="at-risk">At risk</option>
      </select>
    </div>
  );
}
