"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [textSize, setTextSize] = useState<"normal" | "large" | "xl">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const [shareVitals, setShareVitals] = useState(true);
  const [shareMeds, setShareMeds] = useState(true);
  const [shareMeals, setShareMeals] = useState(true);
  const [shareReports, setShareReports] = useState(true);

  // Apply font size and high contrast to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-size-large", "text-size-xl");
    if (textSize === "large") root.classList.add("text-size-large");
    if (textSize === "xl") root.classList.add("text-size-xl");

    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  }, [textSize, highContrast]);

  async function handleResetDemo() {
    if (!confirm("Are you sure you want to reset the demonstration database to pristine baseline data?")) {
      return;
    }

    setResetting(true);
    setResetMessage(null);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setResetMessage("Demonstration environment has been successfully restored to clinical baseline.");
      } else {
        throw new Error(data.error || "Reset failed");
      }
    } catch (err: unknown) {
      setResetMessage(err instanceof Error ? err.message : "Failed to reset demo");
    } finally {
      setResetting(false);
    }
  }

  function handleExportData() {
    const backupData = {
      exportDate: new Date().toISOString(),
      patient: "Ramakant Sharma",
      age: 72,
      bloodGroup: "B+",
      chronicConditions: ["Hypertension", "Mild Type 2 Diabetes"],
      primaryPhysician: "Dr. Rajesh Gupta",
      primaryCaregiver: "Sunita Devi",
      primaryGuardian: "Ananya Sharma (Bengaluru)",
      system: "OrbiCare Geriatric Health Platform v1.0",
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orbicare-health-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Preferences & Security</span>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0" }}>⚙️ Platform Settings</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Senior Accessibility Preferences */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>
            👁️ Senior Accessibility & Vision
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px" }}>
            Adjust typography size and display contrast to suit aging eyes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>
                Reading Text Size
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { key: "normal", label: "Standard (16px)", sub: "Default" },
                  { key: "large", label: "Large (18px)", sub: "Recommended" },
                  { key: "xl", label: "Extra Large (20px)", sub: "Maximum Visibility" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setTextSize(opt.key as any)}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      border: textSize === opt.key ? "2px solid #0f766e" : "1px solid #cbd5e1",
                      backgroundColor: textSize === opt.key ? "#f0fdfa" : "white",
                      color: textSize === opt.key ? "#0f766e" : "#475569",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div>{opt.label}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "normal", marginTop: "2px" }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
              <div>
                <strong style={{ fontSize: "14px", color: "#0f172a", display: "block" }}>High-Contrast Display Mode</strong>
                <span style={{ fontSize: "13px", color: "#64748b" }}>Sharp black text and reinforced borders for cataract / low-vision comfort</span>
              </div>
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: highContrast ? "2px solid #0f766e" : "1px solid #cbd5e1",
                  backgroundColor: highContrast ? "#0f766e" : "#f1f5f9",
                  color: highContrast ? "white" : "#475569",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {highContrast ? "Enabled ✓" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        {/* Sharing Consents */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>
            🤝 Granular Family Sharing Permissions
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 20px" }}>
            Select what information is synchronized with Ananya Sharma and Sunita Devi.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "Share Blood Pressure & Vital Readings", state: shareVitals, setter: setShareVitals },
              { label: "Share Daily Medication Check-ins & Reminders", state: shareMeds, setter: setShareMeds },
              { label: "Share Recorded Meals & AI Nutritional Scans", state: shareMeals, setter: setShareMeals },
              { label: "Share Uploaded Medical Reports & OCR Summaries", state: shareReports, setter: setShareReports },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: idx < 3 ? "1px solid #f1f5f9" : "none" }}>
                <span style={{ fontSize: "14px", color: "#334155", fontWeight: "600" }}>{item.label}</span>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={(e) => item.setter(e.target.checked)}
                  style={{ width: "20px", height: "20px", accentColor: "#0f766e", cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Data Portability & Export */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>
            💾 Personal Health Data Portability
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px" }}>
            Download an authenticated JSON health record package to transfer to a new hospital network or primary doctor.
          </p>
          <button
            type="button"
            onClick={handleExportData}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0fdfa",
              color: "#0f766e",
              border: "1px solid #ccfbf1",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Export All Health Records (.JSON)
          </button>
        </div>

        {/* Demonstration Mode Controller */}
        <div style={{ backgroundColor: "#fef2f2", borderRadius: "20px", border: "1.5px solid #fecaca", padding: "28px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#dc2626", margin: "0 0 8px" }}>
            🧪 Demonstration Mode & Audit Reset
          </h2>
          <p style={{ fontSize: "14px", color: "#7f1d1d", margin: "0 0 16px", lineHeight: "1.5" }}>
            Reset the OrbiCare database to its original demonstration state (Mathura ↔ Bengaluru family scenario with Ramakant, Ananya, Sunita, and Dr. Rajesh Gupta).
          </p>
          
          {resetMessage && (
            <div style={{ backgroundColor: "white", border: "1px solid #fecaca", color: "#dc2626", padding: "12px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", marginBottom: "16px" }}>
              {resetMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleResetDemo}
            disabled={resetting}
            style={{
              padding: "12px 22px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: resetting ? "not-allowed" : "pointer",
              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.2)",
            }}
          >
            {resetting ? "Resetting Database…" : "🔄 Reset Demonstration Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
