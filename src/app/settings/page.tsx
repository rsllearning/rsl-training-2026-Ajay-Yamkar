"use client";

import { useState } from "react";
import { Bell, ShieldCheck, Palette, Mail } from "lucide-react";
import { Eyebrow } from "@/components/ui";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    weekly: true,
    product: false,
    digest: true,
  });
  const rows = [
    {
      key: "notifications" as const,
      icon: Bell,
      title: "Project notifications",
      description: "Get notified when a project you follow changes.",
    },
    {
      key: "weekly" as const,
      icon: Mail,
      title: "Weekly workspace summary",
      description: "Receive a short recap of project progress every Monday.",
    },
    {
      key: "product" as const,
      icon: Palette,
      title: "Product updates",
      description: "Hear about new Orbit features and improvements.",
    },
    {
      key: "digest" as const,
      icon: ShieldCheck,
      title: "Security alerts",
      description: "Get notified about important account and security events.",
    },
  ];
  return (
    <>
      <div className="page-heading">
        <div>
          <Eyebrow>Make it yours</Eyebrow>
          <h1>Settings</h1>
          <p>Manage how your workspace works for you.</p>
        </div>
      </div>
      <div className="content-card">
        <h2>Preferences</h2>
        <p className="muted" style={{ fontSize: 12 }}>
          Choose what you’d like to hear about. Changes apply immediately in
          this demo.
        </p>
        {rows.map(({ key, icon: Icon, title, description }) => (
          <div className="settings-row" key={key}>
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div className="project-symbol" style={{ width: 38, height: 38 }}>
                <Icon size={17} />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </div>
            <button
              className={`toggle ${settings[key] ? "on" : ""}`}
              aria-label={`Toggle ${title}`}
              aria-pressed={settings[key]}
              onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))}
            >
              <span />
            </button>
          </div>
        ))}
      </div>
      <div className="content-card" style={{ marginTop: 17 }}>
        <h2>Workspace details</h2>
        <div className="settings-row">
          <div>
            <strong>Workspace name</strong>
            <p>The name shown across your application.</p>
          </div>
          <span className="detail-value">Orbit Workspace</span>
        </div>
        <div className="settings-row">
          <div>
            <strong>Default project view</strong>
            <p>Where you land when opening Projects.</p>
          </div>
          <span className="detail-value">All projects</span>
        </div>
      </div>
    </>
  );
}
