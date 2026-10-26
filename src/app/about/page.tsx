import { Compass, Target, HeartHandshake, Layers3 } from "lucide-react";

import { Eyebrow } from "@/components/ui";

export default function AboutPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <Eyebrow>Why Orbit</Eyebrow>
          <h1>Work feels better when it’s clear.</h1>
          <p>
            Project Explorer brings your projects, people, and progress into one
            thoughtful workspace.
          </p>
        </div>
      </div>
      <div className="hero" style={{ minHeight: 190 }}>
        <div className="hero-copy">
          <Eyebrow>A shared point of view</Eyebrow>
          <h1 style={{ fontSize: 29 }}>
            Less chasing updates. More meaningful progress.
          </h1>
          <p>
            We believe great project work starts with shared context, honest
            visibility, and room for teams to do their best work.
          </p>
        </div>
      </div>
      <div className="project-grid">
        {[
          {
            icon: Compass,
            title: "Find your direction",
            text: "See what matters, understand priorities, and know where to focus next.",
          },
          {
            icon: Target,
            title: "Make progress visible",
            text: "Turn milestones and tasks into a shared picture of delivery.",
          },
          {
            icon: HeartHandshake,
            title: "Bring people together",
            text: "Keep teammates aligned with a clear view of ownership and activity.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div className="content-card" key={title}>
            <div className="project-symbol">
              <Icon size={21} />
            </div>
            <h3 style={{ marginTop: 17 }}>{title}</h3>
            <p className="muted" style={{ fontSize: 12 }}>
              {text}
            </p>
          </div>
        ))}
      </div>
      <div className="content-card" style={{ marginTop: 18 }}>
        <Layers3 size={21} color="#6c5ce7" />
        <h2 style={{ marginTop: 15 }}>Built for the way teams work</h2>
        <p className="muted">
          Orbit is a lightweight project hub designed to make everyday
          coordination easier. This demo showcases a modern application
          architecture with reusable layouts, dynamic project pages, and a
          responsive interface.
        </p>
      </div>
    </>
  );
}
