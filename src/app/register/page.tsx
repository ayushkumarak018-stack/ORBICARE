"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "elderly",
    phone: "",
    city: "",
    state: "",
    relationshipToPatient: "",
    bloodGroup: "B+",
    chronicConditions: "Hypertension, Mild Type 2 Diabetes",
    allergies: "Penicillin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8faf9", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "620px", backgroundColor: "white", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "#0f766e", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "12px" }}>
            <span style={{ fontSize: "24px" }}>❤️</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "0 0 6px" }}>Create OrbiCare Account</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Join your family care coordination platform</p>
        </div>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", marginBottom: "24px", display: "flex", gap: "8px", alignItems: "center" }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Role selector */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>
              Select Your Role in the Care Circle *
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
              {[
                { role: "elderly", label: "👴 Senior Parent (Care Recipient)" },
                { role: "family", label: "👩 Family Member (Daughter / Son)" },
                { role: "caregiver", label: "🩺 Visiting Nurse / Caregiver" },
                { role: "doctor", label: "👨‍⚕️ Physician / Cardiologist" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.role}
                  onClick={() => setFormData({ ...formData, role: item.role })}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: formData.role === item.role ? "2px solid #0f766e" : "1px solid #e2e8f0",
                    backgroundColor: formData.role === item.role ? "#f0fdfa" : "white",
                    color: formData.role === item.role ? "#0f766e" : "#475569",
                    fontWeight: "700",
                    fontSize: "13px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Name & Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramakant Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Email Address *</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Password *</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Confirm Password *</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* City & State */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>City</label>
              <input
                type="text"
                placeholder="e.g. Mathura or Bengaluru"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Health Conditions for Senior */}
          {formData.role === "elderly" && (
            <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase" }}>Health Context (Optional)</span>
              <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>Known Allergies</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="e.g. Penicillin, Sulfa"
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px",
              backgroundColor: "#0f766e",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
              boxShadow: "0 4px 12px rgba(15, 118, 110, 0.25)",
            }}
          >
            {loading ? "Creating Account…" : "Complete Registration & Launch Dashboard"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#64748b" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#0f766e", fontWeight: "700", textDecoration: "none" }}>
            Sign In or Launch Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
