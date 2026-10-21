"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "🏠", id: "nav-overview" },
  { href: "/dashboard/medications", label: "Medications", icon: "💊", id: "nav-medications" },
  { href: "/dashboard/vitals", label: "Vitals", icon: "❤️", id: "nav-vitals" },
  { href: "/dashboard/meals", label: "Meal Tracker", icon: "🥗", id: "nav-meals" },
  { href: "/dashboard/meal-scan", label: "AI Meal Scan", icon: "📸", id: "nav-meal-scan" },
  { href: "/dashboard/diet-planner", label: "Diet Planner", icon: "🍱", id: "nav-diet-planner" },
  { href: "/dashboard/insights", label: "Health Insights", icon: "📊", id: "nav-insights" },
  { href: "/dashboard/reports", label: "Reports & OCR", icon: "📄", id: "nav-reports" },
  { href: "/dashboard/appointments", label: "Appointments", icon: "📅", id: "nav-appointments" },
  { href: "/dashboard/family", label: "Family Feed", icon: "👨‍👩‍👧", id: "nav-family" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "🔔", id: "nav-notifications" },
  { href: "/dashboard/sos", label: "Emergency SOS", icon: "🚨", id: "nav-sos", danger: true },
];

const ROLE_COLORS: Record<string, string> = {
  elderly: "#0f766e",
  family: "#7c3aed",
  caregiver: "#0369a1",
  doctor: "#b45309",
};

const ROLE_LABELS: Record<string, string> = {
  elderly: "Care Recipient",
  family: "Family Member",
  caregiver: "Caregiver",
  doctor: "Physician",
};

export default function DashboardShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const roleColor = ROLE_COLORS[user.role] || "#0f766e";

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  const sidebarContent = (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#0f766e" />
            <path d="M14 20 H26 M20 14 V26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="white" />
          </svg>
        </div>
        <span className="sidebar-brand-name">OrbiCare</span>
      </div>

      {/* User card */}
      <div className="sidebar-user" style={{ "--role-color": roleColor } as React.CSSProperties}>
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f766e&color=fff`}
          alt={user.name}
          className="sidebar-avatar"
        />
        <div className="sidebar-user-info">
          <strong>{user.name}</strong>
          <span className="sidebar-role-badge">{ROLE_LABELS[user.role]}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              id={item.id}
              className={`sidebar-nav-item ${isActive ? "active" : ""} ${item.danger ? "danger" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {isActive && <span className="nav-active-dot" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <Link href="/dashboard/settings" id="nav-settings" className={`sidebar-nav-item ${pathname.startsWith("/dashboard/settings") ? "active" : ""}`}>
          <span className="nav-icon">⚙️</span>
          <span>Preferences & Access</span>
        </Link>
        <Link href="/dashboard/profile" id="nav-profile" className={`sidebar-nav-item ${pathname.startsWith("/dashboard/profile") ? "active" : ""}`}>
          <span className="nav-icon">👤</span>
          <span>Profile & Care Circle</span>
        </Link>
        <Link href="/login" id="nav-switch-user" className="sidebar-nav-item" style={{ color: "#0f766e", fontWeight: "700" }}>
          <span className="nav-icon">🔄</span>
          <span>Switch Persona</span>
        </Link>
        <button
          id="logout-btn"
          className="sidebar-logout"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <span className="btn-spinner-sm" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          )}
          <span>{loggingOut ? "Logging out…" : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="sidebar-desktop">{sidebarContent}</div>

      {/* Mobile sidebar */}
      <div className={`sidebar-mobile ${sidebarOpen ? "open" : ""}`}>
        {sidebarContent}
      </div>

      {/* Main content */}
      <div className="shell-main">
        {/* Mobile header */}
        <header className="mobile-header">
          <button
            id="mobile-menu-btn"
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          <div className="mobile-brand">
            <div className="sidebar-logo" style={{ width: 28, height: 28 }}>
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#0f766e" />
                <path d="M14 20 H26 M20 14 V26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="20" r="3" fill="white" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, color: "#0f766e", fontSize: 18 }}>OrbiCare</span>
          </div>
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f766e&color=fff`}
            alt={user.name}
            style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }}
          />
        </header>

        <main className="shell-content">{children}</main>
      </div>

      <style>{`
        .shell {
          display: flex;
          min-height: 100vh;
          background: #f8faf9;
        }
        .sidebar {
          width: 256px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: white;
          border-right: 1px solid #e2e8f0;
          overflow-y: auto;
          flex-shrink: 0;
        }
        .sidebar-desktop {
          display: none;
          position: sticky;
          top: 0;
          height: 100vh;
          flex-shrink: 0;
        }
        @media (min-width: 1024px) {
          .sidebar-desktop { display: block; }
          .mobile-header { display: none !important; }
        }
        .sidebar-mobile {
          position: fixed;
          inset-y: 0;
          left: 0;
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .sidebar-mobile.open { transform: translateX(0); }
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 40;
          backdrop-filter: blur(2px);
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-logo {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }
        .sidebar-logo svg { width: 100%; height: 100%; }
        .sidebar-brand-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f766e;
          letter-spacing: -0.3px;
        }
        .sidebar-user {
          margin: 12px 12px 0;
          padding: 12px;
          background: color-mix(in srgb, var(--role-color) 8%, white);
          border: 1px solid color-mix(in srgb, var(--role-color) 20%, white);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 0 0 2px var(--role-color);
          flex-shrink: 0;
        }
        .sidebar-user-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        .sidebar-user-info strong {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-role-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--role-color);
          background: color-mix(in srgb, var(--role-color) 10%, white);
          padding: 2px 6px;
          border-radius: 20px;
          border: 1px solid color-mix(in srgb, var(--role-color) 25%, white);
          display: inline-block;
          width: fit-content;
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: all 0.15s;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          position: relative;
        }
        .sidebar-nav-item:hover {
          background: #f0fdfa;
          color: #0f766e;
        }
        .sidebar-nav-item.active {
          background: #f0fdfa;
          color: #0f766e;
          font-weight: 700;
        }
        .sidebar-nav-item.danger { color: #dc2626; }
        .sidebar-nav-item.danger:hover { background: #fef2f2; color: #dc2626; }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
        .nav-active-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0f766e;
          margin-left: auto;
          flex-shrink: 0;
        }
        .sidebar-bottom {
          padding: 8px 10px 12px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .sidebar-logout:hover:not(:disabled) { background: #fef2f2; color: #dc2626; }
        .sidebar-logout:disabled { opacity: 0.6; }
        .shell-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .mobile-brand { display: flex; align-items: center; gap: 8px; }
        .mobile-menu-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: none; background: transparent; cursor: pointer;
          color: #0f172a; border-radius: 8px;
          transition: background 0.15s;
        }
        .mobile-menu-btn:hover { background: #f1f5f9; }
        .shell-content {
          flex: 1;
          padding: 0;
          overflow-y: auto;
        }
        .btn-spinner-sm {
          width: 14px; height: 14px;
          border: 2px solid #e2e8f0;
          border-top-color: #64748b;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
