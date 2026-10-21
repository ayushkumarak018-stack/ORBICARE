"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiMealScanResult } from "@/lib/gemini";

const SAMPLE_MEALS = [
  {
    id: "oats",
    name: "Steel-Cut Oats with Almonds & Papaya",
    type: "breakfast",
    calories: 340,
    protein: 12,
    carbs: 48,
    fiber: 8,
    img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "roti",
    name: "2 Multigrain Rotis with Yellow Dal & Lauki",
    type: "lunch",
    calories: 460,
    protein: 18,
    carbs: 65,
    fiber: 10,
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "khichdi",
    name: "Moong Dal Vegetable Khichdi with Curd",
    type: "dinner",
    calories: 380,
    protein: 14,
    carbs: 58,
    fiber: 7,
    img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "idli",
    name: "2 Steamed Idlis with Sambar & Mint Chutney",
    type: "breakfast",
    calories: 280,
    protein: 9,
    carbs: 52,
    fiber: 6,
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80",
  },
];

export default function AiMealScanPage() {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<AiMealScanResult | null>(null);
  const [editData, setEditData] = useState<{
    name: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    portion: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    notes: string;
    ingredients: string;
  }>({
    name: "",
    mealType: "lunch",
    portion: "1 serving",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    notes: "",
    ingredients: "",
  });

  async function handleAnalyze(sampleId?: string, imageBase64?: string) {
    setAnalyzing(true);
    setScanResult(null);

    try {
      const res = await fetch("/api/meal-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sampleName: sampleId,
          image: imageBase64,
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setScanResult(data.analysis);
        setEditData({
          name: data.analysis.name,
          mealType: data.analysis.mealType || "lunch",
          portion: data.analysis.portion || "1 serving",
          calories: data.analysis.calories || 0,
          protein: data.analysis.protein || 0,
          carbs: data.analysis.carbs || 0,
          fat: data.analysis.fat || 0,
          fiber: data.analysis.fiber || 0,
          notes: data.analysis.notes || "",
          ingredients: (data.analysis.ingredients || []).join(", "),
        });
      }
    } catch (err) {
      console.error("Meal scan error", err);
    } finally {
      setAnalyzing(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      setSelectedSample(null);
      handleAnalyze(undefined, base64);
    };
    reader.readAsDataURL(file);
  }

  async function handleSaveMeal() {
    setSaving(true);
    try {
      await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name,
          mealType: editData.mealType,
          portion: editData.portion,
          calories: editData.calories,
          protein: editData.protein,
          carbs: editData.carbs,
          fat: editData.fat,
          fiber: editData.fiber,
          notes: editData.notes,
          ingredients: editData.ingredients.split(",").map(i => i.trim()).filter(Boolean),
          isAiScanned: true,
          aiConfidence: scanResult?.confidenceScore || 92,
          imageUrl: previewImage || undefined,
        }),
      });

      router.push("/dashboard/meals");
    } catch (err) {
      console.error("Save meal failed", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto", padding: "24px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>AI Vision Nutrition</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0" }}>📸 AI Meal Scanner</h1>
        </div>
        <Link href="/dashboard/meals" style={{ fontSize: "14px", fontWeight: "600", color: "#0f766e", textDecoration: "none" }}>
          ← View Meal Log History
        </Link>
      </div>

      {/* Safety Notice */}
      <div style={{ backgroundColor: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "14px", padding: "14px 18px", marginBottom: "28px", display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "22px" }}>🛡️</span>
        <div style={{ fontSize: "13px", color: "#134e4a", lineHeight: "1.5" }}>
          <strong>Nutritional Estimation Caveat:</strong> Values are algorithmic approximations generated by Google Gemini Vision or clinical reference databases. Review and adjust any values before confirming.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
        {/* Left Column: Image Upload or Sample Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Upload card */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 14px" }}>Upload Food Photo</h3>
            
            <label style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 20px",
              border: "2px dashed #cbd5e1",
              borderRadius: "16px",
              cursor: "pointer",
              backgroundColor: "#f8fafc",
              transition: "border 0.2s",
            }}>
              <span style={{ fontSize: "36px", marginBottom: "10px" }}>📷</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f766e" }}>Tap to snap photo or upload image</span>
              <span style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>PNG, JPG up to 10MB</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
            </label>

            {previewImage && (
              <div style={{ marginTop: "16px", borderRadius: "12px", overflow: "hidden", maxHeight: "180px", border: "1px solid #e2e8f0" }}>
                <img src={previewImage} alt="Uploaded meal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}
          </div>

          {/* Preset Samples */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>Or Test with Geriatric Meal Presets</h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>Tap any meal to simulate live AI recognition</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {SAMPLE_MEALS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample.id);
                    setPreviewImage(sample.img);
                    handleAnalyze(sample.id);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "12px",
                    borderRadius: "12px",
                    border: selectedSample === sample.id ? "2px solid #0f766e" : "1px solid #e2e8f0",
                    backgroundColor: selectedSample === sample.id ? "#f0fdfa" : "#f8fafc",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <img src={sample.img} alt={sample.name} style={{ width: "100%", height: "70px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", lineHeight: "1.3" }}>{sample.name}</span>
                  <span style={{ fontSize: "11px", color: "#0f766e", fontWeight: "600", marginTop: "4px" }}>{sample.calories} kcal · {sample.protein}g protein</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Result & Edit Form */}
        <div>
          {analyzing ? (
            <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "60px 24px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "40px", animation: "pulse 1.5s infinite" }}>🥗</div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "16px 0 6px" }}>Analyzing Nutrition Profile…</h3>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Processing food items, portions, and macronutrients</p>
            </div>
          ) : scanResult ? (
            <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1.5px solid #0f766e", padding: "26px", boxShadow: "0 4px 16px rgba(15, 118, 110, 0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: "#0f766e", backgroundColor: "#f0fdfa", padding: "4px 10px", borderRadius: "6px" }}>
                  AI Confidence: {scanResult.confidenceScore}% · {scanResult.provider === "gemini-vision" ? "Gemini 1.5 Vision" : "Geriatric Nutrition Engine"}
                </span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Status: Review & Save</span>
              </div>

              {/* Editable Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Meal Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", fontWeight: "600", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Meal Category</label>
                    <select
                      value={editData.mealType}
                      onChange={(e) => setEditData({ ...editData, mealType: e.target.value as any })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                    >
                      <option value="breakfast">🌅 Breakfast</option>
                      <option value="lunch">☀️ Lunch</option>
                      <option value="dinner">🌙 Dinner</option>
                      <option value="snack">🍎 Snack</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Estimated Portion</label>
                    <input
                      type="text"
                      value={editData.portion}
                      onChange={(e) => setEditData({ ...editData, portion: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Macro breakdown cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  <div style={{ backgroundColor: "#f0fdfa", padding: "10px", borderRadius: "10px", textAlign: "center", border: "1px solid #ccfbf1" }}>
                    <div style={{ fontSize: "11px", color: "#0f766e", fontWeight: "700" }}>Calories</div>
                    <input
                      type="number"
                      value={editData.calories}
                      onChange={(e) => setEditData({ ...editData, calories: Number(e.target.value) })}
                      style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center", fontSize: "16px", fontWeight: "800", color: "#0f766e" }}
                    />
                    <div style={{ fontSize: "10px", color: "#64748b" }}>kcal</div>
                  </div>
                  <div style={{ backgroundColor: "#faf5ff", padding: "10px", borderRadius: "10px", textAlign: "center", border: "1px solid #e9d5ff" }}>
                    <div style={{ fontSize: "11px", color: "#7c3aed", fontWeight: "700" }}>Protein</div>
                    <input
                      type="number"
                      value={editData.protein}
                      onChange={(e) => setEditData({ ...editData, protein: Number(e.target.value) })}
                      style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center", fontSize: "16px", fontWeight: "800", color: "#7c3aed" }}
                    />
                    <div style={{ fontSize: "10px", color: "#64748b" }}>grams</div>
                  </div>
                  <div style={{ backgroundColor: "#fffbeb", padding: "10px", borderRadius: "10px", textAlign: "center", border: "1px solid #fde68a" }}>
                    <div style={{ fontSize: "11px", color: "#d97706", fontWeight: "700" }}>Carbs</div>
                    <input
                      type="number"
                      value={editData.carbs}
                      onChange={(e) => setEditData({ ...editData, carbs: Number(e.target.value) })}
                      style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center", fontSize: "16px", fontWeight: "800", color: "#d97706" }}
                    />
                    <div style={{ fontSize: "10px", color: "#64748b" }}>grams</div>
                  </div>
                  <div style={{ backgroundColor: "#ecfdf5", padding: "10px", borderRadius: "10px", textAlign: "center", border: "1px solid #a7f3d0" }}>
                    <div style={{ fontSize: "11px", color: "#059669", fontWeight: "700" }}>Fiber</div>
                    <input
                      type="number"
                      value={editData.fiber}
                      onChange={(e) => setEditData({ ...editData, fiber: Number(e.target.value) })}
                      style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center", fontSize: "16px", fontWeight: "800", color: "#059669" }}
                    />
                    <div style={{ fontSize: "10px", color: "#64748b" }}>grams</div>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Identified Ingredients</label>
                  <input
                    type="text"
                    value={editData.ingredients}
                    onChange={(e) => setEditData({ ...editData, ingredients: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                {editData.notes && (
                  <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "12px", color: "#475569", lineHeight: "1.4" }}>
                    💡 <strong>Geriatric Nutrition Note:</strong> {editData.notes}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <button
                    onClick={handleSaveMeal}
                    disabled={saving}
                    style={{
                      flex: 1,
                      padding: "14px",
                      backgroundColor: "#0f766e",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: "700",
                      cursor: saving ? "not-allowed" : "pointer",
                      boxShadow: "0 2px 8px rgba(15,118,110,0.25)",
                    }}
                  >
                    {saving ? "Saving to Nutrition History…" : "✅ Save Meal to History"}
                  </button>
                  <button
                    onClick={() => setScanResult(null)}
                    style={{
                      padding: "14px 18px",
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "48px 24px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>No Food Photo Selected</h3>
              <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                Upload a food picture or select one of the geriatric meal presets on the left to initiate AI nutritional analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
