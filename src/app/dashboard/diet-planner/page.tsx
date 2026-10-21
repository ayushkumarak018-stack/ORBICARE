"use client";

import { useEffect, useState } from "react";
import { DietPlan } from "@/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DietPlannerPage() {
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [hydrationCount, setHydrationCount] = useState(6);

  async function loadPlans() {
    setLoading(true);
    try {
      const res = await fetch("/api/diet-plans");
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Failed to load diet plans", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function toggleMealCompletion(planId: string, mealId: string, currentStatus: boolean) {
    try {
      // Optimistic update
      setPlans(prev => prev.map(p => {
        if (p.id === planId) {
          return {
            ...p,
            meals: p.meals.map(m => m.id === mealId ? { ...m, completed: !currentStatus } : m)
          };
        }
        return p;
      }));

      await fetch("/api/diet-plans", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          mealId,
          completed: !currentStatus,
        }),
      });
    } catch (err) {
      console.error("Failed to toggle completion", err);
      loadPlans();
    }
  }

  const currentPlan = plans.find(p => p.dayOfWeek.toLowerCase() === selectedDay.toLowerCase()) || plans[0];
  const completedCalories = currentPlan ? currentPlan.meals.filter(m => m.completed).reduce((s, m) => s + m.calories, 0) : 0;
  const targetCalories = currentPlan?.targetCalories || 1550;
  const completionPct = Math.round((completedCalories / targetCalories) * 100);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#0f766e" }}>Geriatric Nutrition</span>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a", margin: "4px 0 0" }}>🥗 Weekly Diet Planner</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>Target: </span>
          <strong style={{ color: "#0f766e", fontSize: "15px" }}>{targetCalories} kcal / day</strong>
        </div>
      </div>

      {/* Safety Notice */}
      <div style={{ backgroundColor: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "14px", padding: "14px 18px", marginBottom: "28px", display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "22px" }}>💡</span>
        <div style={{ fontSize: "13px", color: "#134e4a", lineHeight: "1.5" }}>
          <strong>Nutritional Guidance:</strong> Meal plans are curated to support blood pressure management (low sodium) and glycemic stability (high dietary fiber). Tailored for Ramakant Sharma (Age 72).
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "24px" }}>
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              border: selectedDay === day ? "2px solid #0f766e" : "1px solid #e2e8f0",
              backgroundColor: selectedDay === day ? "#0f766e" : "white",
              color: selectedDay === day ? "white" : "#475569",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          <div style={{ fontSize: "36px" }}>🥗</div>
          <div style={{ marginTop: "12px", fontSize: "15px", fontWeight: "600" }}>Loading diet plan…</div>
        </div>
      ) : currentPlan ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {/* Left Column: Planned Meals */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a" }}>Daily Intake Progress</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f766e" }}>{completedCalories} / {targetCalories} kcal ({completionPct}%)</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, completionPct)}%`, height: "100%", backgroundColor: "#0f766e", transition: "width 0.4s" }} />
              </div>
            </div>

            {currentPlan.meals.map((meal) => {
              const typeIcons: Record<string, string> = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍎" };
              return (
                <div
                  key={meal.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    border: meal.completed ? "1.5px solid #10b981" : "1px solid #e2e8f0",
                    padding: "20px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  }}
                >
                  <button
                    onClick={() => toggleMealCompletion(currentPlan.id, meal.id, meal.completed)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      border: meal.completed ? "none" : "2px solid #cbd5e1",
                      backgroundColor: meal.completed ? "#10b981" : "transparent",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "16px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                    title="Mark as Eaten"
                  >
                    {meal.completed ? "✓" : ""}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "#0f766e", letterSpacing: "0.5px" }}>
                        {typeIcons[meal.type] || "🥗"} {meal.type}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#64748b" }}>{meal.calories} kcal</span>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: meal.completed ? "#059669" : "#0f172a", margin: "0 0 6px" }}>
                      {meal.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.4" }}>
                      {meal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dietary Guidelines & Hydration */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Hydration Tracker */}
            <div style={{ backgroundColor: "white", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>💧 Senior Hydration</h3>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#0284c7" }}>{hydrationCount} / 8 Glasses</span>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px" }}>
                Geriatric hydration prevents orthostatic hypotension and kidney stress. Warm water or light herbal tea recommended.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(glass => (
                  <button
                    key={glass}
                    onClick={() => setHydrationCount(glass)}
                    style={{
                      width: "36px",
                      height: "44px",
                      borderRadius: "8px",
                      backgroundColor: glass <= hydrationCount ? "#e0f2fe" : "#f8fafc",
                      border: glass <= hydrationCount ? "2px solid #0284c7" : "1px solid #cbd5e1",
                      color: glass <= hydrationCount ? "#0284c7" : "#94a3b8",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    🥛
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div style={{ backgroundColor: "white", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px" }}>Care Considerations</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {currentPlan.dietaryRestrictions.map((tag, idx) => (
                  <span key={idx} style={{ backgroundColor: "#f0fdfa", color: "#0f766e", border: "1px solid #99f6e4", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                <li>Limit table salt to &lt; 4g/day for blood pressure regulation.</li>
                <li>Ensure papaya, guava, or seasonal fruit at breakfast for bowel regularity.</li>
                <li>Avoid heavy oil / ghee dinners after 08:00 PM for sound sleep.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
