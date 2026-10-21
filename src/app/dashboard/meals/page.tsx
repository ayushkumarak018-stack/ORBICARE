"use client";

import { useEffect, useState } from "react";
import { Meal } from "@/types";
import { format } from "date-fns";

const MEAL_ICONS: Record<string, string> = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍎" };

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", mealType: "breakfast", portion: "1 serving",
    calories: "", protein: "", carbs: "", fat: "", fiber: "",
    ingredients: "", notes: "",
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/meals");
    setMeals(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayMeals = meals.filter((m) => m.loggedAt.startsWith(today));
  const todayCalories = todayMeals.reduce((s, m) => s + m.calories, 0);
  const todayProtein = todayMeals.reduce((s, m) => s + m.protein, 0);
  const todayCarbs = todayMeals.reduce((s, m) => s + m.carbs, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        calories: parseFloat(formData.calories) || 0,
        protein: parseFloat(formData.protein) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        fat: parseFloat(formData.fat) || 0,
        fiber: parseFloat(formData.fiber) || 0,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()).filter(Boolean),
      }),
    });
    setShowForm(false);
    setFormData({ name: "", mealType: "breakfast", portion: "1 serving", calories: "", protein: "", carbs: "", fat: "", fiber: "", ingredients: "", notes: "" });
    await load();
    setSubmitting(false);
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, color: "#64748b" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 32 }}>🥗</div><div>Loading meals…</div></div>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>🥗 Nutrition Tracker</h1>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{meals.length} meals logged</p>
        </div>
        <button
          id="log-meal-btn"
          onClick={() => setShowForm(!showForm)}
          style={{ padding: "10px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          + Log Meal
        </button>
      </div>

      {/* Today's summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Today's Calories", value: todayCalories, unit: "kcal", target: 1550, color: "#0f766e" },
          { label: "Protein", value: todayProtein, unit: "g", target: 60, color: "#7c3aed" },
          { label: "Carbohydrates", value: todayCarbs, unit: "g", target: 200, color: "#d97706" },
          { label: "Meals Today", value: todayMeals.length, unit: "meals", target: 4, color: "#0369a1" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "white", borderRadius: 14, padding: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>{stat.unit} / {stat.target} target</div>
            <div style={{ height: 4, background: "#f1f5f9", borderRadius: 4 }}>
              <div style={{ width: `${Math.min(100, Math.round((stat.value / stat.target) * 100))}%`, height: "100%", background: stat.color, borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Log form */}
      {showForm && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24, marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Log New Meal</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Meal Name *</label>
                <input id="meal-name" type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Vegetable Khichdi" required style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Meal Type</label>
                <select id="meal-type" value={formData.mealType} onChange={(e) => setFormData(p => ({ ...p, mealType: e.target.value }))} style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }}>
                  <option value="breakfast">🌅 Breakfast</option>
                  <option value="lunch">☀️ Lunch</option>
                  <option value="dinner">🌙 Dinner</option>
                  <option value="snack">🍎 Snack</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Portion</label>
                <input id="meal-portion" type="text" value={formData.portion} onChange={(e) => setFormData(p => ({ ...p, portion: e.target.value }))} placeholder="e.g. 1 bowl (250g)" style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {[
                { id: "meal-calories", key: "calories", label: "Calories (kcal)", placeholder: "350" },
                { id: "meal-protein", key: "protein", label: "Protein (g)", placeholder: "12" },
                { id: "meal-carbs", key: "carbs", label: "Carbs (g)", placeholder: "45" },
                { id: "meal-fat", key: "fat", label: "Fat (g)", placeholder: "8" },
                { id: "meal-fiber", key: "fiber", label: "Fiber (g)", placeholder: "5" },
              ].map((f) => (
                <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>{f.label}</label>
                  <input id={f.id} type="number" step="0.1" value={(formData as Record<string, string>)[f.key]} onChange={(e) => setFormData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ padding: "9px 10px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>Ingredients (comma-separated)</label>
              <input id="meal-ingredients" type="text" value={formData.ingredients} onChange={(e) => setFormData(p => ({ ...p, ingredients: e.target.value }))} placeholder="e.g. Brown rice, Moong dal, Carrots, Peas" style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5 }}>Notes</label>
              <input id="meal-notes" type="text" value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} placeholder="Optional notes" style={{ padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "9px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 14, background: "white" }}>Cancel</button>
              <button id="save-meal-btn" type="submit" disabled={submitting} style={{ padding: "9px 18px", background: "#0f766e", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {submitting ? "Saving…" : "Log Meal"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meals list grouped by date */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {meals.length === 0 ? (
          <div style={{ background: "white", borderRadius: 14, padding: 40, textAlign: "center", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🥗</div>
            <p style={{ margin: 0 }}>No meals logged yet. Start tracking your nutrition above.</p>
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 0 }}>
                {meal.imageUrl && (
                  <img src={meal.imageUrl} alt={meal.name} style={{ width: 120, objectFit: "cover", flexShrink: 0 }} />
                )}
                {!meal.imageUrl && (
                  <div style={{ width: 80, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                    {MEAL_ICONS[meal.mealType]}
                  </div>
                )}
                <div style={{ flex: 1, padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{meal.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: "#f0fdfa", color: "#0f766e", padding: "2px 8px", borderRadius: 20, border: "1px solid #99f6e4" }}>
                      {MEAL_ICONS[meal.mealType]} {meal.mealType}
                    </span>
                    {meal.isAiScanned && <span style={{ fontSize: 10, fontWeight: 700, background: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: 20, border: "1px solid #fde68a" }}>🤖 AI {meal.aiConfidence}%</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    {format(new Date(meal.loggedAt), "d MMM yyyy, h:mm a")} · {meal.portion}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                    {[
                      { label: "Cal", value: meal.calories, unit: "kcal" },
                      { label: "Protein", value: meal.protein, unit: "g" },
                      { label: "Carbs", value: meal.carbs, unit: "g" },
                      { label: "Fat", value: meal.fat, unit: "g" },
                      { label: "Fiber", value: meal.fiber, unit: "g" },
                    ].map((n) => (
                      <div key={n.label}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{n.value}</div>
                        <div style={{ fontSize: 10, color: "#94a3b8" }}>{n.unit} {n.label}</div>
                      </div>
                    ))}
                  </div>
                  {meal.ingredients.length > 0 && (
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
                      🧑‍🍳 {meal.ingredients.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
