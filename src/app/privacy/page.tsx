import Link from "next/link";

export default function PrivacyPage() {
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

      {/* Main Content */}
      <main style={{ maxWidth: "840px", margin: "0 auto", padding: "60px 24px 80px" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Trust & Ethics</span>
        <h1 style={{ fontSize: "38px", fontWeight: "900", color: "#0f172a", margin: "8px 0 20px" }}>Privacy & Safety Principles</h1>
        <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.6", marginBottom: "40px" }}>
          Elderly health information is among the most sensitive personal data. OrbiCare is built with an unwavering commitment to senior dignity, privacy, and transparent AI boundaries.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Section 1 */}
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "18px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px" }}>1. Patient Consent & Granular Sharing</h2>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              The senior citizen (or their designated legal health proxy) maintains absolute control over what is shared and with whom. Being a family member does not automatically confer unrestricted access to sensitive medical documents. Elderly users can choose whether to share meal records, vital signs, medication logs, or medical reports with specific individuals, and this access can be revoked at any time.
            </p>
          </div>

          {/* Section 2 */}
          <div id="ai-limitations" style={{ backgroundColor: "#fffbeb", padding: "30px", borderRadius: "18px", border: "1px solid #fde68a" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#b45309", margin: "0 0 12px" }}>2. AI Safety Boundaries & Non-Diagnostic Principles</h2>
            <p style={{ fontSize: "14px", color: "#78350f", lineHeight: "1.6", margin: "0 0 12px" }}>
              <strong>Important Clinical Disclaimer:</strong> Artificial intelligence features within OrbiCare (such as the Gemini Vision Meal Scanner and OCR report extraction) are assistive informational tools, not licensed medical devices.
            </p>
            <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "#78350f", lineHeight: "1.6" }}>
              <li>AI-generated nutritional values are approximate estimates and should not be used as strict clinical diabetic dosing calculations without medical oversight.</li>
              <li>OrbiCare does not diagnose cardiovascular conditions, predict strokes, or independently prescribe medications.</li>
              <li>Always seek the counsel of a qualified physician (like Dr. Rajesh Gupta) for clinical questions.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "18px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px" }}>3. Data Minimization & Zero Data Selling</h2>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              OrbiCare operates under a zero-data-monetization policy. We do not sell health data, medication histories, or dietary logs to third-party advertisers, insurance underwriters, or data brokers. Data collected is strictly used to power your family&apos;s care coordination circle.
            </p>
          </div>

          {/* Section 4 */}
          <div id="data-retention" style={{ backgroundColor: "white", padding: "30px", borderRadius: "18px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px" }}>4. Data Retention & Right to Erasure</h2>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Users maintain the right to review, export, or permanently delete their personal health logs and uploaded medical documents. The platform provides full data export capabilities for sharing with new physicians or hospital networks.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ backgroundColor: "#fef2f2", padding: "30px", borderRadius: "18px", border: "1px solid #fecaca" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#dc2626", margin: "0 0 12px" }}>5. Emergency Dispatch Protocols</h2>
            <p style={{ fontSize: "14px", color: "#991b1b", lineHeight: "1.6", margin: 0 }}>
              OrbiCare&apos;s Emergency SOS feature notifies configured family members and local caregivers with location notes and access codes. However, OrbiCare is not a 911/112 public safety answering point (PSAP). In the event of chest pain, shortness of breath, loss of consciousness, or acute trauma, dial emergency medical services (112 in India, 911 in USA/Canada, 999 in UK) immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
