import { getCurrentUserFromCookies } from "@/lib/auth";
import { db } from "@/db/storage";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";


export default async function DashboardPage() {
  const user = await getCurrentUserFromCookies();
  if (!user) redirect("/login");

  const profile = db.getProfileByUserId(user.id);
  const patientId = user.patientId || user.id;
  const medications = db.getMedications(patientId);
  const todayLogs = db.getMedicationLogs(patientId).filter(
    (l) => l.scheduledTime.startsWith(new Date().toISOString().slice(0, 10))
  );
  const vitals = db.getVitalReadings(patientId).slice(0, 8);
  const appointments = db.getAppointments(patientId).filter((a) => a.status === "upcoming").slice(0, 3);
  const alerts = db.getAlerts(patientId).filter((a) => a.status === "new").slice(0, 3);
  const familyUpdates = db.getFamilyUpdates().slice(0, 4);
  const notifications = db.getNotifications(user.id).filter((n) => !n.isRead).slice(0, 5);
  const meals = db.getMeals(patientId).slice(0, 3);

  const todayDate = format(new Date(), "EEEE, d MMMM yyyy");
  const takenCount = todayLogs.filter((l) => l.status === "taken").length;
  const totalScheduled = todayLogs.length;
  const adherencePct = totalScheduled > 0 ? Math.round((takenCount / totalScheduled) * 100) : 100;

  const latestBP = vitals.find((v) => v.type === "blood_pressure");
  const latestHR = vitals.find((v) => v.type === "heart_rate");
  const latestGlucose = vitals.find((v) => v.type === "blood_glucose");
  const latestSpO2 = vitals.find((v) => v.type === "oxygen_saturation");

  const unreadCount = notifications.length;

  const SEVERITY_COLORS = {
    info: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    warning: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
    critical: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  };

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 4px" }}>{todayDate}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", margin: 0 }}>
          Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"},{" "}
          {user.name.split(" ")[0]} 👋
        </h1>
        {profile && (
          <p style={{ color: "#64748b", fontSize: 14, margin: "6px 0 0" }}>
            {profile.chronicConditions?.join(" · ")}
          </p>
        )}
      </div>

      {/* Quick stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
        {/* Medication adherence */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>💊</span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Today's Medications</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: adherencePct >= 80 ? "#0f766e" : "#dc2626" }}>
              {takenCount}/{totalScheduled}
            </span>
            <span style={{ color: "#64748b", fontSize: 13 }}>taken</span>
          </div>
          <div style={{ marginTop: 10, height: 6, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: `${adherencePct}%`, height: "100%", background: adherencePct >= 80 ? "#0f766e" : "#f59e0b", borderRadius: 6, transition: "width 0.5s" }} />
          </div>
          <Link href="/dashboard/medications" style={{ fontSize: 12, color: "#0f766e", textDecoration: "none", display: "block", marginTop: 8, fontWeight: 600 }}>
            View all →
          </Link>
        </div>

        {/* Blood Pressure */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>🩺</span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Blood Pressure</span>
          </div>
          {latestBP ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: latestBP.isAbnormal ? "#dc2626" : "#0f172a" }}>
                  {latestBP.value}
                </span>
                <span style={{ color: "#64748b", fontSize: 12 }}>{latestBP.unit}</span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", margin: "6px 0 0" }}>{latestBP.context}</p>
            </>
          ) : (
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>No readings yet</p>
          )}
          <Link href="/dashboard/vitals" style={{ fontSize: 12, color: "#0f766e", textDecoration: "none", display: "block", marginTop: 8, fontWeight: 600 }}>
            Log vitals →
          </Link>
        </div>

        {/* Blood Glucose */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>🩸</span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Blood Glucose</span>
          </div>
          {latestGlucose ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
                  {latestGlucose.value}
                </span>
                <span style={{ color: "#64748b", fontSize: 12 }}>{latestGlucose.unit}</span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", margin: "6px 0 0" }}>{latestGlucose.context}</p>
            </>
          ) : (
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>No readings yet</p>
          )}
          <Link href="/dashboard/vitals" style={{ fontSize: 12, color: "#0f766e", textDecoration: "none", display: "block", marginTop: 8, fontWeight: 600 }}>
            View trend →
          </Link>
        </div>

        {/* SpO2 / HR */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>❤️</span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Heart & Oxygen</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {latestHR && (
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{latestHR.value}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>bpm</div>
              </div>
            )}
            {latestSpO2 && (
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: latestSpO2.numericValue < 95 ? "#dc2626" : "#0f766e" }}>{latestSpO2.value}%</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>SpO₂</div>
              </div>
            )}
            {!latestHR && !latestSpO2 && <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>No readings yet</p>}
          </div>
          <Link href="/dashboard/vitals" style={{ fontSize: 12, color: "#0f766e", textDecoration: "none", display: "block", marginTop: 8, fontWeight: 600 }}>
            Log vitals →
          </Link>
        </div>
      </div>

      {/* Main grid - 2 col */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #fecaca", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #fee2e2", background: "#fef2f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#dc2626" }}>🔔 Active Alerts</h2>
                <Link href="/dashboard/alerts" style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, textDecoration: "none" }}>View all</Link>
              </div>
              <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {alerts.map((alert) => {
                  const col = SEVERITY_COLORS[alert.severity];
                  return (
                    <div key={alert.id} style={{ padding: "10px 14px", background: col.bg, border: `1px solid ${col.border}`, borderRadius: 10 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: col.text, marginBottom: 4 }}>{alert.title}</div>
                      <div style={{ fontSize: 12, color: "#475569" }}>{alert.message}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Today's Medication Schedule */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>💊 Today's Medication Schedule</h2>
              <Link href="/dashboard/medications" style={{ fontSize: 12, color: "#0f766e", fontWeight: 600, textDecoration: "none" }}>Manage</Link>
            </div>
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              {todayLogs.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: 14, margin: "8px 0" }}>No medications scheduled for today.</p>
              ) : (
                todayLogs.map((log) => {
                  const statusMap = {
                    taken: { bg: "#f0fdfa", border: "#99f6e4", dot: "#0f766e", label: "✓ Taken" },
                    pending: { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", label: "⏳ Pending" },
                    skipped: { bg: "#fef2f2", border: "#fecaca", dot: "#dc2626", label: "✗ Skipped" },
                    snoozed: { bg: "#f0f9ff", border: "#bae6fd", dot: "#0369a1", label: "💤 Snoozed" },
                  };
                  const s = statusMap[log.status];
                  const time = log.scheduledTime.includes("T") ? log.scheduledTime.split("T")[1].slice(0, 5) : log.scheduledTime;
                  return (
                    <div key={log.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{log.medicationName}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{time} · {log.notes}</div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: s.dot, flexShrink: 0 }}>{s.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent meals */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>🥗 Recent Meals</h2>
              <Link href="/dashboard/meals" style={{ fontSize: 12, color: "#0f766e", fontWeight: 600, textDecoration: "none" }}>Log meal</Link>
            </div>
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              {meals.map((meal) => (
                <div key={meal.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
                  {meal.imageUrl ? (
                    <img src={meal.imageUrl} alt={meal.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                      {meal.mealType === "breakfast" ? "🌅" : meal.mealType === "lunch" ? "☀️" : meal.mealType === "dinner" ? "🌙" : "🍎"}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meal.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                      {meal.calories} kcal · {meal.protein}g protein · {meal.carbs}g carbs
                    </div>
                  </div>
                  {meal.isAiScanned && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#0f766e", background: "#f0fdfa", border: "1px solid #99f6e4", padding: "2px 6px", borderRadius: 20, flexShrink: 0 }}>AI</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family Updates */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>👨‍👩‍👧 Family Feed</h2>
              <Link href="/dashboard/family" style={{ fontSize: 12, color: "#0f766e", fontWeight: 600, textDecoration: "none" }}>View all</Link>
            </div>
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {familyUpdates.map((update) => {
                const ROLE_AVATARS: Record<string, string> = {
                  elderly: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=40&auto=format&fit=crop",
                  family: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&auto=format&fit=crop",
                  caregiver: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=40&auto=format&fit=crop",
                  doctor: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=40&auto=format&fit=crop",
                };
                return (
                  <div key={update.id} style={{ display: "flex", gap: 12 }}>
                    <img src={ROLE_AVATARS[update.authorRole] || ""} alt={update.authorName} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{update.authorName}</div>
                      <p style={{ fontSize: 13, color: "#475569", margin: "4px 0 6px", lineHeight: 1.5 }}>{update.content}</p>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        {format(new Date(update.createdAt), "d MMM, h:mm a")} · ❤️ {update.likes}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Upcoming Appointments */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>📅 Upcoming</h2>
              <Link href="/dashboard/appointments" style={{ fontSize: 12, color: "#0f766e", fontWeight: 600, textDecoration: "none" }}>All</Link>
            </div>
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              {appointments.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: 13, margin: "4px 0" }}>No upcoming appointments.</p>
              ) : (
                appointments.map((appt) => (
                  <div key={appt.id} style={{ padding: "12px 14px", background: "#f8fafc", borderRadius: 12, border: "1px solid #f1f5f9" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", marginBottom: 4 }}>{appt.doctorName}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{appt.specialty}</div>
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#0f766e", background: "#f0fdfa", padding: "2px 8px", borderRadius: 20, border: "1px solid #99f6e4" }}>
                        {appt.appointmentDate}
                      </span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{appt.appointmentTime}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active medications summary */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Active Medications</h2>
            </div>
            <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              {medications.filter((m) => m.status === "active").map((med) => (
                <div key={med.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>💊</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#0f172a" }}>{med.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{med.dosage} · {med.frequency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          {unreadCount > 0 && (
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
                  🔔 Notifications{" "}
                  <span style={{ fontSize: 12, fontWeight: 700, color: "white", background: "#dc2626", padding: "1px 7px", borderRadius: 20 }}>
                    {unreadCount}
                  </span>
                </h2>
              </div>
              <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>
                      {n.category === "medication" ? "💊" : n.category === "vital" ? "❤️" : n.category === "appointment" ? "📅" : n.category === "emergency" ? "🚨" : "🔔"}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12, color: "#0f172a" }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{n.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)", borderRadius: 16, padding: "20px", color: "white" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Quick Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { href: "/dashboard/vitals", label: "Record Vitals", icon: "🩺" },
                { href: "/dashboard/meal-scan", label: "AI Meal Scan", icon: "📸" },
                { href: "/dashboard/diet-planner", label: "Weekly Diet Planner", icon: "🍱" },
                { href: "/dashboard/insights", label: "Health Insights & Report", icon: "📊" },
                { href: "/dashboard/medications", label: "Check-in Medication", icon: "💊" },
                { href: "/dashboard/sos", label: "Emergency Assistance", icon: "🚨" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 10,
                    color: "white",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "background 0.15s",
                  }}
                >
                  <span>{action.icon}</span>
                  {action.label}
                  <svg style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
