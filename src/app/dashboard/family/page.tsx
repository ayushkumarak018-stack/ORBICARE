"use client";

import { useEffect, useState } from "react";
import { FamilyUpdate } from "@/types";
import { format } from "date-fns";

const ROLE_AVATARS: Record<string, string> = {
  elderly: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=60&auto=format&fit=crop",
  family: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop",
  caregiver: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=60&auto=format&fit=crop",
  doctor: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=60&auto=format&fit=crop",
};

const CATEGORY_BADGES: Record<string, { icon: string; color: string; bg: string }> = {
  vital: { icon: "❤️", color: "#dc2626", bg: "#fef2f2" },
  medication: { icon: "💊", color: "#0f766e", bg: "#f0fdfa" },
  meal: { icon: "🥗", color: "#16a34a", bg: "#f0fdf4" },
  note: { icon: "📝", color: "#7c3aed", bg: "#faf5ff" },
  appointment: { icon: "📅", color: "#0369a1", bg: "#eff6ff" },
  alert: { icon: "⚠️", color: "#b45309", bg: "#fffbeb" },
  sos: { icon: "🚨", color: "#dc2626", bg: "#fef2f2" },
};

export default function FamilyPage() {
  const [updates, setUpdates] = useState<FamilyUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("note");
  const [posting, setPosting] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/family");
    setUpdates(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    await fetch("/api/family", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, category }),
    });
    setContent("");
    await load();
    setPosting(false);
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 32 }}>👨‍👩‍👧</div><div>Loading family feed…</div></div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>👨‍👩‍👧 Family Feed</h1>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
          Stay connected with care updates and family messages
        </p>
      </div>

      {/* Post form */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20, marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <form onSubmit={handlePost}>
          <textarea
            id="family-post-text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share a health update, note, or message with the care team…"
            rows={3}
            style={{ width: "100%", padding: "12px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", outline: "none", transition: "border-color 0.2s" }}
            onFocus={(e) => e.target.style.borderColor = "#0f766e"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            <select
              id="family-post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: "8px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", flex: 1 }}
            >
              {Object.entries(CATEGORY_BADGES).map(([cat, b]) => (
                <option key={cat} value={cat}>{b.icon} {cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
            <button
              id="post-family-update-btn"
              type="submit"
              disabled={posting || !content.trim()}
              style={{ padding: "9px 20px", background: posting || !content.trim() ? "#e2e8f0" : "#0f766e", color: posting || !content.trim() ? "#94a3b8" : "white", border: "none", borderRadius: 8, cursor: posting || !content.trim() ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.15s" }}
            >
              {posting ? "Posting…" : "Post Update"}
            </button>
          </div>
        </form>
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {updates.map((update) => {
          const badge = CATEGORY_BADGES[update.category];
          return (
            <div key={update.id} style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
              <div style={{ display: "flex", gap: 14 }}>
                <img
                  src={ROLE_AVATARS[update.authorRole] || ""}
                  alt={update.authorName}
                  style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #f0fdfa" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: "#0f172a" }}>{update.authorName}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: badge?.bg || "#f1f5f9", color: badge?.color || "#64748b", fontWeight: 700, border: `1px solid ${badge?.bg || "#e2e8f0"}` }}>
                      {badge?.icon} {update.category}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                    {format(new Date(update.createdAt), "d MMM, h:mm a")}
                  </div>
                  <p style={{ margin: "10px 0 12px", fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{update.content}</p>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      ❤️ <span style={{ fontWeight: 600 }}>{update.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
