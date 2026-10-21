import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fbfcfb", color: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#0f766e", color: "white", padding: "8px 16px", textAlign: "center", fontSize: "13px", fontWeight: "500", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
        <span>✨ Experience OrbiCare v1.0 — Dedicated to Caring for Parents Beyond Distance</span>
        <Link href="/login" style={{ color: "#ccfbf1", textDecoration: "underline", fontWeight: "700" }}>
          Launch Live Demo →
        </Link>
      </div>

      {/* Navigation */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 12px rgba(15, 118, 110, 0.25)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div>
            <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px", color: "#0f172a" }}>ORBICARE</span>
            <span style={{ display: "block", fontSize: "11px", color: "#0f766e", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Connected Health</span>
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
          <Link href="/features" style={{ fontSize: "15px", fontWeight: "500", color: "#475569", textDecoration: "none" }}>Features</Link>
          <Link href="/how-it-works" style={{ fontSize: "15px", fontWeight: "500", color: "#475569", textDecoration: "none" }}>How It Works</Link>
          <Link href="/privacy" style={{ fontSize: "15px", fontWeight: "500", color: "#475569", textDecoration: "none" }}>Privacy & Safety</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/login"
            style={{ padding: "9px 18px", fontSize: "14px", fontWeight: "600", color: "#0f766e", backgroundColor: "#f0fdfa", border: "1px solid #ccfbf1", borderRadius: "10px", textDecoration: "none" }}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            style={{ padding: "9px 20px", fontSize: "14px", fontWeight: "700", color: "white", backgroundColor: "#0f766e", borderRadius: "10px", textDecoration: "none", boxShadow: "0 2px 8px rgba(15, 118, 110, 0.25)" }}
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", backgroundColor: "#e6fffa", border: "1px solid #99f6e4", borderRadius: "999px", fontSize: "13px", color: "#0f766e", fontWeight: "700", marginBottom: "24px" }}>
            <span>❤️ AI-Assisted Geriatric Care & Remote Family Coordination</span>
          </div>

          <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: "900", lineHeight: "1.15", letterSpacing: "-1.5px", color: "#0f172a", margin: "0 0 20px" }}>
            Caring Beyond Distance. <br />
            <span style={{ color: "#0f766e" }}>Connected Through Care.</span>
          </h1>

          <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#475569", margin: "0 auto 36px", maxWidth: "680px" }}>
            OrbiCare connects aging parents with their remote children, visiting caregivers, and physicians. Track vital readings, manage medication schedules, estimate nutrition via AI vision, and synchronize peace of mind across cities.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", marginBottom: "48px" }}>
            <Link
              href="/login"
              id="hero-demo-btn"
              style={{ padding: "14px 28px", fontSize: "16px", fontWeight: "700", color: "white", backgroundColor: "#0f766e", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 14px rgba(15, 118, 110, 0.35)", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>🚀 Launch Interactive Demo</span>
            </Link>
            <Link
              href="/features"
              style={{ padding: "14px 26px", fontSize: "16px", fontWeight: "600", color: "#334155", backgroundColor: "white", border: "1px solid #cbd5e1", borderRadius: "12px", textDecoration: "none" }}
            >
              Explore 12 Care Modules
            </Link>
          </div>

          {/* Clinical Caveat Notice */}
          <div style={{ display: "inline-block", padding: "10px 18px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px", color: "#64748b" }}>
            🛡️ <strong>Safety First:</strong> OrbiCare assists family care coordination. It is not an automated medical diagnostic tool or a substitute for emergency services.
          </div>
        </div>

        {/* Live Synchronized Scenario Preview Card */}
        <div style={{ marginTop: "54px", backgroundColor: "white", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 20px 40px -15px rgba(15, 118, 110, 0.08)", padding: "32px", overflow: "hidden" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "20px", marginBottom: "24px", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Live Family Coordination Scenario</span>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "4px 0 0" }}>The Sharma Family (Mathura ↔ Bengaluru)</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }}></span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#059669" }}>Live Synchronized</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {/* Elderly Parent Card */}
            <div style={{ backgroundColor: "#f0fdfa", border: "1.5px solid #99f6e4", borderRadius: "18px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "32px" }}>👴</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0f766e" }}>Ramakant Sharma (Age 72)</h4>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Home in Mathura, UP · Care Recipient</span>
                </div>
              </div>
              <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "14px", border: "1px solid #ccfbf1", marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Morning Routine Completed:</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#0f172a", fontWeight: "600" }}>
                  <span>✅ Breakfast: Steel-Cut Oats with Papaya (340 kcal)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#0f172a", fontWeight: "600", marginTop: "4px" }}>
                  <span>✅ Telmisartan 40mg taken at 08:12 AM</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#0f766e", fontWeight: "700" }}>
                <span>BP: 124/80 mmHg (Normal)</span>
                <span>SpO2: 98%</span>
              </div>
            </div>

            {/* Remote Family Member Card */}
            <div style={{ backgroundColor: "#faf5ff", border: "1.5px solid #e9d5ff", borderRadius: "18px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "32px" }}>👩</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#7c3aed" }}>Ananya Sharma</h4>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Software Lead in Bengaluru · Daughter</span>
                </div>
              </div>
              <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "14px", border: "1px solid #f3e8ff", marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Daughter's Real-Time Feed:</div>
                <div style={{ fontSize: "13px", color: "#0f172a", lineHeight: "1.4" }}>
                  &quot;Dad confirmed morning BP 124/80 and Telmisartan on schedule. Peace of mind confirmed without interrupting his morning walk.&quot;
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#7c3aed", fontWeight: "700" }}>
                <span>Status: Fully In Sync</span>
                <span>Next Dose: 08:30 PM</span>
              </div>
            </div>

            {/* Visiting Nurse & Doctor Card */}
            <div style={{ backgroundColor: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: "18px", padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "32px" }}>🩺</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0284c7" }}>Sunita Devi & Dr. Rajesh Gupta</h4>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Visiting Nurse & Consulting Cardiologist</span>
                </div>
              </div>
              <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "14px", border: "1px solid #e0f2fe", marginBottom: "12px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Clinical Coordination:</div>
                <div style={{ fontSize: "13px", color: "#0f172a", lineHeight: "1.4" }}>
                  Sunita verified weekly vitals log. Dr. Rajesh reviewed latest HbA1c (6.8%) with no medication adjustments required.
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#0284c7", fontWeight: "700" }}>
                <span>Next Checkup: Nov 15</span>
                <span>Adherence: 95%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "72px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#dc2626" }}>The Real Challenge</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "8px 0 16px" }}>Why Caring for Aging Parents Across Cities Is Hard</h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6" }}>
              Millions of adult children work far from home while their parents age independently. Caring from a distance is fraught with blind spots, fragmented paper records, and daily anxiety.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              { icon: "📉", title: "Fragmented Health Records", desc: "Vitals written on loose paper slips, prescriptions misplaced, and lab tests scattered across WhatsApp chats." },
              { icon: "💊", title: "Medication Hesitation", desc: "Uncertainty whether blood pressure or diabetes tablets were taken on time, forgotten, or doubled by accident." },
              { icon: "🥗", title: "Nutritional Gaps", desc: "Elderly seniors eating irregular, carb-heavy meals without adequate fiber or protein, leading to blood sugar spikes." },
              { icon: "🚨", title: "Emergency Uncertainty", desc: "Worrying who will be notified first and if the gate code, medical history, or emergency contacts are accessible." }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "white", padding: "28px", borderRadius: "18px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 10px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.5", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How OrbiCare Solves It - 3 Step Flow */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 54px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Seamless Daily Experience</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "8px 0 16px" }}>How OrbiCare Works Every Day</h2>
          <p style={{ fontSize: "16px", color: "#64748b" }}>Designed specifically with elderly accessibility in mind, backed by smart AI support for family members.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
          {[
            { step: "01", title: "Senior Logs Simply", desc: "With extra-large text and one-tap buttons, the elderly parent logs breakfast, takes their morning tablet, and enters their BP reading.", badge: "Accessibility First" },
            { step: "02", title: "AI Validates & Analyzes", desc: "Gemini Vision estimates meal macros and fiber. Lab OCR reads blood test reports. Configured rules monitor for any BP or glucose flags.", badge: "Replaceable AI Layer" },
            { step: "03", title: "Family Stays Reassured", desc: "Authorized family members and caregivers receive peaceful real-time confirmations without invasive phone calls during meetings.", badge: "Caregiver Sync" }
          ].map((s, idx) => (
            <div key={idx} style={{ backgroundColor: "white", borderRadius: "20px", padding: "32px", border: "1.5px solid #e2e8f0", position: "relative" }}>
              <div style={{ fontSize: "36px", fontWeight: "900", color: "#0f766e", opacity: 0.25, marginBottom: "12px" }}>{s.step}</div>
              <span style={{ display: "inline-block", padding: "4px 10px", backgroundColor: "#f0fdfa", color: "#0f766e", fontSize: "11px", fontWeight: "700", borderRadius: "6px", marginBottom: "12px" }}>{s.badge}</span>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12 Core Modules Grid */}
      <section style={{ backgroundColor: "#f0fdfa", borderTop: "1px solid #ccfbf1", borderBottom: "1px solid #ccfbf1", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 52px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Comprehensive Health Suite</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "8px 0 16px" }}>12 Integrated Care Modules</h2>
            <p style={{ fontSize: "16px", color: "#64748b" }}>Built as a unified platform where every action synchronizes your family&apos;s care circle.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              { icon: "🏠", title: "1. Personal Dashboard", desc: "Greeting, today's schedule, quick stats, active alerts, and instant care shortcuts." },
              { icon: "🥗", title: "2. Meal Tracker", desc: "Log meals with portions, ingredients, calories, protein, carbs, and fiber balance." },
              { icon: "📸", title: "3. AI Meal Scanner", desc: "Vision-based nutritional estimation with Gemini API and clear clinical caveats." },
              { icon: "💊", title: "4. Medication Manager", desc: "Dosages, schedules, intake logs (taken/skipped), reminders, and doctor notes." },
              { icon: "🩺", title: "5. Vitals & Trends", desc: "Blood pressure, glucose, SpO2, heart rate, interactive charts, and safety rules." },
              { icon: "📄", title: "6. Medical Reports & OCR", desc: "Secure document storage, OCR text extraction, and AI clinical summaries." },
              { icon: "📅", title: "7. Diet Planner", desc: "Geriatric meal recommendations, daily/weekly plans, and completion tracking." },
              { icon: "🗓️", title: "8. Appointments", desc: "Clinician visits, telehealth links, dates, and family notifications." },
              { icon: "👨‍👩‍👧", title: "9. Family Hub", desc: "Activity feed, care updates, shared records, and authorized coordination." },
              { icon: "🔔", title: "10. Notifications & Alerts", desc: "Configurable health alerts, dosage reminders, and notification center." },
              { icon: "🚨", title: "11. Emergency SOS", desc: "One-touch alert broadcast, priority contacts dispatch, and location notes." },
              { icon: "⚙️", title: "12. Settings & Access", desc: "Elderly high-contrast, large text preference, sharing permissions, and demo reset." }
            ].map((m, idx) => (
              <div key={idx} style={{ backgroundColor: "white", borderRadius: "16px", padding: "22px", border: "1px solid #ccfbf1", boxShadow: "0 2px 6px rgba(15,118,110,0.03)" }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{m.icon}</div>
                <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px" }}>{m.title}</h4>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5", margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elderly Accessibility & Dignity */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Accessibility & Dignity</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "10px 0 20px" }}>Designed with Love for Aging Hands & Eyes</h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6", marginBottom: "20px" }}>
              Most modern apps are too cluttered, with tiny fonts and confusing menus. OrbiCare is intentionally crafted to honor elderly independence.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Large 16–20px comfortable default typography with one-touch font sizing.",
                "High-contrast color modes tailored for senior citizens with cataracts or vision impairment.",
                "Large 48px+ touch-friendly buttons that are easy to press without accidental taps.",
                "Simple, respectful language without medical jargon or confusing error codes.",
                "Consent-driven sharing: Seniors choose exactly what information their children can see."
              ].map((point, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#334155" }}>
                  <span style={{ color: "#0f766e", fontWeight: "800" }}>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ backgroundColor: "#f8fafc", borderRadius: "24px", padding: "32px", border: "1px solid #e2e8f0" }}>
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "20px", border: "1.5px solid #0f766e", boxShadow: "0 8px 24px rgba(15,118,110,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f766e" }}>Senior High-Contrast Mode</span>
                <span style={{ fontSize: "11px", backgroundColor: "#e6fffa", color: "#0f766e", padding: "3px 8px", borderRadius: "6px", fontWeight: "700" }}>Active</span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>Did you take your Telmisartan tablet?</div>
              <p style={{ fontSize: "14px", color: "#475569", margin: "0 0 16px" }}>Scheduled for 08:00 AM · Prescribed by Dr. Rajesh Gupta</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button style={{ flex: 1, padding: "14px", backgroundColor: "#0f766e", color: "white", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
                  ✅ Yes, I Took It
                </button>
                <button style={{ padding: "14px 20px", backgroundColor: "#f1f5f9", color: "#475569", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "72px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Answers</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: "8px 0 12px" }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { q: "Is OrbiCare a substitute for medical doctors or emergency 112/911 dispatch?", a: "No. OrbiCare is explicitly a care-coordination and health-tracking platform. AI features provide nutritional estimates and report OCR assistance, not medical diagnosis or prescriptions. In true emergencies, always contact local emergency services immediately." },
              { q: "Can my parents use OrbiCare without being tech-savvy?", a: "Yes. OrbiCare features ultra-simple large buttons, optional voice/photo logging, large fonts, and high-contrast modes. Family members in other cities can configure medication schedules and reminder times remotely." },
              { q: "What happens if external AI credentials are not configured?", a: "OrbiCare incorporates a resilient demonstration engine. If the Gemini API key is not present, the app gracefully demonstrates meal analysis and OCR using realistic clinical sample datasets without crashing or making false claims." },
              { q: "How are patient privacy and sharing permissions controlled?", a: "Every record respects role-based authorization. Elderly users and legal guardians have granular control over who can view medication logs, vitals, and medical reports. Sharing permissions can be revoked at any time." }
            ].map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: "white", padding: "20px 24px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>{faq.q}</h4>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8", padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                ❤️
              </div>
              <span style={{ fontSize: "18px", fontWeight: "800", color: "white" }}>ORBICARE</span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#94a3b8" }}>
              &quot;Caring Beyond Distance. Connected Through Care.&quot; <br />
              Empowering families to care for their elderly parents safely, with dignity and peace of mind.
            </p>
          </div>

          <div>
            <h5 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 16px" }}>Platform</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li><Link href="/features" style={{ color: "#94a3b8", textDecoration: "none" }}>All Features</Link></li>
              <li><Link href="/how-it-works" style={{ color: "#94a3b8", textDecoration: "none" }}>How It Works</Link></li>
              <li><Link href="/login" style={{ color: "#94a3b8", textDecoration: "none" }}>Live Interactive Demo</Link></li>
              <li><Link href="/register" style={{ color: "#94a3b8", textDecoration: "none" }}>Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 16px" }}>Safety & Legal</h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li><Link href="/privacy" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Principles</Link></li>
              <li><Link href="/privacy#data-retention" style={{ color: "#94a3b8", textDecoration: "none" }}>Data Retention & Consent</Link></li>
              <li><Link href="/privacy#ai-limitations" style={{ color: "#94a3b8", textDecoration: "none" }}>AI Clinical Disclaimers</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 16px" }}>Emergency Disclaimer</h5>
            <p style={{ fontSize: "12px", lineHeight: "1.5", color: "#64748b", margin: 0 }}>
              OrbiCare is not a certified medical device and does not diagnose disease or replace emergency services. In case of acute medical distress, dial 112 (India), 911 (US/Canada), or your local emergency dispatch immediately.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid #1e293b", paddingTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#64748b" }}>
          <div>© {new Date().getFullYear()} OrbiCare Platform. All rights reserved.</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/privacy" style={{ color: "#64748b", textDecoration: "none" }}>Privacy</Link>
            <Link href="/features" style={{ color: "#64748b", textDecoration: "none" }}>Features</Link>
            <Link href="/login" style={{ color: "#64748b", textDecoration: "none" }}>Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
