import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      step: "Step 1",
      title: "Create Care Circle & Establish Roles",
      desc: "Set up the elderly care recipient's profile (or family member initiates it). Assign specific roles: Elderly Care Recipient, Family Member, Visiting Caregiver, or Physician. Granular sharing preferences ensure privacy is respected from day one.",
      icon: "👨‍👩‍👧",
    },
    {
      step: "Step 2",
      title: "Set Daily Medication & Health Schedules",
      desc: "Input prescribed medications (dosage, timings like 08:00 AM, special meal instructions, and prescribing doctor). Configure vital tracking preferences (e.g. daily morning blood pressure or fasting glucose).",
      icon: "💊",
    },
    {
      step: "Step 3",
      title: "Senior Logs Daily Activities with Simplicity",
      desc: "Designed for elderly hands and eyes. Senior taps large check-in buttons: 'Take Telmisartan', enters simple numbers for blood pressure, or snaps a photo of their lunch for instant AI nutrition estimates.",
      icon: "📱",
    },
    {
      step: "Step 4",
      title: "Real-Time Family Peace of Mind Across Cities",
      desc: "When a dose is logged or vitals recorded in Mathura, the adult daughter in Bengaluru receives an immediate confirmation on her dashboard feed. No nagging phone calls, no forgotten reminders.",
      icon: "🏙️",
    },
    {
      step: "Step 5",
      title: "Safety Rules & Intelligent Alerts",
      desc: "If a blood pressure reading exceeds configured safe thresholds (e.g. systolic > 140 mmHg) or a critical dose is overdue, the system generates an alert visible to caregivers and family.",
      icon: "🔔",
    },
    {
      step: "Step 6",
      title: "Clinician Collaboration & Exportable Summaries",
      desc: "During regular checkups, Dr. Rajesh Gupta or family can review chronological trends, lab report OCR extracts, and 30-day adherence rates. Export clean health summaries with a single click.",
      icon: "🩺",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fbfcfb", color: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
            ❤️
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.5px" }}>ORBICARE</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" style={{ fontSize: "14px", fontWeight: "600", color: "#475569", textDecoration: "none" }}>← Back to Home</Link>
          <Link href="/login" style={{ padding: "8px 18px", fontSize: "14px", fontWeight: "700", color: "white", backgroundColor: "#0f766e", borderRadius: "8px", textDecoration: "none" }}>
            Live Demo
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 40px", textAlign: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Workflow Guide</span>
        <h1 style={{ fontSize: "40px", fontWeight: "900", color: "#0f172a", margin: "8px 0 16px" }}>How OrbiCare Connects Family Care</h1>
        <p style={{ fontSize: "17px", color: "#64748b", lineHeight: "1.6" }}>
          Bridging the distance between parents living at home and children working in other cities through respectful, reliable coordination.
        </p>
      </section>

      {/* Steps */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {steps.map((s, idx) => (
            <div key={idx} style={{ backgroundColor: "white", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "28px", display: "flex", gap: "24px", alignItems: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", backgroundColor: "#f0fdfa", border: "1.5px solid #ccfbf1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase" }}>{s.step}</span>
                <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#0f172a", margin: "4px 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/login"
            style={{ padding: "16px 36px", fontSize: "16px", fontWeight: "700", color: "white", backgroundColor: "#0f766e", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 16px rgba(15, 118, 110, 0.3)" }}
          >
            Experience the Live Demo Flow →
          </Link>
        </div>
      </section>
    </div>
  );
}
