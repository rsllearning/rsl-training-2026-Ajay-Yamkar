export default function Loading() {
  return (
    <div>
      <div className="eyebrow">Loading workspace</div>
      <h1>Getting your projects ready…</h1>
      <p className="muted">Gathering the latest project information.</p>
      <div className="stats-grid">
        {[1, 2, 3, 4].map((n) => (
          <div className="stat-card" key={n}>
            <div className="skeleton" />
            <div className="skeleton" style={{ height: 25, width: "55%" }} />
          </div>
        ))}
      </div>
      <div className="project-grid">
        {[1, 2, 3].map((n) => (
          <div className="project-card" key={n}>
            <div className="skeleton" />
            <div className="skeleton" style={{ height: 20, width: "65%" }} />
            <div className="skeleton" style={{ height: 50 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
