"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EMERGENCY_CONTACTS = [
  { name: "Ananya Sharma (Daughter)", phone: "+91 98765 43210", role: "Primary Guardian", icon: "👩" },
  { name: "Sunita Devi (Nurse)", phone: "+91 94567 89012", role: "Home Care Nurse", icon: "🩺" },
  { name: "Dr. Rajesh Gupta", phone: "+91 98111 22334", role: "Consulting Cardiologist", icon: "👨‍⚕️" },
  { name: "National Ambulance", phone: "108", role: "Emergency Medical Services", icon: "🚑" },
];

type SOSState = "idle" | "confirming" | "triggering" | "active";

export default function SOSPage() {
  const [state, setState] = useState<SOSState>("idle");
  const [countdown, setCountdown] = useState(5);
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();

  function startConfirm() {
    setState("confirming");
    let count = 5;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        triggerSOS();
      }
    }, 1000);
  }

  async function triggerSOS() {
    setState("triggering");
    const res = await fetch("/api/sos", { method: "POST" });
    const data = await res.json();
    setEvent(data);
    setState("active");
  }

  function cancel() {
    setState("idle");
    setCountdown(5);
  }

  return (
    <div style={{ padding: "24px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>🚨 Emergency SOS</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
          Immediately alerts all emergency contacts and dispatches help
        </p>
      </div>

      {/* Emergency contacts */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Emergency Contacts</h2>
        </div>
        <div style={{ padding: "12px 0" }}>
          {EMERGENCY_CONTACTS.map((contact, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: i < EMERGENCY_CONTACTS.length - 1 ? "1px solid #f8fafc" : "none" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {contact.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{contact.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{contact.role}</div>
              </div>
              <a
                href={`tel:${contact.phone}`}
                style={{ fontWeight: 800, fontSize: 15, color: "#0f766e", textDecoration: "none", padding: "6px 14px", background: "#f0fdfa", borderRadius: 8, border: "1px solid #99f6e4" }}
              >
                📞 {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SOS Panel */}
      {state === "idle" && (
        <div style={{ background: "white", borderRadius: 20, border: "2px solid #fecaca", padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🚨</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#dc2626" }}>Emergency SOS</h2>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
            Press the button below if you need immediate help. All emergency contacts and local ambulance services will be alerted instantly.
          </p>
          <button
            id="trigger-sos-btn"
            onClick={startConfirm}
            style={{ padding: "18px 48px", background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "white", border: "none", borderRadius: 16, fontSize: 20, fontWeight: 900, cursor: "pointer", boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)", transition: "all 0.2s", letterSpacing: "1px" }}
          >
            🆘 TRIGGER SOS
          </button>
          <p style={{ margin: "16px 0 0", fontSize: 12, color: "#94a3b8" }}>
            You will have 5 seconds to cancel after pressing.
          </p>
        </div>
      )}

      {state === "confirming" && (
        <div style={{ background: "#fef2f2", borderRadius: 20, border: "2px solid #dc2626", padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#dc2626", lineHeight: 1, marginBottom: 12 }}>{countdown}</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "#dc2626" }}>SOS Triggering in {countdown}s…</h2>
          <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 24px" }}>All emergency contacts will be notified immediately.</p>
          <button
            id="cancel-sos-btn"
            onClick={cancel}
            style={{ padding: "14px 40px", background: "white", color: "#dc2626", border: "2px solid #dc2626", borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: "pointer" }}
          >
            ✕ CANCEL SOS
          </button>
        </div>
      )}

      {state === "triggering" && (
        <div style={{ background: "#fef2f2", borderRadius: 20, border: "2px solid #dc2626", padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📡</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "#dc2626" }}>Alerting contacts…</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Dispatching emergency notification to all contacts</p>
        </div>
      )}

      {state === "active" && event && (
        <div style={{ background: "linear-gradient(135deg, #fef2f2 0%, #fff1f2 100%)", borderRadius: 20, border: "2px solid #dc2626", padding: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#dc2626" }}>SOS Triggered!</h2>
            <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>Emergency contacts have been alerted. Help is on the way.</p>
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Alerted Contacts</h3>
            {((event.alertedContacts as {name: string; phone: string; status: string}[]) || []).map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < ((event.alertedContacts as unknown[]) || []).length - 1 ? "1px solid #f8fafc" : "none" }}>
                <span style={{ fontSize: 16 }}>✅</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{c.phone}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#0f766e", background: "#f0fdfa", padding: "2px 8px", borderRadius: 20, border: "1px solid #99f6e4" }}>
                  Dispatched
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 10 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Location Shared</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{event.locationNotes as string}</div>
            </div>
          </div>

          <div style={{ background: "#fef2f2", borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>🚑</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#dc2626" }}>Emergency Helpline</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#dc2626" }}>{event.dispatchHelpline as string}</div>
            </div>
          </div>

          <button
            id="reset-sos-btn"
            onClick={() => { setState("idle"); setEvent(null); }}
            style={{ width: "100%", padding: "14px", background: "#0f766e", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
          >
            Mark as Resolved
          </button>
        </div>
      )}

      <div style={{ marginTop: 20, padding: "14px 18px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: "#92400e" }}>
          ⚠️ <strong>Important:</strong> The SOS feature in this demo simulation notifies your emergency contacts and records the event. In a real deployment, GPS location would be automatically shared with emergency services.
        </p>
      </div>
    </div>
  );
}
