import { getCurrentUserFromCookies } from "@/lib/auth";
import { db } from "@/db/storage";
import { redirect } from "next/navigation";


const ROLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  elderly: { bg: "#f0fdfa", text: "#0f766e", border: "#99f6e4" },
  family: { bg: "#faf5ff", text: "#7c3aed", border: "#c4b5fd" },
  caregiver: { bg: "#eff6ff", text: "#0369a1", border: "#93c5fd" },
  doctor: { bg: "#fffbeb", text: "#b45309", border: "#fcd34d" },
};

const ROLE_LABELS: Record<string, string> = {
  elderly: "Care Recipient",
  family: "Family Member",
  caregiver: "Caregiver",
  doctor: "Physician",
};

export default async function ProfilePage() {
  const user = await getCurrentUserFromCookies();
  if (!user) redirect("/login");
  const profile = db.getProfileByUserId(user.id);
  const roleStyle = ROLE_COLORS[user.role] || ROLE_COLORS.elderly;

  return (
    <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>⚙️ Profile & Settings</h1>
      </div>

      {/* Profile card */}
      <div style={{ background: "white", borderRadius: 20, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)", padding: "32px 28px", display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f766e&color=fff&size=120`}
            alt={user.name}
            style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)", flexShrink: 0 }}
          />
          <div style={{ color: "white" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>{user.name}</h2>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 10 }}>{user.email}</div>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", background: "rgba(255,255,255,0.2)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.3)" }}>
              {ROLE_LABELS[user.role]}
            </span>
          </div>
        </div>
        <div style={{ padding: "20px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "📞 Phone", value: user.phone || "Not set" },
              { label: "🏙️ City", value: user.city || "Not set" },
              { label: "🗺️ State", value: user.state || "Not set" },
              { label: "🔗 Relationship", value: user.relationshipToPatient || "—" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical profile */}
      {profile && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>🏥 Medical Profile</h2>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>Age</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{profile.age}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>Gender</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{profile.gender}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>Blood Group</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#dc2626" }}>{profile.bloodGroup}</div>
              </div>
            </div>

            {profile.chronicConditions && profile.chronicConditions.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>Chronic Conditions</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {profile.chronicConditions.map((c) => (
                    <span key={c} style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.allergies && profile.allergies.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>Allergies</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {profile.allergies.map((a) => (
                    <span key={a} style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" }}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            {profile.emergencyAddress && (
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>📍 Emergency Address</div>
                <div style={{ fontSize: 13, color: "#374151" }}>{profile.emergencyAddress}</div>
                {profile.emergencyGateCode && (
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>🔑 {profile.emergencyGateCode}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preferences */}
      {profile && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>♿ Accessibility Preferences</h2>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Preferred Language", value: profile.preferredLanguage || "English", icon: "🌐" },
              { label: "Text Size", value: profile.textSizePreference || "normal", icon: "🔤" },
              { label: "High Contrast", value: profile.highContrast ? "Enabled" : "Disabled", icon: "🌓" },
            ].map((pref) => (
              <div key={pref.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#f8fafc", borderRadius: 10 }}>
                <span style={{ fontSize: 20 }}>{pref.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{pref.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", textTransform: "capitalize" }}>{pref.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
