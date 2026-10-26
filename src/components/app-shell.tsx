"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  FolderKanban,
  LayoutDashboard,
  Home,
  Info,
  Settings,
  Search,
  Bell,
  Command,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-frame">
      <aside className="rail">
        <Link href="/" className="brand-mark">
          <Command size={22} />
        </Link>
        <div className="rail-rule" />
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            title={label}
            className={`rail-link ${pathname === href || (href !== "/" && pathname.startsWith(href)) ? "selected" : ""}`}
          >
            <Icon size={20} />
          </Link>
        ))}
      </aside>
      <div className="main-frame">
        <header className="topbar">
          <Link href="/" className="wordmark">
            orbit<span>.</span>
          </Link>
          <nav className="top-links">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href))
                    ? "top-link active"
                    : "top-link"
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="top-actions">
            <Link
              href="/projects"
              className="icon-button"
              aria-label="Search projects"
            >
              <Search size={18} />
            </Link>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
              <i />
            </button>
            <div className="avatar avatar-purple">AY</div>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="footer">
          <span>© 2026 Orbit Workspace</span>
          <span>
            Made for teams that move forward{" "}
            <span className="footer-heart">✳</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
