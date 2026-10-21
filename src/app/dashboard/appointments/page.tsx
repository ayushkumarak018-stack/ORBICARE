"use client";

import { useEffect, useState } from "react";
import { Appointment } from "@/types";
import { format } from "date-fns";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState<"upcoming" | "completed" | "all">("upcoming");
  const [formData, setFormData] = useState({
    doctorName: "", specialty: "", clinicOrHospital: "", appointmentDate: "",
    appointmentTime: "", locationType: "in_person", addressOrLink: "", notes: "",
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/appointments");
    setAppointments(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const filtered = tab === "all" ? appointments : appointments.filter((a) => a.status === tab);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowForm(false);
    setFormData({ doctorName: "", specialty: "", clinicOrHospital: "", appointmentDate: "", appointmentTime: "", locationType: "in_person", addressOrLink: "", notes: "" });
    await load();
    setSubmitting(false);
  }

  async function updateStatus(id: string, status: "upcoming" | "completed" | "cancelled") {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
  }

  const STATUS_COLORS = {
    upcoming: { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
    completed: { bg: "#f0fdf4", text: "#16a34a", border: "#86efac" },
    cancelled: { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0" },
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 32, marginBottom: 12 }}>📅</div><div>Loading appointments…</div></div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>📅 Appointments</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
            {appointments.filter(a => a.status === "upcoming").length} upcoming
          </p>
        </div>
        <button
          id="add-appointment-btn"
          onClick={() => setShowForm(!showForm)}
          style={{ padding: "10px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          + Schedule
        </button>
      </div>

      {showForm && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Schedule New Appointment</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { id: "appt-doctor", key: "doctorName", label: "Doctor Name *", placeholder: "e.g. Dr. Sharma", span: 2 },
              { id: "appt-specialty", key: "specialty", label: "Specialty *", placeholder: "e.g. Cardiology" },
              { id: "appt-clinic", key: "clinicOrHospital", label: "Clinic / Hospital *", placeholder: "e.g. City Health Clinic" },
              { id: "appt-date", key: "appointmentDate", label: "Date *", type: "date" },
              { id: "appt-time", key: "appointmentTime", label: "Time *", placeholder: "e.g. 11:30 AM" },
              { id: "appt-address", key: "addressOrLink", label: "Address / Link", placeholder: "Address or telehealth URL", span: 2 },
              { id: "appt-notes", key: "notes", label: "Notes", placeholder: "e.g. Bring previous reports", span: 2 },
            ].map((f) => (
              <div key={f.key} style={{ gridColumn: (f as {span?: number}).span === 2 ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{f.label}</label>
                <input
                  id={f.id}
                  type={(f as {type?: string}).type || "text"}
                  value={(formData as Record<string, string>)[f.key]}
                  onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  required={f.label.includes("*")}
                  style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Location Type</label>
              <select
                id="appt-location-type"
                value={formData.locationType}
                onChange={(e) => setFormData((p) => ({ ...p, locationType: e.target.value }))}
                style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }}
              >
                <option value="in_person">🏥 In Person</option>
                <option value="telehealth">💻 Telehealth</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "9px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "white" }}>Cancel</button>
              <button id="save-appointment-btn" type="submit" disabled={submitting} style={{ padding: "9px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {submitting ? "Saving…" : "Save Appointment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        {(["upcoming", "completed", "all"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "8px 16px", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: tab === t ? "white" : "transparent", color: tab === t ? "#0f766e" : "#64748b",
            boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s",
          }}>
            {t === "upcoming" ? "Upcoming" : t === "completed" ? "Completed" : "All"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ background: "white", borderRadius: 14, padding: 40, textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📅</div>
            <p style={{ margin: 0 }}>No {tab} appointments.</p>
          </div>
        ) : (
          filtered.map((appt) => {
            const s = STATUS_COLORS[appt.status];
            return (
              <div key={appt.id} style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px", display: "flex", gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 18 }}>
                    {appt.locationType === "telehealth" ? "💻" : "🏥"}
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: s.text, marginTop: 2 }}>
                    {appt.locationType === "telehealth" ? "ONLINE" : "IN-PERSON"}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{appt.doctorName}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{appt.specialty} · {appt.clinicOrHospital}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: s.bg, color: s.text, border: `1px solid ${s.border}`, flexShrink: 0 }}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f766e" }}>📅 {appt.appointmentDate}</span>
                    <span style={{ fontSize: 13, color: "#64748b" }}>⏰ {appt.appointmentTime}</span>
                    {appt.addressOrLink && (
                      <span style={{ fontSize: 12, color: "#64748b" }}>📍 {appt.addressOrLink.slice(0, 50)}{appt.addressOrLink.length > 50 ? "…" : ""}</span>
                    )}
                  </div>
                  {appt.notes && <p style={{ margin: "8px 0 0", fontSize: 12, color: "#94a3b8" }}>{appt.notes}</p>}
                  {appt.status === "upcoming" && (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button
                        id={`complete-appt-${appt.id}`}
                        onClick={() => updateStatus(appt.id, "completed")}
                        style={{ padding: "6px 14px", background: "#f0fdf4", color: "#16a34a", border: "1px solid #86efac", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                      >
                        ✓ Mark Completed
                      </button>
                      <button
                        id={`cancel-appt-${appt.id}`}
                        onClick={() => updateStatus(appt.id, "cancelled")}
                        style={{ padding: "6px 14px", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
