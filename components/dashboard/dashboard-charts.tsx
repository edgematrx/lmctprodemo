import { createClient } from "@/lib/supabase/server"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardAged } from "@/components/dashboard/dashboard-aged"
import Link from "next/link"

function fmt(n: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n)
}

function daysAgo(date: string) {
  return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const now = new Date()
  const mtdStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString().split("T")[0]

  const [vehiclesRes, salesRes, customersRes, profileRes] = await Promise.all([
    supabase.from("vehicles").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("sales").select("*, vehicles(purchase_price, body_type)").eq("user_id", user.id).order("sale_date", { ascending: false }),
    supabase.from("customers").select("id, status").eq("user_id", user.id),
    supabase.from("profiles").select("dealership_name, ai_name, suburb, state").eq("id", user.id).single(),
  ])

  const vehicles  = vehiclesRes.data  || []
  const sales     = salesRes.data     || []
  const customers = customersRes.data || []
  const profile   = profileRes.data

  const available = vehicles.filter(v => v.status === "available")
  const mtdSales  = sales.filter(s => s.sale_date >= mtdStart)
  const hotLeads  = customers.filter(c => c.status === "hot_lead" || c.status === "negotiating")

  const mtdRevenue = mtdSales.reduce((s, x) => s + (x.sale_price || 0), 0)
  const mtdProfit  = mtdSales.reduce((s, x) => s + (x.gross_profit || (x.sale_price || 0) - (x.vehicles?.purchase_price || 0)), 0)
  const avgMargin  = mtdSales.length ? mtdSales.reduce((s, x) => s + (x.margin_percent || 0), 0) / mtdSales.length : 0

  // Aged stock
  const aged60 = available.filter(v => daysAgo(v.date_acquired || v.created_at) >= 60)
  const aged30  = available.filter(v => { const d = daysAgo(v.date_acquired || v.created_at); return d >= 30 && d < 60 })
  const fresh   = available.filter(v => daysAgo(v.date_acquired || v.created_at) < 30)

  // Body type breakdown for current stock
  const bodyMap: Record<string, number> = {}
  for (const v of available) {
    const b = v.body_type || "Other"
    bodyMap[b] = (bodyMap[b] || 0) + 1
  }
  const bodyData = Object.entries(bodyMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  // Sales trend — last 6 months
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const trendData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    const monthSales = sales.filter(s => s.sale_date?.startsWith(key))
    return {
      month: monthNames[d.getMonth()],
      sales: monthSales.length,
      profit: Math.round(monthSales.reduce((s, x) => s + (x.gross_profit || 0), 0) / 1000),
    }
  })

  // Donut data
  const donutData = [
    { name: "Fresh (0–30d)", value: fresh.length,  color: "#10B981" },
    { name: "Watch (31–60d)", value: aged30.length, color: "#F59E0B" },
    { name: "Aged (60d+)",   value: aged60.length,  color: "#EF4444" },
  ].filter(d => d.value > 0)

  // Recent vehicles + sales
  const recentVehicles = available.slice(0, 4)
  const recentSales    = sales.slice(0, 4)

  const aiName = profile?.ai_name || "MAX"
  const today = now.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div style={{ minHeight: "100vh", background: "#080D1A", color: "#F1F0FF", padding: "0" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        @keyframes slide-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px 24px; transition: border-color 0.2s; }
        .stat-card:hover { border-color: rgba(255,255,255,0.12); }
        .aged-item { border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; }
        .recent-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .recent-row:last-child { border-bottom: none; }
        .badge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.3px; }
      `}</style>

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#F1F0FF" }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{today}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* AI Active badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: 30, padding: "6px 14px",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }}></div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", letterSpacing: "0.5px" }}>AI ACTIVE</span>
          </div>
          <Link href="/dashboard/stock" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#E8A020", color: "#0D1F3C", border: "none",
              borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>+ Add Vehicle</button>
          </Link>
        </div>
      </div>

      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── AGED STOCK ALERT ──────────────────────────────────── */}
        {aged60.length > 0 && (
          <div style={{
            background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 12, padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>⚠</span>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#EF4444" }}>
                  {aged60.length} vehicle{aged60.length > 1 ? "s" : ""} aged 60+ days
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>
                  tying up {fmt(aged60.reduce((s, v) => s + (v.asking_price || 0), 0))} in cash
                </span>
              </div>
            </div>
            <Link href="/dashboard/stock" style={{ textDecoration: "none" }}>
              <button style={{
                background: "rgba(239,68,68,0.15)", color: "#EF4444",
                border: "1px solid rgba(239,68,68,0.3)", borderRadius: 6,
                padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>View aged stock →</button>
            </Link>
          </div>
        )}

        {/* ── STATS ROW ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { label: "In Stock", value: available.length, sub: `${vehicles.length} total incl. sold`, icon: "🚗", color: "#F1F0FF" },
            { label: "Sold MTD", value: mtdSales.length, sub: `${sales.length} all time`, icon: "✓", color: "#10B981" },
            { label: "MTD Revenue", value: fmt(mtdRevenue), sub: "this month", icon: "$", color: "#F1F0FF" },
            { label: "MTD Profit", value: fmt(mtdProfit), sub: `${avgMargin.toFixed(1)}% avg margin`, icon: "↑", color: "#10B981" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</span>
                <span style={{ fontSize: 16, opacity: 0.4 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── CHARTS ROW ────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.4fr", gap: 14 }}>

          {/* Inventory Health Donut */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF", marginBottom: 4 }}>Inventory Health</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>{available.length} vehicles · live</div>
            <DashboardCharts type="donut" data={donutData} total={available.length} />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Fresh (0–30d)", count: fresh.length,  color: "#10B981" },
                { label: "Watch (31–60d)", count: aged30.length, color: "#F59E0B" },
                { label: "Aged (60d+)",   count: aged60.length,  color: "#EF4444" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }}></div>
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                  </div>
                  <span style={{ color: item.color, fontWeight: 700 }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* By Body Type */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF", marginBottom: 4 }}>By Body Type</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Current stock mix</div>
            {bodyData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>No stock data yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {bodyData.slice(0, 6).map((b, i) => {
                  const pct = available.length ? Math.round(b.value / available.length * 100) : 0
                  const colors = ["#7C3AED","#E8A020","#10B981","#3B82F6","#EF4444","#F59E0B"]
                  return (
                    <div key={b.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{b.name}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{b.value}</span>
                      </div>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: colors[i % colors.length], borderRadius: 3, transition: "width 0.8s ease" }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sales Trend */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF", marginBottom: 4 }}>Sales Trend</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Last 6 months</div>
            <DashboardCharts type="bar" data={trendData} />
          </div>
        </div>

        {/* ── AGED STOCK DETAIL + QUICK ACTIONS ────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>

          {/* Aged Stock Detail */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>Stock Ageing Alert</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>These vehicles are tying up your cash</div>
              </div>
              <Link href="/dashboard/stock" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "rgba(232,160,32,0.12)", color: "#E8A020",
                  border: "1px solid rgba(232,160,32,0.2)", borderRadius: 6,
                  padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>Run Strategy →</button>
              </Link>
            </div>
            <DashboardAged vehicles={available} />
          </div>

          {/* Quick Actions */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF", marginBottom: 16 }}>Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Add Vehicle", href: "/dashboard/stock", icon: "🚗", color: "#7C3AED" },
                { label: "Record a Sale", href: "/dashboard/sales", icon: "$", color: "#10B981" },
                { label: "Ask MAX", href: "/dashboard/assistant", icon: "⚡", color: "#E8A020" },
                { label: "Compliance Forms", href: "/dashboard/forms", icon: "📋", color: "#3B82F6" },
                { label: "Market Intelligence", href: "/dashboard/intel", icon: "📈", color: "#F59E0B" },
              ].map(action => (
                <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 14px", background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10,
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: `${action.color}18`, display: "flex",
                        alignItems: "center", justifyContent: "center", fontSize: 14,
                      }}>{action.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{action.label}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 16 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── RECENT STOCK + RECENT SALES ───────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Recent Stock */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>Recent Stock</div>
              <Link href="/dashboard/stock" style={{ textDecoration: "none", fontSize: 12, color: "#E8A020" }}>All →</Link>
            </div>
            {recentVehicles.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>No vehicles yet</div>
                <Link href="/dashboard/stock" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 12, color: "#E8A020", marginTop: 6 }}>Add your first vehicle →</div>
                </Link>
              </div>
            ) : recentVehicles.map(v => {
              const days = daysAgo(v.date_acquired || v.created_at)
              const ageColor = days >= 60 ? "#EF4444" : days >= 30 ? "#F59E0B" : "#10B981"
              return (
                <div key={v.id} className="recent-row">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>
                      {v.year} {v.make} {v.model}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                      {v.stock_number ? `#${v.stock_number}` : ""}{v.rego ? ` · ${v.rego}` : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F1F0FF" }}>
                      {fmt(v.asking_price || 0)}
                    </div>
                    <div style={{ fontSize: 11, color: ageColor, marginTop: 2, fontWeight: 600 }}>{days}d</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Sales */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>Recent Sales</div>
              <Link href="/dashboard/sales" style={{ textDecoration: "none", fontSize: 12, color: "#E8A020" }}>All →</Link>
            </div>
            {recentSales.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>No sales yet</div>
                <Link href="/dashboard/sales" style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: 12, color: "#E8A020", marginTop: 6 }}>Record your first sale →</div>
                </Link>
              </div>
            ) : recentSales.map(s => (
              <div key={s.id} className="recent-row">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>
                    {s.year} {s.make} {s.model}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                    {s.buyer_first ? `${s.buyer_first} ${s.buyer_last || ""}` : "Buyer"} · {s.sale_date}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#F1F0FF" }}>{fmt(s.sale_price || 0)}</div>
                  <div style={{ fontSize: 11, color: "#10B981", marginTop: 2, fontWeight: 600 }}>
                    +{fmt(s.gross_profit || 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
