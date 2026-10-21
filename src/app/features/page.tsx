import Link from "next/link";

export default function FeaturesPage() {
  const modules = [
    {
      num: "01",
      title: "Personal Dashboard",
      category: "Daily Overview",
      description: "A centralized command center offering an instant snapshot of today's medication adherence, recent vital measurements (BP, pulse, glucose), meal status, upcoming appointments, and family activity alerts.",
      features: ["Customized greetings & date context", "One-touch quick action buttons", "Daily medication progress gauge", "Latest vitals status with normal/warning indicators", "Direct emergency SOS shortcut"],
    },
    {
      num: "02",
      title: "Medication Management",
      category: "Adherence & Safety",
      description: "Comprehensive medication schedule tracking designed to eliminate missed or duplicated doses. Seniors and caregivers can record dose status (Taken, Skipped, Snoozed) in real time.",
      features: ["Scheduled dose times with meal contexts", "One-tap dose check-in with timestamps", "Active vs archived prescription views", "Physician details and refill notes", "Instant family synchronization upon intake"],
    },
    {
      num: "03",
      title: "Vitals & Trend Analytics",
      category: "Health Monitoring",
      description: "Track essential geriatric vital signs including Blood Pressure (systolic/diastolic), Resting Heart Rate, Blood Glucose (fasting & post-meal), Oxygen Saturation (SpO2), and Body Temperature.",
      features: ["Interactive trend charts powered by Recharts", "Target normal thresholds & clinical boundary markers", "Abnormal reading visual flags", "Detailed context notes (e.g. 'Fasting', 'Post-walk')", "Exportable chronological reading logs"],
    },
    {
      num: "04",
      title: "Nutrition & Meal Tracker",
      category: "Dietary Health",
      description: "Track daily meals and macronutrients to ensure aging seniors receive adequate protein, balanced carbohydrates, and dietary fiber while monitoring caloric intake.",
      features: ["Breakfast, lunch, dinner, and snack categorization", "Calorie, protein, carbohydrate, and fiber breakdowns", "Portion tracking and ingredient notes", "Daily caloric target comparison progress", "Searchable meal history"],
    },
    {
      num: "05",
      title: "AI Meal Scanner (Gemini Vision)",
      category: "Artificial Intelligence",
      description: "Point a smartphone camera or upload a meal photo to estimate nutritional values using the Google Gemini Vision API. Designed with transparent confidence metrics and clinical disclaimers.",
      features: ["Fast image recognition and food item identification", "Approximated macro calculation with fiber estimation", "Clear clinical caveat: 'Estimates only, not diagnostic'", "User editable review step before saving to history", "Demonstration engine fallback when credentials are offline"],
    },
    {
      num: "06",
      title: "Geriatric Diet Planner",
      category: "Preventive Care",
      description: "Weekly and daily nutritional planning curated for seniors managing hypertension, diabetes, or digestive sensitivities. Track planned meals versus completed consumption.",
      features: ["Day-by-day weekly meal schedules", "Target caloric benchmarks", "One-click 'Mark as Eaten' completion", "Dietary restriction flags (e.g. Low Sodium, Diabetic)", "AI nutritional suggestions and hydration reminders"],
    },
    {
      num: "07",
      title: "Medical Reports & OCR Extraction",
      category: "Document Management",
      description: "Secure digital document repository for blood tests, lipid panels, ECGs, and discharge summaries. OCR extracts laboratory values and generates AI clinical summaries.",
      features: ["Support for test reports, prescriptions, and lab panels", "Automated text extraction from lab scans", "Concise AI-synthesized clinical summaries", "Selective sharing with family and consulting doctors", "Private, authorized document access"],
    },
    {
      num: "08",
      title: "Appointments & Visits",
      category: "Care Coordination",
      description: "Schedule, coordinate, and review medical consultations, clinic appointments, and geriatric telehealth visits with reminders.",
      features: ["Clinician name, specialty, and hospital/clinic details", "In-person vs telehealth meeting link support", "Preparation notes and question reminders", "Family visibility toggle", "Past appointment history and status tracking"],
    },
    {
      num: "09",
      title: "Family Hub & Caregiver Coordination",
      category: "Connected Circle",
      description: "Connect elderly parents, children living in other cities, and visiting caregivers into a unified, respectful communication stream.",
      features: ["Live chronological family care activity feed", "Caregiver task updates and observations", "Role-based authorization (Elderly, Family, Nurse, Doctor)", "Respects senior dignity: No invasive tracking", "Immediate reassurance for remote children"],
    },
    {
      num: "10",
      title: "Configurable Alerts & Notifications",
      category: "Peace of Mind",
      description: "Intelligent in-app alert rules that flag abnormal vital readings, missed medication windows, or upcoming appointments.",
      features: ["Customizable systolic/diastolic thresholds", "Blood glucose upper and lower safety boundaries", "Categorized notifications (Medications, Vitals, Family)", "Mark individual or all notifications as read", "Caregiver notification dispatch"],
    },
    {
      num: "11",
      title: "Emergency SOS Assistance",
      category: "Critical Response",
      description: "A high-visibility, safety-first emergency assistance workflow that broadcasts instant alerts with location notes and gate codes to priority emergency contacts.",
      features: ["Priority emergency contacts list with quick call buttons", "Saved home address and emergency access gate code", "Live notification broadcast to family dashboard", "National emergency helpline dispatch links (112 / 911)", "Audit event logging with timestamped response tracking"],
    },
    {
      num: "12",
      title: "Senior Accessibility & Settings",
      category: "Usability & Dignity",
      description: "Accessible design options built for senior eyes and hands. Adjust typography, activate high-contrast mode, and manage data privacy and demo data.",
      features: ["One-touch font size switcher (Normal, Large, Extra Large)", "Senior High-Contrast mode for visual clarity", "Granular sharing consent controls", "Single-click demonstration database reset", "Profile and chronic conditions management"],
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
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px 40px", textAlign: "center" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Platform Architecture</span>
        <h1 style={{ fontSize: "40px", fontWeight: "900", color: "#0f172a", margin: "8px 0 16px" }}>The 12 Core Care Modules</h1>
        <p style={{ fontSize: "17px", color: "#64748b", lineHeight: "1.6" }}>
          Every feature in OrbiCare connects seamlessly to a shared healthcare coordination layer. When a parent logs a reading in Mathura, their daughter in Bengaluru sees it immediately.
        </p>
      </section>

      {/* Modules List */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {modules.map((m) => (
            <div key={m.num} style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", marginBottom: "12px", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px", fontWeight: "900", color: "#0f766e", backgroundColor: "#f0fdfa", padding: "4px 10px", borderRadius: "8px" }}>{m.num}</span>
                  <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>{m.title}</h2>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f766e", backgroundColor: "#e6fffa", padding: "4px 10px", borderRadius: "6px" }}>{m.category}</span>
              </div>
              <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", margin: "0 0 20px" }}>{m.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", backgroundColor: "#f8fafc", padding: "16px 20px", borderRadius: "12px" }}>
                {m.features.map((feat, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155" }}>
                    <span style={{ color: "#0f766e", fontWeight: "700" }}>✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/login"
            style={{ padding: "16px 36px", fontSize: "16px", fontWeight: "700", color: "white", backgroundColor: "#0f766e", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 16px rgba(15, 118, 110, 0.3)" }}
          >
            Launch Interactive Demo →
          </Link>
        </div>
      </section>
    </div>
  );
}
