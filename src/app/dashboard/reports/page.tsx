import { getCurrentUserFromCookies } from "@/lib/auth";
import { db } from "@/db/storage";
import { redirect } from "next/navigation";


export default async function ReportsPage() {
  const user = await getCurrentUserFromCookies();
  if (!user) redirect("/login");
  const reports = db.getMedicalReports(user.patientId || user.id);

  const DOC_ICONS: Record<string, string> = {
    "Blood Test": "🩸",
    "Lipid Profile": "🧪",
    "ECG": "📊",
    "Prescription": "📋",
    "Discharge Summary": "🏥",
    "Scan Report": "🔬",
    "Other": "📄",
  };

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>📄 Medical Reports</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{reports.length} documents on file</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reports.length === 0 ? (
          <div style={{ background: "white", borderRadius: 14, padding: 48, textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
            <h3 style={{ margin: "0 0 8px", color: "#0f172a" }}>No Reports Yet</h3>
            <p style={{ margin: 0 }}>Medical reports will appear here once uploaded.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "18px 20px", borderBottom: report.aiSummary ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                    {DOC_ICONS[report.documentType] || "📄"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{report.title}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "#f0fdfa", color: "#0f766e", border: "1px solid #99f6e4" }}>
                        {report.documentType}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                      📅 {report.documentDate} · 📦 {report.fileSize} · Shared with {report.sharedWithUserIds.length} contacts
                    </div>
                  </div>
                  <a
                    href={report.fileUrl}
                    style={{ padding: "8px 14px", background: "#f0fdfa", color: "#0f766e", border: "1px solid #99f6e4", borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: 700, flexShrink: 0 }}
                  >
                    📥 Download
                  </a>
                </div>
              </div>

              {report.aiSummary && (
                <div style={{ padding: "14px 20px", background: "linear-gradient(135deg, #f0fdfa 0%, #f8fffe 100%)", borderTop: "1px solid #e0fdf4" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#0f766e", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>AI Summary</div>
                      <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{report.aiSummary}</p>
                    </div>
                  </div>
                </div>
              )}

              {report.extractedText && (
                <details style={{ borderTop: "1px solid #f1f5f9" }}>
                  <summary style={{ padding: "10px 20px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#64748b", userSelect: "none" }}>
                    📃 View Extracted Text
                  </summary>
                  <div style={{ padding: "0 20px 16px" }}>
                    <pre style={{ fontSize: 11, color: "#475569", background: "#f8fafc", borderRadius: 8, padding: "12px", overflowX: "auto", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                      {report.extractedText}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 20, padding: "14px 18px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: "#1e40af" }}>
          ℹ️ Document upload with AI-OCR scanning is available in the full version. Reports are automatically summarized and shared securely with your care team.
        </p>
      </div>
    </div>
  );
}
