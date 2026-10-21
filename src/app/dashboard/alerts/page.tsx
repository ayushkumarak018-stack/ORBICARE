"use client";

import { useEffect, useState } from "react";
import { Alert } from "@/types";
import { format } from "date-fns";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"new" | "all">("new");
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/alerts");
    setAlerts(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: "reviewed" | "resolved") {
    setUpdating(id);
    await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alertId: id, status }),
    });
    await load();
    setUpdating(null);
  }

  const filtered = tab === "new" ? alerts.filter((a) => a.status === "new") : alerts;

  const SEVERITY_STYLE = {
    info: { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", dot: "#3b82f6", icon: "ℹ️" },
    warning: { bg: "#fffbeb", border: "#fde68a", text: "#b45309", dot: "#f59e0b", icon: "⚠️" },
    critical: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626", dot: "#ef4444", icon: "🚨" },
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 32 }}>🔔</div><div>Loading alerts…</div></div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>🔔 Health Alerts</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
          {alerts.filter(a => a.status === "new").length} unreviewed · {alerts.length} total
        </p>
      </div>

      <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        <button onClick={() => setTab("new")} style={{ padding: "8px 16px", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", background: tab === "new" ? "white" : "transparent", color: tab === "new" ? "#0f766e" : "#64748b" }}>
          New Alerts {alerts.filter(a => a.status === "new").length > 0 && <span style={{ background: "#dc2626", color: "white", borderRadius: 20, padding: "0 6px", fontSize: 10, marginLeft: 6 }}>{alerts.filter(a => a.status === "new").length}</span>}
        </button>
        <button onClick={() => setTab("all")} style={{ padding: "8px 16px", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", background: tab === "all" ? "white" : "transparent", color: tab === "all" ? "#0f766e" : "#64748b" }}>
          All Alerts
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ background: "white", borderRadius: 14, padding: 48, textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a" }}>All Clear!</h3>
            <p style={{ margin: 0 }}>No {tab === "new" ? "new " : ""}health alerts at this time.</p>
          </div>
        ) : (
          filtered.map((alert) => {
            const s = SEVERITY_STYLE[alert.severity];
            return (
              <div key={alert.id} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 14, color: s.text }}>{alert.title}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.7)", color: s.text, border: `1px solid ${s.border}` }}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.5)", color: "#64748b" }}>
                        {alert.status}
                      </span>
                    </div>
                    <p style={{ margin: "8px 0 6px", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{alert.message}</p>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                      {format(new Date(alert.triggeredAt), "d MMM yyyy, h:mm a")}
                      {alert.readingValue && ` · Reading: ${alert.readingValue}`}
                    </div>
                    {alert.status === "new" && (
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button
                          id={`review-alert-${alert.id}`}
                          onClick={() => updateStatus(alert.id, "reviewed")}
                          disabled={updating === alert.id}
                          style={{ padding: "7px 14px", background: "rgba(255,255,255,0.8)", color: s.text, border: `1px solid ${s.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                        >
                          Mark Reviewed
                        </button>
                        <button
                          id={`resolve-alert-${alert.id}`}
                          onClick={() => updateStatus(alert.id, "resolved")}
                          disabled={updating === alert.id}
                          style={{ padding: "7px 14px", background: "rgba(255,255,255,0.4)", color: "#64748b", border: "1px solid rgba(255,255,255,0.6)", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                        >
                          Resolve
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
