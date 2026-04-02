import Link from "next/link"
import { Fraunces } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
})

// SVG icon components — no emojis
const IconCar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h10l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2h-2"/>
    <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
  </svg>
)
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IconFile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
)
const IconBot = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/>
    <line x1="8" y1="15" x2="8" y2="15" strokeWidth="2"/><line x1="12" y1="15" x2="12" y2="15" strokeWidth="2"/><line x1="16" y1="15" x2="16" y2="15" strokeWidth="2"/>
  </svg>
)
const IconPieChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/>
  </svg>
)
const IconCamera = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)
const IconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconEdit = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function LandingPage() {
  return (
    <div className={fraunces.variable} style={{
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#FAF8F3", color: "#0D1F3C", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .ff { font-family: var(--font-fraunces), Georgia, serif; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(139,92,246,0.3)} 50%{box-shadow:0 0 40px rgba(139,92,246,0.6)} }
        .demo-card { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; cursor: default; }
        .demo-card:hover { transform: translateY(-16px) rotateX(2deg) scale(1.03) !important; }
        .feature-card { transition: all 0.25s ease; }
        .feature-card:hover { transform: translateY(-6px); border-color: rgba(232,160,32,0.5) !important; background: white !important; }
        .btn-cta { transition: all 0.2s ease; }
        .btn-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(13,31,60,0.3); }
        .btn-amber:hover { box-shadow: 0 12px 40px rgba(232,160,32,0.4) !important; }
        .nav-a { text-decoration: none; font-size: 14px; font-weight: 500; color: #4A5568; transition: color 0.2s; }
        .nav-a:hover { color: #E8A020; }
        @media (max-width: 900px) {
          .hero-g { grid-template-columns: 1fr !important; }
          .demo-g { grid-template-columns: 1fr !important; }
          .feat-g { grid-template-columns: 1fr 1fr !important; }
          .price-g { grid-template-columns: 1fr !important; }
          .stats-g { grid-template-columns: 1fr 1fr !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,248,243,0.94)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(13,31,60,0.07)",
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo — text only, no box */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <span className="ff" style={{ fontSize: 22, fontWeight: 900, color: "#0D1F3C", letterSpacing: "-0.5px" }}>
            LMCT<span style={{ color: "#E8A020" }}>PRO</span>
          </span>
        </Link>

        <nav className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Platform","Our Service","How It Works","Pricing","FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g,"-")}`} className="nav-a">{item}</a>
          ))}
        </nav>

        <Link href="/auth/sign-up" style={{ textDecoration: "none" }}>
          <button className="btn-cta" style={{
            background: "#0D1F3C", color: "#FAF8F3", border: "none",
            borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            Start Free Trial <IconArrow />
          </button>
        </Link>
      </header>

      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section style={{ padding: "72px 48px 56px", maxWidth: 1240, margin: "0 auto" }}>
        <div className="hero-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.25)",
              borderRadius: 30, padding: "5px 14px", marginBottom: 28,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8A020", animation: "pulse 2s infinite" }}></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#B8740A", letterSpacing: "1px", textTransform: "uppercase" }}>
                For Australian LMCT Dealers
              </span>
            </div>

            <h1 className="ff" style={{
              fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 900,
              lineHeight: 1.03, letterSpacing: "-1.5px", color: "#0D1F3C", marginBottom: 22,
            }}>
              Run your yard.<br />
              We handle<br />
              <em style={{ color: "#E8A020", fontStyle: "italic" }}>everything else.</em>
            </h1>

            <p style={{ fontSize: 17, color: "#4A637A", lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              LMCT PRO combines <strong style={{ color: "#0D1F3C" }}>enterprise dealer software</strong> with a{" "}
              <strong style={{ color: "#0D1F3C" }}>dedicated specialist</strong> who manages your listings, SEO, and paperwork — so every hour goes to selling, not typing.
            </p>

            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <Link href="/auth/sign-up" style={{ textDecoration: "none" }}>
                <button className="btn-cta" style={{
                  background: "#0D1F3C", color: "#FAF8F3", border: "none",
                  borderRadius: 10, padding: "15px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  Try the Software Free — 14 Days <IconArrow />
                </button>
              </Link>
              <a href="#how-it-works" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "transparent", color: "#0D1F3C",
                  border: "1.5px solid rgba(13,31,60,0.18)", borderRadius: 10,
                  padding: "15px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}>
                  See how it works
                </button>
              </a>
            </div>

            <p style={{ fontSize: 12, color: "#9AA5B4", marginBottom: 24 }}>
              ✓ 14-day free trial · No credit card · Specialist plans start immediately
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", text: "Cars live in under 60 min" },
                { color: "#B8740A", bg: "rgba(232,160,32,0.08)", border: "rgba(232,160,32,0.2)", text: "Save 15+ hrs per week" },
              ].map(b => (
                <div key={b.text} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: b.bg, border: `1px solid ${b.border}`,
                  borderRadius: 30, padding: "6px 14px",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color }}></div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: b.color }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating dashboard */}
          <div style={{ animation: "float 5s ease-in-out infinite", perspective: 1000 }}>
            <div style={{
              background: "#0D1F3C", borderRadius: 16, overflow: "hidden",
              boxShadow: "0 48px 140px rgba(13,31,60,0.4), 0 0 0 1px rgba(255,255,255,0.07)",
              transform: "rotateY(-4deg) rotateX(2deg)",
            }}>
              <div style={{
                background: "#162032", padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#FF5F57","#FFBD2E","#28C840"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}></div>
                  ))}
                </div>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 4,
                  padding: "3px 10px", fontSize: 10, color: "rgba(255,255,255,0.3)",
                }}>lmctpro.com.au / dashboard</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }}></div>
                  <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>AI Active</span>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { l: "IN STOCK", v: "14" },
                    { l: "SOLD MTD", v: "7" },
                    { l: "GROSS PROFIT", v: "$38k", g: true },
                  ].map(s => (
                    <div key={s.l} style={{
                      background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 12,
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 4 }}>{s.l}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.g ? "#10B981" : "#F1F0FF" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14,
                  border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12,
                }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "1px", marginBottom: 10 }}>HANDLED BY YOUR SPECIALIST TODAY</div>
                  {[
                    ["CarSales listings live","3 ✓","#10B981"],
                    ["Facebook + Gumtree","5 ✓","#10B981"],
                    ["Enquiries responded","8 replied ✓","#10B981"],
                    ["Compliance form","1 ready ✓","#E8A020"],
                  ].map(([t,v,c]) => (
                    <div key={t} style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: 11, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.55)",
                    }}>
                      <span>{t}</span><span style={{ color: c as string, fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{
                  background: "rgba(232,160,32,0.1)", borderRadius: 6, padding: "8px 12px",
                  fontSize: 11, color: "#E8A020", fontWeight: 600, marginBottom: 8,
                }}>⚡ Ranger — 73 days — drop to $29,990</div>
                <div style={{
                  background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)",
                  borderRadius: 6, padding: "6px 10px", fontSize: 10, color: "#10B981", fontWeight: 600,
                }}>
                  Sedans selling <strong>3× faster</strong> than SUVs this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─────────────────────────────────────────────── */}
      <div style={{ background: "#0D1F3C", padding: "13px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "ticker 35s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {["Assigned Specialist Included","Website + SEO Managed","No Lock-in Contracts","14-Day Free Trial","Compliance Auto-Fill","Facebook Marketplace","AI-Powered Listings","VicRoads Forms Auto-Fill","Plate Scan Technology","Market Intelligence","Morning Briefings","CarSales Integration"].map((item, j) => (
                <span key={j} style={{
                  fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)",
                  padding: "0 32px", borderRight: "1px solid rgba(255,255,255,0.08)",
                  letterSpacing: "1px", textTransform: "uppercase",
                }}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── STATS ──────────────────────────────────────────────── */}
      <section style={{ padding: "64px 48px", background: "#FAF8F3" }}>
        <div className="stats-g" style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { n: "15+", l: "Hours saved weekly", s: "vs manual admin" },
            { n: "34%", l: "Revenue increase", s: "avg across dealers" },
            { n: "3mo", l: "Typical payback", s: "from month one" },
            { n: "60s", l: "Car live online", s: "plate to published" },
          ].map(s => (
            <div key={s.n} style={{ textAlign: "center", padding: "24px 12px" }}>
              <div className="ff" style={{ fontSize: 52, fontWeight: 900, color: "#0D1F3C", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1F3C", marginTop: 8 }}>{s.l}</div>
              <div style={{ fontSize: 12, color: "#9AA5B4", marginTop: 3 }}>{s.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI IN ACTION ───────────────────────────────────────── */}
      <section id="platform" style={{
        background: "linear-gradient(160deg,#08061A 0%,#110D2B 45%,#0C1A33 100%)",
        padding: "100px 48px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Orbs */}
        <div style={{ position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,0.12),transparent 68%)",top:-200,left:-100,pointerEvents:"none" }}></div>
        <div style={{ position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.08),transparent 68%)",bottom:-100,right:-60,pointerEvents:"none" }}></div>
        <div style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,160,32,0.06),transparent 68%)",top:"40%",right:"20%",pointerEvents:"none" }}></div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: 30, padding: "7px 18px", marginBottom: 24,
            }}>
              <div style={{ width: 7,height: 7,borderRadius: "50%",background: "#A78BFA",animation: "pulse 1.5s infinite" }}></div>
              <span style={{ fontSize: 11,fontWeight: 800,color: "#A78BFA",letterSpacing: "1.5px",textTransform: "uppercase" }}>
                AI In Action — Live Demo
              </span>
            </div>
            <h2 className="ff" style={{
              fontSize: "clamp(30px,4.5vw,54px)", fontWeight: 900, color: "#F1F0FF",
              lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 18,
            }}>
              Plate scan to published listing<br />
              <em style={{ background: "linear-gradient(135deg,#A78BFA 0%,#10B981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in under 60 seconds
              </em>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>
              No typing. No re-entering data. Just point, scan, and publish.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="demo-g" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 56, perspective: 1200 }}>

            {/* Card 1 */}
            <div className="demo-card" style={{
              background: "linear-gradient(145deg,rgba(139,92,246,0.08),rgba(109,40,217,0.04))",
              border: "1px solid rgba(139,92,246,0.25)", borderRadius: 20, padding: 32,
              position: "relative", overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)",
            }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.5),transparent)" }}></div>
              <div style={{
                width: 52,height: 52,borderRadius: 16,
                background: "linear-gradient(135deg,rgba(139,92,246,0.3),rgba(109,40,217,0.15))",
                display: "flex",alignItems: "center",justifyContent: "center",
                marginBottom: 20,border: "1px solid rgba(139,92,246,0.3)",
                color: "#A78BFA", animation: "glow 3s infinite",
              }}>
                <IconCamera />
              </div>
              <div style={{ fontSize: 10,fontWeight: 800,textTransform: "uppercase",letterSpacing: "1.5px",color: "#A78BFA",marginBottom: 10 }}>Step 1 · AI Plate Scanner</div>
              <div className="ff" style={{ fontSize: 22,fontWeight: 900,color: "#F1F0FF",marginBottom: 10,letterSpacing: "-0.5px" }}>Point. Scan. Done.</div>
              <div style={{ fontSize: 13,color: "rgba(255,255,255,0.4)",lineHeight: 1.75,marginBottom: 24 }}>Camera reads any Victorian plate instantly. Zero manual entry required.</div>
              <div style={{ background: "rgba(0,0,0,0.35)",borderRadius: 12,padding: 18,border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                  background: "linear-gradient(135deg,#F5C842,#E8A020)",
                  borderRadius: 8,padding: "12px 18px",marginBottom: 14,
                  display: "flex",justifyContent: "space-between",alignItems: "center",
                  boxShadow: "0 4px 16px rgba(232,160,32,0.3)",
                }}>
                  <span style={{ fontSize: 9,color: "#1a1a1a",fontWeight: 900,letterSpacing: "1px" }}>VICTORIA</span>
                  <span style={{ fontSize: 22,fontWeight: 900,color: "#1a1a1a",letterSpacing: "4px" }}>ABC 123</span>
                  <span style={{ fontSize: 14 }}>⚡</span>
                </div>
                <div style={{
                  display: "flex",alignItems: "center",gap: 8,
                  background: "rgba(16,185,129,0.12)",borderRadius: 8,padding: "10px 14px",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}>
                  <div style={{ width: 8,height: 8,borderRadius: "50%",background: "#10B981",flexShrink: 0,animation: "pulse 2s infinite" }}></div>
                  <span style={{ fontSize: 12,color: "#10B981",fontWeight: 600 }}>AI identified — 2021 Toyota RAV4</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="demo-card" style={{
              background: "linear-gradient(145deg,rgba(16,185,129,0.07),rgba(5,150,105,0.03))",
              border: "1px solid rgba(16,185,129,0.22)", borderRadius: 20, padding: 32,
              position: "relative", overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)",
            }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(16,185,129,0.4),transparent)" }}></div>
              <div style={{
                width: 52,height: 52,borderRadius: 16,
                background: "linear-gradient(135deg,rgba(16,185,129,0.28),rgba(5,150,105,0.12))",
                display: "flex",alignItems: "center",justifyContent: "center",
                marginBottom: 20,border: "1px solid rgba(16,185,129,0.3)",
                color: "#10B981",
              }}>
                <IconSearch />
              </div>
              <div style={{ fontSize: 10,fontWeight: 800,textTransform: "uppercase",letterSpacing: "1.5px",color: "#10B981",marginBottom: 10 }}>Step 2 · Smart Rego Lookup</div>
              <div className="ff" style={{ fontSize: 22,fontWeight: 900,color: "#F1F0FF",marginBottom: 10,letterSpacing: "-0.5px" }}>All fields. Auto-filled.</div>
              <div style={{ fontSize: 13,color: "rgba(255,255,255,0.4)",lineHeight: 1.75,marginBottom: 24 }}>Make, model, year, compliance date — all populated in seconds.</div>
              <div style={{ background: "rgba(0,0,0,0.35)",borderRadius: 12,padding: 18,border: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  ["Make","Toyota"],["Model","RAV4 GXL AWD"],["Year","2021"],
                  ["Rego Expiry","Mar 2026"],["Compliance","Jan 2021"],
                ].map(([l,v]) => (
                  <div key={l} style={{
                    display: "flex",justifyContent: "space-between",alignItems: "center",
                    padding: "7px 0",borderBottom: "1px solid rgba(255,255,255,0.05)",fontSize: 12,
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>{l}</span>
                    <span style={{ color: "#10B981",fontWeight: 600,display: "flex",alignItems: "center",gap: 4 }}>
                      {v} <IconCheck />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="demo-card" style={{
              background: "linear-gradient(145deg,rgba(232,160,32,0.07),rgba(180,83,9,0.03))",
              border: "1px solid rgba(232,160,32,0.22)", borderRadius: 20, padding: 32,
              position: "relative", overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)",
            }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(232,160,32,0.4),transparent)" }}></div>
              <div style={{
                width: 52,height: 52,borderRadius: 16,
                background: "linear-gradient(135deg,rgba(232,160,32,0.28),rgba(180,83,9,0.12))",
                display: "flex",alignItems: "center",justifyContent: "center",
                marginBottom: 20,border: "1px solid rgba(232,160,32,0.3)",
                color: "#E8A020",
              }}>
                <IconEdit />
              </div>
              <div style={{ fontSize: 10,fontWeight: 800,textTransform: "uppercase",letterSpacing: "1.5px",color: "#E8A020",marginBottom: 10 }}>Step 3 · Smart Listing Builder</div>
              <div className="ff" style={{ fontSize: 22,fontWeight: 900,color: "#F1F0FF",marginBottom: 10,letterSpacing: "-0.5px" }}>AI writes it for you.</div>
              <div style={{ fontSize: 13,color: "rgba(255,255,255,0.4)",lineHeight: 1.75,marginBottom: 24 }}>Professional, SEO-optimised listing ready to publish in one click.</div>
              <div style={{ background: "rgba(0,0,0,0.35)",borderRadius: 12,padding: 18,border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13,fontWeight: 700,color: "#F1F0FF",marginBottom: 8 }}>2021 Toyota RAV4 GXL AWD</div>
                <p style={{ fontSize: 11,color: "rgba(255,255,255,0.4)",lineHeight: 1.7,marginBottom: 12 }}>
                  One owner, full service history. This immaculate RAV4 presents in excellent condition throughout with low kilometres for the year...
                </p>
                <div style={{ display: "flex",gap: 6,flexWrap: "wrap" }}>
                  {["CarSales Ready","SEO Optimised","1-Click Publish"].map(b => (
                    <span key={b} style={{
                      fontSize: 9,fontWeight: 700,padding: "4px 9px",
                      background: "rgba(232,160,32,0.12)",color: "#E8A020",
                      borderRadius: 5,border: "1px solid rgba(232,160,32,0.2)",letterSpacing: "0.3px",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/auth/sign-up" style={{ textDecoration: "none" }}>
              <button className="btn-cta btn-amber" style={{
                background: "linear-gradient(135deg,#A78BFA,#7C3AED)",
                color: "white",border: "none",borderRadius: 10,
                padding: "16px 40px",fontSize: 15,fontWeight: 700,cursor: "pointer",
                display: "inline-flex",alignItems: "center",gap: 8,
              }}>
                See it live — Start Free Trial <IconArrow />
              </button>
            </Link>
            <p style={{ marginTop: 12,fontSize: 12,color: "rgba(255,255,255,0.25)" }}>No credit card · Live in under 60 minutes</p>
          </div>
        </div>
      </section>

      {/* ─── MAX AI ADVISOR ─────────────────────────────────────── */}
      <section style={{ background: "#0D1F3C", padding: "80px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11,fontWeight: 700,color: "#E8A020",letterSpacing: "1.5px",textTransform: "uppercase",marginBottom: 14 }}>
              Meet MAX — Your AI Advisor
            </div>
            <h2 className="ff" style={{ fontSize: "clamp(28px,4vw,46px)",fontWeight: 900,color: "#F1F0FF",lineHeight: 1.12,letterSpacing: "-0.5px" }}>
              Knows your yard.<br />Tells you what to do.
            </h2>
            <p style={{ marginTop: 16,fontSize: 15,color: "rgba(255,255,255,0.4)",maxWidth: 460,margin: "16px auto 0",lineHeight: 1.75 }}>
              MAX reads your stock, your sales history, and the national market — then tells you exactly what to buy, what to drop, and what to action today.
            </p>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.03)",border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 18,overflow: "hidden",maxWidth: 700,margin: "0 auto",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.025)",padding: "12px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",alignItems: "center",justifyContent: "space-between",
            }}>
              <div style={{ display: "flex",alignItems: "center",gap: 10 }}>
                <div style={{
                  width: 30,height: 30,borderRadius: "50%",background: "#E8A020",
                  display: "flex",alignItems: "center",justifyContent: "center",
                  fontSize: 13,fontWeight: 900,color: "#0D1F3C",
                }}>M</div>
                <span style={{ fontSize: 13,fontWeight: 600,color: "#F1F0FF" }}>MAX — AI Business Advisor</span>
              </div>
              <div style={{ display: "flex",alignItems: "center",gap: 5 }}>
                <div style={{ width: 6,height: 6,borderRadius: "50%",background: "#10B981",animation: "pulse 2s infinite" }}></div>
                <span style={{ fontSize: 11,color: "#10B981",fontWeight: 600 }}>Live</span>
              </div>
            </div>
            <div style={{ padding: "24px 20px",display: "flex",flexDirection: "column",gap: 16 }}>
              {[
                { role:"user", text:"What should I stock up on before auction this week?" },
                { role:"ai",   text:"Based on your last 90 days — Toyota and Mazda are your fastest movers at 19 days avg. You have 0 Toyotas right now. Your 3 large SUVs have been sitting 54 days — avoid that category this week." },
                { role:"user", text:"Max buy on a 2020 Camry tomorrow?" },
                { role:"ai",   text:"Your avg sell price on Camrys is $23,200. At 15% margin, max buy is $19,500 inc. recon. Pickles clearing at $17,800–$19,200 this week. You have room — go for it. ✓" },
              ].map((msg, i) => (
                <div key={i} style={{ display:"flex",gap: 10,justifyContent: msg.role==="user"?"flex-end":"flex-start" }}>
                  {msg.role==="ai" && (
                    <div style={{
                      width: 28,height: 28,borderRadius: "50%",background: "#E8A020",
                      display: "flex",alignItems: "center",justifyContent: "center",
                      fontSize: 11,fontWeight: 900,color: "#0D1F3C",flexShrink: 0,marginTop: 2,
                    }}>M</div>
                  )}
                  <div style={{
                    maxWidth: "76%",padding: "11px 15px",borderRadius: 12,fontSize: 13,lineHeight: 1.65,
                    background: msg.role==="user"?"rgba(232,160,32,0.12)":"rgba(255,255,255,0.05)",
                    color: msg.role==="user"?"#E8C060":"rgba(255,255,255,0.78)",
                    border: `1px solid ${msg.role==="user"?"rgba(232,160,32,0.18)":"rgba(255,255,255,0.05)"}`,
                  }}>{msg.text}</div>
                </div>
              ))}
            </div>
            <div style={{
              padding: "14px 18px",borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",gap: 10,alignItems: "center",
            }}>
              <div style={{
                flex: 1,background: "rgba(255,255,255,0.04)",borderRadius: 8,
                padding: "9px 14px",fontSize: 12,color: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>Ask MAX anything about your yard...</div>
              <div style={{
                width: 36,height: 36,borderRadius: 8,
                background: "rgba(232,160,32,0.18)",display: "flex",alignItems: "center",
                justifyContent: "center",color: "#E8A020",cursor: "pointer",
              }}><IconArrow /></div>
            </div>
          </div>
          <p style={{ textAlign:"center",marginTop: 16,fontSize: 12,color: "rgba(255,255,255,0.2)" }}>
            No generic AI · MAX reads YOUR stock · YOUR sales · YOUR margins
          </p>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────────── */}
      <section id="our-service" style={{ background: "#FAF8F3", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign:"center",marginBottom: 56 }}>
            <div style={{ fontSize: 11,fontWeight: 700,color: "#E8A020",letterSpacing: "1.5px",textTransform: "uppercase",marginBottom: 14 }}>Everything in one platform</div>
            <h2 className="ff" style={{ fontSize: "clamp(28px,3.5vw,46px)",fontWeight: 900,color: "#0D1F3C",lineHeight: 1.12,letterSpacing: "-0.5px" }}>
              Built for how dealers<br />actually work
            </h2>
          </div>
          <div className="feat-g" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap: 16 }}>
            {[
              { icon:<IconCar />,   title:"Stock Management",       desc:"Track your entire inventory with vehicle records, rego alerts, images, and live status updates." },
              { icon:<IconChart />, title:"Sales & Profit Tracking", desc:"Real-time gross profit, margin %, and MTD performance across every single sale you make." },
              { icon:<IconFile />,  title:"VicRoads Forms Auto-Fill",desc:"Transfer form DTP-1142, sales contract, and GST invoice generated and ready in 8 seconds." },
              { icon:<IconUsers />, title:"Customer CRM",            desc:"Buyer and seller profiles with full transaction history, hot leads, and follow-up tracking." },
              { icon:<IconBot />,   title:"MAX AI Advisor",          desc:"Morning briefings, auction guidance, price drop alerts, and market intelligence every day." },
              { icon:<IconPieChart />,title:"Reports & Analytics",   desc:"Stocktake, aged stock, GST/BAS, turn rate, and P&L — all in one click, always current." },
            ].map(f => (
              <div key={f.title} className="feature-card" style={{
                background: "#FDFCF9",borderRadius: 14,padding: 28,
                border: "1px solid rgba(13,31,60,0.07)",
              }}>
                <div style={{
                  width: 48,height: 48,borderRadius: 12,
                  background: "rgba(13,31,60,0.05)",display: "flex",alignItems: "center",
                  justifyContent: "center",color: "#0D1F3C",marginBottom: 18,
                }}>{f.icon}</div>
                <div style={{ fontSize: 15,fontWeight: 700,color: "#0D1F3C",marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13,color: "#4A637A",lineHeight: 1.75 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: "#0D1F3C", padding: "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign:"center",marginBottom: 56 }}>
            <div style={{ fontSize: 11,fontWeight: 700,color: "#E8A020",letterSpacing: "1.5px",textTransform: "uppercase",marginBottom: 14 }}>How it works</div>
            <h2 className="ff" style={{ fontSize: "clamp(28px,3.5vw,46px)",fontWeight: 900,color: "#F1F0FF",lineHeight: 1.12,letterSpacing: "-0.5px" }}>
              Live in under an hour
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap: 40 }}>
            {[
              { n:"01",t:"Sign up & add your stock",d:"Enter your vehicles in minutes. Plate scan fills everything automatically — no manual typing ever." },
              { n:"02",t:"Your specialist gets to work",d:"We list your cars on Carsales, Facebook, and your dealer website. Handle every enquiry within the hour." },
              { n:"03",t:"Sell more. Do less admin.",d:"MAX briefs you every morning. Compliance forms auto-fill. You focus on the lot, we handle everything else." },
            ].map(s => (
              <div key={s.n} style={{ textAlign:"center" }}>
                <div className="ff" style={{ fontSize: 64,fontWeight: 900,color: "rgba(232,160,32,0.15)",lineHeight: 1,marginBottom: 20 }}>{s.n}</div>
                <div style={{ fontSize: 17,fontWeight: 700,color: "#F1F0FF",marginBottom: 10 }}>{s.t}</div>
                <div style={{ fontSize: 13,color: "rgba(255,255,255,0.4)",lineHeight: 1.75 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: "#FAF8F3", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign:"center",marginBottom: 56 }}>
            <div style={{ fontSize: 11,fontWeight: 700,color: "#E8A020",letterSpacing: "1.5px",textTransform: "uppercase",marginBottom: 14 }}>Pricing</div>
            <h2 className="ff" style={{ fontSize: "clamp(28px,3.5vw,46px)",fontWeight: 900,color: "#0D1F3C",lineHeight: 1.12,letterSpacing: "-0.5px" }}>
              Three plans. One for every dealer.
            </h2>
            <p style={{ marginTop: 12,fontSize: 15,color: "#4A637A" }}>No lock-in. No hidden fees. Cancel anytime.</p>
          </div>
          <div className="price-g" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap: 20 }}>
            {[
              {
                name:"Software + AI", price:"$299", setup:"+ $499 setup",
                desc:"The full platform for dealers who want to run it themselves.",
                features:["Full DMS — stock, sales, CRM","All AI features (MAX)","Compliance forms in 8 seconds","6 report types","Morning briefings","14-day free trial"],
                cta:"Start Free Trial", highlight:false,
              },
              {
                name:"Done For You", price:"$799", setup:"+ $299 setup",
                desc:"Software plus a dedicated specialist who manages the work for you.",
                features:["Everything in Software","Assigned specialist","Listings managed for you","All enquiries handled","Dealer website built","Priority support"],
                cta:"Get Started", highlight:true,
              },
              {
                name:"Grow For You", price:"$1,499", setup:"No setup fee",
                desc:"Full managed service plus SEO, Google, and social growth.",
                features:["Everything in Done For You","SEO managed monthly","Google Business Profile","Social media managed","Facebook Marketplace","Monthly growth report"],
                cta:"Get Started", highlight:false,
              },
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? "#0D1F3C" : "white",
                border: `${plan.highlight ? 2 : 1}px solid ${plan.highlight ? "#E8A020" : "rgba(13,31,60,0.08)"}`,
                borderRadius: 16,padding: 30,
                transform: plan.highlight ? "scale(1.04)" : "scale(1)",
                boxShadow: plan.highlight ? "0 32px 80px rgba(13,31,60,0.25)" : "none",
                position: "relative",
              }}>
                {plan.highlight && (
                  <div style={{
                    position:"absolute",top: -13,left: "50%",transform: "translateX(-50%)",
                    background: "#E8A020",color: "#0D1F3C",fontSize: 10,fontWeight: 800,
                    padding: "4px 16px",borderRadius: 20,letterSpacing: "0.5px",whiteSpace: "nowrap",
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontSize: 12,fontWeight: 700,color: plan.highlight?"#E8A020":"#0D1F3C",marginBottom: 6 }}>{plan.name}</div>
                <div className="ff" style={{ fontSize: 46,fontWeight: 900,color: plan.highlight?"#F1F0FF":"#0D1F3C",lineHeight: 1 }}>{plan.price}</div>
                <div style={{ fontSize: 12,color: plan.highlight?"rgba(255,255,255,0.35)":"#9AA5B4",marginBottom: 16 }}>/mo · {plan.setup}</div>
                <p style={{ fontSize: 13,color: plan.highlight?"rgba(255,255,255,0.5)":"#4A637A",marginBottom: 22,lineHeight: 1.7 }}>{plan.desc}</p>
                <div style={{ borderTop:`1px solid ${plan.highlight?"rgba(255,255,255,0.08)":"rgba(13,31,60,0.07)"}`,paddingTop: 22,marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display:"flex",alignItems:"center",gap: 10,padding: "5px 0",fontSize: 13,color: plan.highlight?"rgba(255,255,255,0.65)":"#4A637A" }}>
                      <span style={{ color:"#10B981",flexShrink: 0 }}><IconCheck /></span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/auth/sign-up" style={{ textDecoration:"none" }}>
                  <button style={{
                    width:"100%",padding: "13px",borderRadius: 9,fontWeight: 700,fontSize: 14,
                    cursor:"pointer",border:"none",
                    background: plan.highlight?"#E8A020":"#0D1F3C",
                    color: plan.highlight?"#0D1F3C":"#FAF8F3",
                    display:"flex",alignItems:"center",justifyContent:"center",gap: 6,
                  }}>
                    {plan.cta} <IconArrow />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      <section style={{ background:"#0D1F3C",padding:"80px 48px" }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <h2 className="ff" style={{ fontSize:"clamp(26px,3.5vw,44px)",fontWeight:900,color:"#F1F0FF",letterSpacing:"-0.5px" }}>
              Real dealers. Real results.
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {[
              { q:"I saved over 15 hours a week I used to waste on admin and listings. My revenue went up 34% in three months.", s:"15hrs · 34% · 3mo", d:"Dealer — Dandenong VIC", p:"Grow For You" },
              { q:"Used to spend Sunday nights doing everything. Now it's done by lunch. Get to my leads within the hour thanks to the specialist.", s:"Sunday admin → gone", d:"Dealer — Sunshine VIC", p:"Done For You" },
              { q:"Page 1 on Google in 3 weeks. I stopped advertising completely. The SEO alone pays for the whole subscription.", s:"Page 1 · 3 weeks", d:"Dealer — Pakenham VIC", p:"Grow For You" },
            ].map(t => (
              <div key={t.q} style={{
                background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:14,padding:24,
              }}>
                <div style={{ display:"flex",gap:2,marginBottom:14 }}>
                  {[...Array(5)].map((_,i) => <span key={i} style={{ color:"#E8A020",fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontSize:13,color:"rgba(255,255,255,0.65)",lineHeight:1.75,marginBottom:16 }}>"{t.q}"</p>
                <div style={{
                  background:"rgba(232,160,32,0.08)",borderRadius:6,padding:"5px 10px",
                  fontSize:11,color:"#E8A020",fontWeight:700,marginBottom:12,display:"inline-block",
                }}>{t.s}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,0.35)" }}>{t.d}</div>
                <div style={{ fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2 }}>{t.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section style={{ background:"#FAF8F3",padding:"80px 48px",textAlign:"center" }}>
        <div style={{ maxWidth:580,margin:"0 auto" }}>
          <h2 className="ff" style={{ fontSize:"clamp(28px,4vw,50px)",fontWeight:900,color:"#0D1F3C",letterSpacing:"-0.5px",marginBottom:18 }}>
            Ready to run your yard properly?
          </h2>
          <p style={{ fontSize:16,color:"#4A637A",marginBottom:36,lineHeight:1.75 }}>
            Join Victorian dealers already using LMCT PRO to sell more, work less, and stop losing hours to admin.
          </p>
          <Link href="/auth/sign-up" style={{ textDecoration:"none" }}>
            <button className="btn-cta" style={{
              background:"#0D1F3C",color:"#FAF8F3",border:"none",
              borderRadius:10,padding:"16px 44px",fontSize:16,fontWeight:700,cursor:"pointer",
              display:"inline-flex",alignItems:"center",gap:8,
            }}>
              Start Free Trial — 14 Days <IconArrow />
            </button>
          </Link>
          <p style={{ marginTop:12,fontSize:12,color:"#9AA5B4" }}>No credit card required</p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ background:"#0D1F3C",padding:"28px 48px",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <span className="ff" style={{ fontSize:18,fontWeight:900,color:"#F1F0FF" }}>
            LMCT<span style={{ color:"#E8A020" }}>PRO</span>
          </span>
          <p style={{ fontSize:12,color:"rgba(255,255,255,0.25)" }}>Built for Australian Licensed Motor Car Traders</p>
        </div>
      </footer>
    </div>
  )
}
