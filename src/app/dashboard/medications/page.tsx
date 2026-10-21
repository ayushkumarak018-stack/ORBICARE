"use client";

import { useEffect, useState } from "react";
import { Medication, MedicationLog } from "@/types";
import { format } from "date-fns";

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [logs, setLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [tab, setTab] = useState<"schedule" | "manage">("schedule");
  const [formData, setFormData] = useState({
    name: "", dosage: "", frequency: "", timesOfDay: "", instructions: "", prescribingDoctor: "", startDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function loadData() {
    setLoading(true);
    const [medsRes, logsRes] = await Promise.all([
      fetch("/api/medications"),
      fetch("/api/medications/logs"),
    ]);
    setMedications(await medsRes.json());
    setLogs(await logsRes.json());
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayLogs = logs.filter((l) => l.scheduledTime.startsWith(today));

  async function markLog(logId: string, status: "taken" | "skipped" | "snoozed") {
    setActionLoading(logId);
    await fetch("/api/medications/logs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logId, status, recordedAt: new Date().toISOString() }),
    });
    await loadData();
    setActionLoading(null);
  }

  async function archiveMed(id: string) {
    await fetch(`/api/medications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
    await loadData();
  }

  async function handleAddMed(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/medications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        timesOfDay: formData.timesOfDay.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });
    setShowForm(false);
    setFormData({ name: "", dosage: "", frequency: "", timesOfDay: "", instructions: "", prescribingDoctor: "", startDate: "" });
    await loadData();
    setSubmitting(false);
  }

  const STATUS_STYLE = {
    taken: { bg: "#f0fdfa", border: "#99f6e4", dot: "#0f766e", label: "✓ Taken" },
    pending: { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", label: "⏳ Pending" },
    skipped: { bg: "#fef2f2", border: "#fecaca", dot: "#dc2626", label: "✗ Skipped" },
    snoozed: { bg: "#f0f9ff", border: "#bae6fd", dot: "#0369a1", label: "💤 Snoozed" },
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💊</div>
        <div>Loading medications…</div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>💊 Medications</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
            {medications.filter(m => m.status === "active").length} active · {todayLogs.filter(l => l.status === "taken").length}/{todayLogs.length} taken today
          </p>
        </div>
        <button
          id="add-medication-btn"
          onClick={() => setShowForm(!showForm)}
          style={{ padding: "10px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          + Add Medication
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Add New Medication</h3>
          <form onSubmit={handleAddMed} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { id: "med-name", key: "name", label: "Medication Name *", placeholder: "e.g. Amlodipine 5mg", span: 2 },
              { id: "med-dosage", key: "dosage", label: "Dosage *", placeholder: "e.g. 1 Tablet (5mg)" },
              { id: "med-frequency", key: "frequency", label: "Frequency *", placeholder: "e.g. Once Daily" },
              { id: "med-times", key: "timesOfDay", label: "Times (comma-separated)", placeholder: "e.g. 08:00, 20:00" },
              { id: "med-start", key: "startDate", label: "Start Date *", placeholder: "", type: "date" },
              { id: "med-doctor", key: "prescribingDoctor", label: "Prescribing Doctor", placeholder: "e.g. Dr. Sharma", span: 2 },
              { id: "med-instructions", key: "instructions", label: "Instructions", placeholder: "e.g. Take after meals", span: 2 },
            ].map((field) => (
              <div key={field.key} style={{ gridColumn: (field as {span?: number}).span === 2 ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{field.label}</label>
                <input
                  id={field.id}
                  type={(field as {type?: string}).type || "text"}
                  value={(formData as Record<string, string>)[field.key]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  required={field.label.includes("*")}
                  style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit" }}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "9px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "white" }}>Cancel</button>
              <button id="save-med-btn" type="submit" disabled={submitting} style={{ padding: "9px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {submitting ? "Saving…" : "Save Medication"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        {(["schedule", "manage"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 18px", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: tab === t ? "white" : "transparent",
            color: tab === t ? "#0f766e" : "#64748b",
            boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.15s",
          }}>
            {t === "schedule" ? "Today's Schedule" : "Manage All"}
          </button>
        ))}
      </div>

      {/* Today's schedule */}
      {tab === "schedule" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {todayLogs.length === 0 ? (
            <div style={{ background: "white", borderRadius: 14, padding: 32, textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
              <p style={{ margin: 0 }}>No medications scheduled for today.</p>
            </div>
          ) : (
            todayLogs.map((log) => {
              const s = STATUS_STYLE[log.status];
              const time = log.scheduledTime.includes("T") ? log.scheduledTime.split("T")[1].slice(0, 5) : log.scheduledTime;
              return (
                <div key={log.id} style={{ background: "white", border: `1.5px solid ${s.border}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{log.medicationName}</div>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>⏰ {time} {log.notes ? `· ${log.notes}` : ""}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.dot }}>{s.label}</span>
                    {log.status === "pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          id={`mark-taken-${log.id}`}
                          onClick={() => markLog(log.id, "taken")}
                          disabled={actionLoading === log.id}
                          style={{ padding: "6px 12px", background: "#0f766e", color: "white", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                        >
                          {actionLoading === log.id ? "…" : "✓ Taken"}
                        </button>
                        <button
                          id={`mark-skipped-${log.id}`}
                          onClick={() => markLog(log.id, "skipped")}
                          disabled={actionLoading === log.id}
                          style={{ padding: "6px 10px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
                        >
                          Skip
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Manage all */}
      {tab === "manage" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {medications.map((med) => (
            <div key={med.id} style={{ background: "white", borderRadius: 14, border: "1px solid #e2e8f0", padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>💊</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{med.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: med.status === "active" ? "#f0fdfa" : "#f1f5f9", color: med.status === "active" ? "#0f766e" : "#64748b", border: `1px solid ${med.status === "active" ? "#99f6e4" : "#e2e8f0"}` }}>
                    {med.status === "active" ? "Active" : "Archived"}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  {med.dosage} · {med.frequency} · {med.timesOfDay.join(", ")}
                </div>
                {med.instructions && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{med.instructions}</div>}
                {med.prescribingDoctor && <div style={{ fontSize: 12, color: "#94a3b8" }}>Prescribed by: {med.prescribingDoctor}</div>}
              </div>
              {med.status === "active" && (
                <button
                  id={`archive-med-${med.id}`}
                  onClick={() => archiveMed(med.id)}
                  style={{ padding: "6px 12px", border: "1px solid #e2e8f0", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 12, color: "#64748b" }}
                >
                  Archive
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
