import Link from "next/link";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Users,
  FolderKanban,
  Settings,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
  },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-label">Workspace</div>
        {items.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="project-side-link">
            <Icon size={16} />
            {label}
          </Link>
        ))}
        <div className="notice" style={{ marginTop: 22, fontSize: 10 }}>
          Keep your team aligned. One update at a time.
        </div>
      </aside>
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
