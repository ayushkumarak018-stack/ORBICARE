"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DEMO_PERSONAS = [
  {
    userId: "user-ramakant-01",
    name: "Ramakant Sharma",
    role: "Elderly Patient",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&auto=format&fit=crop&q=80",
    color: "#0f766e",
    badge: "👴 Self",
    email: "ramakant@orbicare.demo",
  },
  {
    userId: "user-ananya-02",
    name: "Ananya Sharma",
    role: "Family Member",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
    color: "#7c3aed",
    badge: "👩 Daughter",
    email: "ananya@orbicare.demo",
  },
  {
    userId: "user-sunita-03",
    name: "Sunita Devi",
    role: "Caregiver / Nurse",
    avatar: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=80&auto=format&fit=crop&q=80",
    color: "#0369a1",
    badge: "🩺 Nurse",
    email: "sunita@orbicare.demo",
  },
  {
    userId: "user-dr-rajesh-04",
    name: "Dr. Rajesh Gupta",
    role: "Consulting Doctor",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&auto=format&fit=crop&q=80",
    color: "#b45309",
    badge: "👨‍⚕️ Doctor",
    email: "dr.gupta@orbicare.demo",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"email" | "demo">("demo");

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickLogin(userId: string) {
    setQuickLoading(userId);
    setError(null);
    try {
      const res = await fetch("/api/auth/quick-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Quick login failed");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Quick login failed.");
    } finally {
      setQuickLoading(null);
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-container">
        {/* Logo & Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#0f766e" />
              <path d="M20 10 C14 10 10 14.5 10 19 C10 25 16 31 20 33 C24 31 30 25 30 19 C30 14.5 26 10 20 10Z" fill="white" fillOpacity="0.15" />
              <path d="M14 20 H26 M20 14 V26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="3" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="login-brand-name">OrbiCare</h1>
            <p className="login-brand-tagline">Caring for those who matter most</p>
          </div>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="login-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to access the health dashboard</p>
          </div>

          {/* Tabs */}
          <div className="login-tabs">
            <button
              id="tab-demo"
              className={`login-tab ${tab === "demo" ? "active" : ""}`}
              onClick={() => setTab("demo")}
            >
              Demo Access
            </button>
            <button
              id="tab-email"
              className={`login-tab ${tab === "email" ? "active" : ""}`}
              onClick={() => setTab("email")}
            >
              Email / Password
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Demo Tab */}
          {tab === "demo" && (
            <div className="login-demo">
              <p className="login-demo-hint">
                Select a persona to explore OrbiCare — no password required.
              </p>
              <div className="persona-grid">
                {DEMO_PERSONAS.map((p) => (
                  <button
                    key={p.userId}
                    id={`persona-${p.userId}`}
                    className="persona-card"
                    style={{ "--persona-color": p.color } as React.CSSProperties}
                    onClick={() => handleQuickLogin(p.userId)}
                    disabled={quickLoading !== null}
                  >
                    {quickLoading === p.userId ? (
                      <div className="persona-spinner" />
                    ) : (
                      <img src={p.avatar} alt={p.name} className="persona-avatar" />
                    )}
                    <div className="persona-info">
                      <span className="persona-badge">{p.badge}</span>
                      <strong>{p.name}</strong>
                      <span className="persona-role">{p.role}</span>
                    </div>
                    <svg className="persona-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email Tab */}
          {tab === "email" && (
            <form onSubmit={handleEmailLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramakant@orbicare.demo"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Demo password: orbicare123"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                id="login-submit-btn"
                type="submit"
                className="login-btn-primary"
                disabled={loading}
              >
                {loading ? <span className="btn-spinner" /> : null}
                {loading ? "Signing in…" : "Sign In"}
              </button>
              <p className="login-hint-text">
                Demo password for all accounts: <code>orbicare123</code>
              </p>
            </form>
          )}
        </div>

        <p className="login-footer">
          OrbiCare is a demonstration platform. All health data is fictional.
        </p>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 24px;
          background: #f0fdfa;
        }
        .login-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(15, 118, 110, 0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .login-container {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 1;
        }
        .login-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          justify-content: center;
        }
        .login-logo {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }
        .login-logo svg { width: 100%; height: 100%; }
        .login-brand-name {
          font-size: 26px;
          font-weight: 800;
          color: #0f766e;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .login-brand-tagline {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }
        .login-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(15, 118, 110, 0.15);
          padding: 36px;
          border: 1px solid rgba(20, 184, 166, 0.12);
        }
        .login-card-header {
          margin-bottom: 24px;
          text-align: center;
        }
        .login-card-header h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
        }
        .login-card-header p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }
        .login-tabs {
          display: flex;
          gap: 4px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 10px;
          margin-bottom: 24px;
        }
        .login-tab {
          flex: 1;
          padding: 9px;
          border: none;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
          background: transparent;
        }
        .login-tab.active {
          background: white;
          color: #0f766e;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .login-demo-hint {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 16px;
          text-align: center;
        }
        .persona-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .persona-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .persona-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--persona-color);
          border-radius: 3px 0 0 3px;
        }
        .persona-card:hover:not(:disabled) {
          border-color: var(--persona-color);
          background: color-mix(in srgb, var(--persona-color) 5%, white);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .persona-card:disabled { opacity: 0.7; cursor: not-allowed; }
        .persona-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid white;
          box-shadow: 0 0 0 2px var(--persona-color);
        }
        .persona-spinner {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          flex-shrink: 0;
          border: 3px solid #e2e8f0;
          border-top-color: var(--persona-color);
          animation: spin 0.7s linear infinite;
        }
        .persona-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .persona-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--persona-color);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .persona-info strong {
          font-size: 14px;
          color: #0f172a;
          font-weight: 700;
        }
        .persona-role {
          font-size: 12px;
          color: #64748b;
        }
        .persona-arrow {
          color: #94a3b8;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .persona-card:hover .persona-arrow { transform: translateX(4px); color: var(--persona-color); }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }
        .form-group input {
          padding: 11px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          color: #0f172a;
          transition: border-color 0.2s;
          outline: none;
          font-family: inherit;
        }
        .form-group input:focus { border-color: #0f766e; box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1); }
        .login-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          background: #0f766e;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .login-btn-primary:hover:not(:disabled) { background: #115e59; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15, 118, 110, 0.3); }
        .login-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .login-hint-text {
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          margin: -4px 0 0;
        }
        .login-hint-text code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          color: #0f766e;
        }
        .login-footer {
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 20px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
