"use client";

import { useEffect, useState } from "react";
import { VitalReading, VitalType } from "@/types";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const VITAL_CONFIGS: Record<VitalType, { label: string; icon: string; unit: string; color: string; refMin?: number; refMax?: number; placeholder: string; secondaryLabel?: string }> = {
  blood_pressure: { label: "Blood Pressure", icon: "🩺", unit: "mmHg", color: "#dc2626", refMax: 140, placeholder: "e.g. 126", secondaryLabel: "Diastolic" },
  heart_rate: { label: "Heart Rate", icon: "❤️", unit: "bpm", color: "#e11d48", refMin: 60, refMax: 100, placeholder: "e.g. 72" },
  blood_glucose: { label: "Blood Glucose", icon: "🩸", unit: "mg/dL", color: "#7c3aed", refMin: 70, refMax: 180, placeholder: "e.g. 114" },
  oxygen_saturation: { label: "Oxygen Saturation", icon: "💨", unit: "% SpO₂", color: "#0369a1", refMin: 95, placeholder: "e.g. 98" },
  temperature: { label: "Temperature", icon: "🌡️", unit: "°C", color: "#d97706", refMin: 36, refMax: 37.5, placeholder: "e.g. 36.8" },
  weight: { label: "Weight", icon: "⚖️", unit: "kg", color: "#0f766e", placeholder: "e.g. 68.4" },
};

type TabType = VitalType | "all";

export default function VitalsPage() {
  const [vitals, setVitals] = useState<VitalReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: "blood_pressure" as VitalType, primaryValue: "", secondaryValue: "", context: "", notes: "" });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/vitals");
    setVitals(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const filteredVitals = activeTab === "all" ? vitals : vitals.filter((v) => v.type === activeTab);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const cfg = VITAL_CONFIGS[formData.type];
    const primaryNum = parseFloat(formData.primaryValue);
    const value = formData.type === "blood_pressure" && formData.secondaryValue
      ? `${formData.primaryValue}/${formData.secondaryValue}`
      : formData.primaryValue;
    await fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: formData.type,
        value,
        numericValue: primaryNum,
        secondaryNumericValue: formData.secondaryValue ? parseFloat(formData.secondaryValue) : undefined,
        context: formData.context,
        notes: formData.notes,
      }),
    });
    setShowForm(false);
    setFormData({ type: "blood_pressure", primaryValue: "", secondaryValue: "", context: "", notes: "" });
    await load();
    setSubmitting(false);
  }

  // Chart data for selected type
  const chartType = activeTab === "all" ? "blood_pressure" : activeTab;
  const chartVitals = vitals.filter((v) => v.type === chartType).slice(0, 10).reverse();
  const chartData = chartVitals.map((v) => ({
    date: format(new Date(v.recordedAt), "d MMM"),
    value: v.numericValue,
    value2: v.secondaryNumericValue,
  }));

  const cfg = VITAL_CONFIGS[chartType];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>❤️</div>
        <div>Loading vitals…</div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>❤️ Vitals Monitor</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{vitals.length} total readings</p>
        </div>
        <button
          id="log-vital-btn"
          onClick={() => setShowForm(!showForm)}
          style={{ padding: "10px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          + Log Vital
        </button>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        {(Object.entries(VITAL_CONFIGS) as [VitalType, typeof VITAL_CONFIGS[VitalType]][]).map(([type, c]) => {
          const latest = vitals.find((v) => v.type === type);
          return (
            <button
              key={type}
              id={`vital-tab-${type}`}
              onClick={() => setActiveTab(type)}
              style={{
                padding: "14px", background: activeTab === type ? c.color : "white",
                border: `1.5px solid ${activeTab === type ? c.color : "#e2e8f0"}`,
                borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                color: activeTab === type ? "white" : "#0f172a",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{latest ? latest.value : "—"}</div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>{c.unit}</div>
            </button>
          );
        })}
      </div>

      {/* Log form */}
      {showForm && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Log New Vital Reading</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Vital Type</label>
              <select
                id="vital-type-select"
                value={formData.type}
                onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value as VitalType }))}
                style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", fontFamily: "inherit" }}
              >
                {(Object.entries(VITAL_CONFIGS) as [VitalType, typeof VITAL_CONFIGS[VitalType]][]).map(([type, c]) => (
                  <option key={type} value={type}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: formData.type === "blood_pressure" ? "1fr 1fr" : "1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                  {formData.type === "blood_pressure" ? "Systolic" : VITAL_CONFIGS[formData.type].label} *
                </label>
                <input
                  id="vital-primary-value"
                  type="number"
                  step="0.1"
                  value={formData.primaryValue}
                  onChange={(e) => setFormData((p) => ({ ...p, primaryValue: e.target.value }))}
                  placeholder={VITAL_CONFIGS[formData.type].placeholder}
                  required
                  style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
              {formData.type === "blood_pressure" && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Diastolic *</label>
                  <input
                    id="vital-secondary-value"
                    type="number"
                    value={formData.secondaryValue}
                    onChange={(e) => setFormData((p) => ({ ...p, secondaryValue: e.target.value }))}
                    placeholder="e.g. 82"
                    required
                    style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Context</label>
                <input
                  id="vital-context"
                  type="text"
                  value={formData.context}
                  onChange={(e) => setFormData((p) => ({ ...p, context: e.target.value }))}
                  placeholder="e.g. Resting, Post-walk, Fasting"
                  style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Notes</label>
                <input
                  id="vital-notes"
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Optional notes"
                  style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "9px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "white" }}>Cancel</button>
              <button id="save-vital-btn" type="submit" disabled={submitting} style={{ padding: "9px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {submitting ? "Saving…" : "Save Reading"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 1 && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
            {cfg.icon} {cfg.label} Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
                formatter={(val: any) => [`${val} ${cfg.unit}`, cfg.label]}
              />
              {cfg.refMax && <ReferenceLine y={cfg.refMax} stroke="#fca5a5" strokeDasharray="4 4" label={{ value: `Max ${cfg.refMax}`, fontSize: 10, fill: "#dc2626" }} />}
              {cfg.refMin && <ReferenceLine y={cfg.refMin} stroke="#86efac" strokeDasharray="4 4" label={{ value: `Min ${cfg.refMin}`, fontSize: 10, fill: "#16a34a" }} />}
              <Line type="monotone" dataKey="value" stroke={cfg.color} strokeWidth={2.5} dot={{ r: 4, fill: cfg.color }} activeDot={{ r: 6 }} />
              {chartType === "blood_pressure" && (
                <Line type="monotone" dataKey="value2" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: "#f97316" }} strokeDasharray="5 3" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Readings list */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 8, alignItems: "center", overflowX: "auto" }}>
          <button
            id="vital-filter-all"
            onClick={() => setActiveTab("all")}
            style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: activeTab === "all" ? "#0f766e" : "#f1f5f9", color: activeTab === "all" ? "white" : "#64748b", flexShrink: 0 }}
          >
            All Readings
          </button>
          {(Object.entries(VITAL_CONFIGS) as [VitalType, typeof VITAL_CONFIGS[VitalType]][]).map(([type, c]) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, flexShrink: 0, background: activeTab === type ? c.color : "#f1f5f9", color: activeTab === type ? "white" : "#64748b" }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filteredVitals.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "#94a3b8" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
              <p style={{ margin: 0 }}>No readings yet. Log your first vital above.</p>
            </div>
          ) : (
            filteredVitals.map((vital, i) => {
              const c = VITAL_CONFIGS[vital.type];
              return (
                <div key={vital.id} style={{ padding: "14px 20px", borderBottom: i < filteredVitals.length - 1 ? "1px solid #f8fafc" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{c.label}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                      {vital.context && `${vital.context} · `}
                      {format(new Date(vital.recordedAt), "d MMM yyyy, h:mm a")}
                      {vital.recordedByName && ` · By ${vital.recordedByName}`}
                    </div>
                    {vital.notes && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{vital.notes}</div>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: vital.isAbnormal ? "#dc2626" : "#0f172a" }}>
                      {vital.value}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{c.unit}</div>
                    {vital.isAbnormal && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#dc2626", background: "#fef2f2", padding: "1px 6px", borderRadius: 20, border: "1px solid #fecaca" }}>⚠ Alert</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
