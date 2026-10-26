export default function ProjectLoading() {
  return (
    <div className="content-card">
      <div className="eyebrow">Loading project</div>
      <h2>Preparing your project workspace…</h2>
      <p className="muted">Getting the project details and team information.</p>
      {[1, 2, 3, 4].map((n) => (
        <div className="skeleton" key={n} />
      ))}
    </div>
  );
}
