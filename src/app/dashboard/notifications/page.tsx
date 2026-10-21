"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { InAppNotification } from "@/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  async function loadNotifications() {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markAsRead(id: string) {
    try {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  }

  async function markAllAsRead() {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      await fetch("/api/notifications", {
        method: "POST",
      });
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  }

  const filtered = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.category === filter;
  });

  const CATEGORY_ICONS: Record<string, string> = {
    medication: "💊",
    vital: "🩺",
    appointment: "📅",
    family: "👨‍👩‍👧",
    system: "⚙️",
    emergency: "🚨",
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Care Notifications</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0" }}>🔔 Notification Center</h1>
        </div>
        <button
          onClick={markAllAsRead}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f0fdfa",
            color: "#0f766e",
            border: "1px solid #ccfbf1",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "24px" }}>
        {[
          { key: "all", label: "All Notifications" },
          { key: "unread", label: "Unread Only" },
          { key: "medication", label: "💊 Medications" },
          { key: "vital", label: "🩺 Vitals & Alerts" },
          { key: "emergency", label: "🚨 Emergency" },
          { key: "family", label: "👨‍👩‍👧 Family Feed" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              border: filter === tab.key ? "1.5px solid #0f766e" : "1px solid #e2e8f0",
              backgroundColor: filter === tab.key ? "#0f766e" : "white",
              color: filter === tab.key ? "white" : "#475569",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          <div style={{ fontSize: "36px" }}>🔔</div>
          <div style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>Loading notifications…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ backgroundColor: "white", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "48px 24px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>✨</div>
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>No Notifications in this View</h3>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>All caught up! New reminders and health alerts will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(notif => (
            <div
              key={notif.id}
              style={{
                backgroundColor: notif.isRead ? "white" : "#f0fdfa",
                borderRadius: "16px",
                border: notif.isRead ? "1px solid #e2e8f0" : "1.5px solid #99f6e4",
                padding: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                boxShadow: notif.isRead ? "none" : "0 2px 8px rgba(15,118,110,0.06)",
              }}
            >
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: notif.category === "emergency" ? "#fef2f2" : "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}>
                {CATEGORY_ICONS[notif.category] || "🔔"}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: notif.isRead ? "700" : "800", color: notif.category === "emergency" ? "#dc2626" : "#0f172a", margin: 0 }}>
                    {notif.title}
                  </h3>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 10px", lineHeight: "1.5" }}>
                  {notif.message}
                </p>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  {notif.linkUrl && (
                    <Link
                      href={notif.linkUrl}
                      onClick={() => markAsRead(notif.id)}
                      style={{ fontSize: "12px", fontWeight: "700", color: "#0f766e", textDecoration: "none" }}
                    >
                      Open Related Record →
                    </Link>
                  )}
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      style={{ background: "none", border: "none", color: "#64748b", fontSize: "12px", cursor: "pointer", padding: 0 }}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
