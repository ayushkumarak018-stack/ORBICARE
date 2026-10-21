"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AiHealthSummaryResult } from "@/lib/gemini";

export default function HealthInsightsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    summary: AiHealthSummaryResult;
    metrics: {
      patientName: string;
      adherenceRate: number;
      avgSystolic: number;
      avgDiastolic: number;
      avgGlucose: number;
      totalVitalsLogged: number;
      totalMedicationsActive: number;
    };
  } | null>(null);

  async function loadInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/health-summary");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load health summary", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInsights();
  }, []);

  function handlePrint() {
    window.print();
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Clinical Analytics</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0" }}>📊 Health Insights & Doctor Summary</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handlePrint}
            style={{
              padding: "10px 18px",
              backgroundColor: "white",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#334155",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🖨️</span>
            <span>Export / Print Summary</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div style={{ backgroundColor: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "14px", padding: "14px 18px", marginBottom: "28px", display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "22px" }}>🛡️</span>
        <div style={{ fontSize: "13px", color: "#134e4a", lineHeight: "1.5" }}>
          <strong>Informational Health Synthesis:</strong> Synthesized automatically from recorded vitals, medication check-ins, and lab documents. Share this summary with Dr. Rajesh Gupta or your primary physician during routine consultations.
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          <div style={{ fontSize: "36px" }}>📊</div>
          <div style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>Synthesizing clinical trends…</div>
        </div>
      ) : data ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Top Key Metrics Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Medication Adherence</span>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#0f766e", margin: "6px 0 2px" }}>
                {data.metrics.adherenceRate}%
              </div>
              <span style={{ fontSize: "12px", color: "#059669", fontWeight: "600" }}>✓ Excellent Compliance</span>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Average Blood Pressure</span>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "6px 0 2px" }}>
                {data.metrics.avgSystolic}/{data.metrics.avgDiastolic}
              </div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>mmHg · Controlled</span>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Fasting Blood Sugar</span>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "6px 0 2px" }}>
                {data.metrics.avgGlucose}
              </div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>mg/dL · Stable</span>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>Active Care Circle</span>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "#7c3aed", margin: "6px 0 2px" }}>
                4 Members
              </div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Patient, Daughter, Nurse, MD</span>
            </div>
          </div>

          {/* Clinical Overview Report */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1.5px solid #0f766e", padding: "32px", boxShadow: "0 4px 16px rgba(15,118,110,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>OrbiCare Clinical Synthesis</span>
                <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "4px 0 0" }}>Patient Health & Adherence Dossier</h2>
              </div>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Patient: <strong>{data.metrics.patientName}</strong> (Mathura)</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14px", lineHeight: "1.6", color: "#334155" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>1. Executive Summary</h3>
                <p style={{ margin: 0, color: "#475569" }}>{data.summary.overview}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>2. Cardiovascular & Vitals Stability</h3>
                <p style={{ margin: 0, color: "#475569" }}>{data.summary.vitalsAnalysis}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>3. Medication Routine & Adherence</h3>
                <p style={{ margin: 0, color: "#475569" }}>{data.summary.medicationAdherenceNote}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>4. Dietary & Lifestyle Observations</h3>
                <p style={{ margin: 0, color: "#475569" }}>{data.summary.dietaryObservation}</p>
              </div>

              {/* Doctor Questions */}
              <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#0f766e", margin: "0 0 10px" }}>
                  💡 Suggested Discussion Questions for Dr. Rajesh Gupta:
                </h3>
                <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.summary.suggestedDoctorQuestions.map((q, idx) => (
                    <li key={idx} style={{ fontSize: "13px", color: "#334155" }}>
                      <strong>Q{idx + 1}:</strong> {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>
              {data.summary.disclaimer}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
