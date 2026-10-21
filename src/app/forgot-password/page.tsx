"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8faf9", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "white", borderRadius: "24px", border: "1px solid #e2e8f0", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "#0f766e", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "12px" }}>
            <span style={{ fontSize: "24px" }}>🔑</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", margin: "0 0 6px" }}>Reset Password</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Enter your email to receive recovery instructions</p>
        </div>

        {submitted ? (
          <div style={{ backgroundColor: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>✉️</span>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f766e", margin: "0 0 8px" }}>Recovery Link Dispatched</h3>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5", margin: "0 0 16px" }}>
              If an account with <strong>{email}</strong> exists, password reset verification has been delivered. For demonstration accounts (e.g. ramakant@orbicare.demo), default password is <strong>orbicare123</strong>.
            </p>
            <Link
              href="/login"
              style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#0f766e", color: "white", borderRadius: "10px", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>Registered Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "14px",
                backgroundColor: "#0f766e",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(15, 118, 110, 0.25)",
              }}
            >
              Send Reset Instructions
            </button>

            <div style={{ textAlign: "center", marginTop: "12px", fontSize: "14px", color: "#64748b" }}>
              Remembered your credentials?{" "}
              <Link href="/login" style={{ color: "#0f766e", fontWeight: "700", textDecoration: "none" }}>
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
