import Link from "next/link"

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#FAF8F3", color: "#0D1F3C" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .serif { font-family: 'Fraunces', serif; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes typing { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .demo-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .demo-card:hover { transform: translateY(-12px) scale(1.02); }
        .feature-card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .feature-card:hover { transform: translateY(-4px); border-color: rgba(232,160,32,0.4) !important; }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: #E8A020; }
        .btn-primary { transition: transform 0.2s, box-shadow 0.2s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(232,160,32,0.35); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .demo-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,248,243,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(13,31,60,0.08)",
        padding: "0 40px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#0D1F3C", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#E8A020", fontSize: 16, fontWeight: 800 }}>L</span>
          </div>
          <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#0D1F3C", letterSpacing: "-0.3px" }}>
            LMCT<span style={{ color: "#E8A020" }}>PRO</span>
          </span>
        </div>
        <nav className="hide-mobile" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Platform","Our Service","How It Works","Pricing","FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g,"-")}`}
              className="nav-link"
              style={{ fontSize: 14, fontWeight: 500, color: "#4A5568", textDecoration: "none" }}>
              {item}
            </a>
          ))}
        </nav>
        <Link href="/auth/sign-up">
          <button className="btn-primary" style={{
            background: "#0D1F3C", color: "#FAF8F3",
            border: "none", borderRadius: 8, padding: "10px 20px",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>
            Start Free Trial →
          </button>
        </Link>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.3)",
              borderRadius: 30, padding: "5px 14px", marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8A020", display: "inline-block" }}></span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#B8740A", letterSpacing: "1px", textTransform: "uppercase" }}>
                For Australian LMCT Dealers
              </span>
            </div>
            <h1 className="serif" style={{
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900,
              lineHeight: 1.05, letterSpacing: "-1px", color: "#0D1F3C",
              marginBottom: 20,
            }}>
              Run your yard.<br />
              We handle<br />
              <em style={{ color: "#E8A020", fontStyle: "italic" }}>everything else.</em>
            </h1>
            <p style={{ fontSize: 17, color: "#4A5568", lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
              LMCT PRO combines <strong>enterprise dealer software</strong> with a{" "}
              <strong>dedicated specialist</strong> who manages your listings, SEO, and paperwork —
              so every hour goes to selling, not typing.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <Link href="/auth/sign-up">
                <button className="btn-primary" style={{
                  background: "#0D1F3C", color: "#FAF8F3",
                  border: "none", borderRadius: 10, padding: "14px 28px",
                  fontSize: 15, fontWeight: 700, cursor: "pointer",
                }}>
                  Try the Software Free — 14 Days →
                </button>
              </Link>
              <a href="#how-it-works">
                <button style={{
                  background: "transparent", color: "#0D1F3C",
                  border: "2px solid rgba(13,31,60,0.2)", borderRadius: 10,
                  padding: "14px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}>
                  See how it works
                </button>
              </a>
            </div>
            <p style={{ fontSize: 12, color: "#9AA5B4" }}>
              ✓ 14-day free trial on the Software plan · No credit card required · Specialist &amp; website plans start immediately
            </p>
            <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 30, padding: "6px 14px",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }}></span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#047857" }}>Cars live in under 60 min</span>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.2)",
                borderRadius: 30, padding: "6px 14px",
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#B8740A" }}>Save 15+ hrs per week</span>
              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div style={{ animation: "float 4s ease-in-out infinite" }}>
            <div style={{
              background: "#0D1F3C", borderRadius: 16, overflow: "hidden",
              boxShadow: "0 40px 120px rgba(13,31,60,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
            }}>
              {/* Browser bar */}
              <div style={{
                background: "#162032", padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#FF5F57","#FFBD2E","#28C840"].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}></div>
                  ))}
                </div>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 4,
                  padding: "3px 10px", fontSize: 10, color: "rgba(255,255,255,0.3)",
                }}>
                  lmctpro.com.au / dashboard
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }}></div>
                  <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>AI Active</span>
                </div>
              </div>
              {/* Dashboard content */}
              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { label: "IN STOCK", value: "14" },
                    { label: "SOLD MTD", value: "7" },
                    { label: "GROSS PROFIT", value: "$38k", highlight: true },
                  ].map(s => (
                    <div key={s.label} style={{
                      background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "12px",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "1px", marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.highlight ? "#10B981" : "#F1F0FF" }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>HANDLED BY YOUR SPECIALIST TODAY</div>
                  {[
                    { task: "CarSales listings live", val: "3 ✓", color: "#10B981" },
                    { task: "Facebook + Gumtree", val: "5 ✓", color: "#10B981" },
                    { task: "Enquiries responded", val: "8 replied ✓", color: "#10B981" },
                    { task: "Compliance form", val: "1 ready ✓", color: "#E8A020" },
                  ].map(t => (
                    <div key={t.task} style={{
                      display: "flex", justifyContent: "space-between",
                      fontSize: 11, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.6)",
                    }}>
                      <span>{t.task}</span>
                      <span style={{ color: t.color, fontWeight: 600 }}>{t.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 12, background: "rgba(232,160,32,0.1)", borderRadius: 6,
                  padding: "8px 12px", fontSize: 11, color: "#E8A020", fontWeight: 600,
                }}>
                  ⚡ Ranger — 73 days — drop to $29,990
                </div>
                {/* Sedans selling badge */}
                <div style={{
                  marginTop: 10, position: "relative", left: "auto",
                  background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 6, padding: "6px 10px", fontSize: 10,
                  color: "#10B981", fontWeight: 600,
                }}>
                  Sedans selling <span style={{ fontWeight: 800 }}>3× faster</span> than SUVs this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────── */}
      <div style={{ background: "#0D1F3C", padding: "12px 0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 0 }}>
              {["Assigning Specialist","Website + SEO Included","No Lock-in Contracts","14-Day Free Trial","Compliance Auto-Fill","Facebook Marketplace","AI-Powered Listings","Assigning Specialist","Website + SEO Included","No Lock-in Contracts","14-Day Free Trial","Compliance Auto-Fill","Facebook Marketplace","AI-Powered Listings"].map((item, j) => (
                <span key={j} style={{
                  fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)",
                  padding: "0 28px", borderRight: "1px solid rgba(255,255,255,0.1)",
                  letterSpacing: "0.5px", textTransform: "uppercase",
                }}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F3", padding: "60px 40px" }}>
        <div className="stats-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            { num: "15+", label: "Hours saved per week", sub: "vs manual processes" },
            { num: "34%", label: "Revenue increase", sub: "avg across dealers" },
            { num: "3mo", label: "Average payback", sub: "from first month" },
            { num: "60s", label: "Car live online", sub: "from photo to listing" },
          ].map(s => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div className="serif" style={{ fontSize: 48, fontWeight: 900, color: "#0D1F3C", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0D1F3C", marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "#9AA5B4", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI IN ACTION ─────────────────────────────────────────── */}
      <section id="platform" style={{
        background: "linear-gradient(160deg, #0A0718 0%, #130F2E 40%, #0D1F3C 100%)",
        padding: "100px 40px", overflow: "hidden", position: "relative",
      }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)", top: -150, left: -80, pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)", bottom: -80, right: -60, pointerEvents: "none" }}></div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 30, padding: "7px 18px", marginBottom: 20,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#A78BFA", animation: "pulse-dot 1.5s infinite" }}></div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#A78BFA", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                AI In Action — Live Demo
              </span>
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#F1F0FF",
              lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: 16,
            }}>
              Plate scan to published listing<br />
              <em style={{ background: "linear-gradient(135deg, #A78BFA, #10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in under 60 seconds
              </em>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              No typing. No re-entering data. Just point, scan, and publish.
            </p>
          </div>

          {/* 3 Demo Cards */}
          <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 56 }}>

            {/* Card 1: Plate Scanner */}
            <div className="demo-card" style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 16, padding: 28, position: "relative", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}></div>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(109,40,217,0.2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
                border: "1px solid rgba(139,92,246,0.3)",
              }}>📸</div>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#A78BFA", marginBottom: 8 }}>
                Step 1 · AI Plate Scanner
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F1F0FF", marginBottom: 8, letterSpacing: "-0.3px" }}>
                Point. Scan. Done.
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
                Camera reads any Victorian plate instantly. No manual entry.
              </div>
              {/* Plate mockup */}
              <div style={{
                background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 16,
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{
                  background: "#F5C842", borderRadius: 6, padding: "10px 16px",
                  textAlign: "center", marginBottom: 12,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 10, color: "#1a1a1a", fontWeight: 800 }}>VICTORIA</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#1a1a1a", letterSpacing: "3px" }}>ABC 123</span>
                  <span style={{ fontSize: 10, color: "#1a1a1a" }}>🏄</span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(16,185,129,0.15)", borderRadius: 6, padding: "8px 12px",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", flexShrink: 0 }}></div>
                  <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>AI identified — 2021 Toyota RAV4</span>
                </div>
              </div>
            </div>

            {/* Card 2: Rego Lookup */}
            <div className="demo-card" style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 16, padding: 28, position: "relative", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}></div>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.15))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
                border: "1px solid rgba(16,185,129,0.3)",
              }}>🔍</div>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#10B981", marginBottom: 8 }}>
                Step 2 · Smart Rego Lookup
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F1F0FF", marginBottom: 8, letterSpacing: "-0.3px" }}>
                All fields. Auto-filled.
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
                Make, model, year, compliance — populated in seconds.
              </div>
              {/* Fields mockup */}
              <div style={{
                background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                {[
                  { label: "Make", value: "Toyota" },
                  { label: "Model", value: "RAV4 GXL AWD" },
                  { label: "Rego Expiry", value: "Mar 2026" },
                  { label: "Compliance", value: "Jan 2021" },
                ].map(f => (
                  <div key={f.label} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: 12,
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{f.label}</span>
                    <span style={{ color: "#10B981", fontWeight: 600 }}>{f.value} ✓</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Listing Builder */}
            <div className="demo-card" style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,160,32,0.2)",
              borderRadius: 16, padding: 28, position: "relative", overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}></div>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(232,160,32,0.3), rgba(180,83,9,0.15))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 16,
                border: "1px solid rgba(232,160,32,0.3)",
              }}>✍️</div>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#E8A020", marginBottom: 8 }}>
                Step 3 · Smart Listing Builder
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F1F0FF", marginBottom: 8, letterSpacing: "-0.3px" }}>
                AI writes it for you.
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
                Professional, SEO-optimised listing ready to publish.
              </div>
              {/* Listing mockup */}
              <div style={{
                background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 14,
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F1F0FF", marginBottom: 8 }}>
                  2021 Toyota RAV4 GXL AWD
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 10 }}>
                  One owner, full service history. This immaculate RAV4 presents in excellent condition throughout...
                </p>
                <div style={{ display: "flex", gap: 6 }}>
                  {["CarSales Ready","SEO Optimised","1-Click Publish"].map(badge => (
                    <span key={badge} style={{
                      fontSize: 9, fontWeight: 700, padding: "3px 7px",
                      background: "rgba(232,160,32,0.15)", color: "#E8A020",
                      borderRadius: 4, border: "1px solid rgba(232,160,32,0.2)",
                    }}>{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <Link href="/auth/sign-up">
              <button className="btn-primary" style={{
                background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
                color: "white", border: "none", borderRadius: 10,
                padding: "16px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}>
                See it live — Start Free Trial →
              </button>
            </Link>
            <p style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              No credit card required · Live in under 60 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ── MEET MAX (AI ADVISOR) ─────────────────────────────────── */}
      <section style={{ background: "#0D1F3C", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8A020", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Meet MAX — Your AI Advisor
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 900, color: "#F1F0FF", lineHeight: 1.15 }}>
              Knows your yard.<br />Tells you what to do.
            </h2>
            <p style={{ marginTop: 16, fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "16px auto 0" }}>
              MAX reads your stock, your sales, and the national market — then tells you exactly what to buy, what to drop, and what to action today.
            </p>
          </div>
          {/* Chat window */}
          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, overflow: "hidden", maxWidth: 680, margin: "0 auto",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#F1F0FF" }}>MAX — AI Business Advisor</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse-dot 2s infinite" }}></div>
                <span style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>Live</span>
              </div>
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { role: "user", text: "What should I stock up on before auction this week?" },
                { role: "ai", text: "Based on your last 90 days — Toyota and Mazda are your fastest movers at 19 days avg. You have 0 Toyotas right now. Your 3 large SUVs have been sitting 54 days — avoid that category." },
                { role: "user", text: "Max buy on a 2020 Camry tomorrow?" },
                { role: "ai", text: "Your avg sell price on Camrys is $23,200. At 15% margin, max buy is $19,500 inc. recon. Pickles clearing at $17,800–$19,200 this week. You have room. ✓" },
              ].map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 10, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "ai" && (
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", background: "#E8A020",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 800, color: "#0D1F3C", flexShrink: 0,
                    }}>M</div>
                  )}
                  <div style={{
                    maxWidth: "75%", padding: "10px 14px", borderRadius: 10, fontSize: 13, lineHeight: 1.6,
                    background: msg.role === "user" ? "rgba(232,160,32,0.15)" : "rgba(255,255,255,0.06)",
                    color: msg.role === "user" ? "#E8A020" : "rgba(255,255,255,0.8)",
                    border: `1px solid ${msg.role === "user" ? "rgba(232,160,32,0.2)" : "rgba(255,255,255,0.06)"}`,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: 10, alignItems: "center",
            }}>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 8,
                padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.25)",
              }}>
                Ask MAX anything about your yard...
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(232,160,32,0.2)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 14, color: "#E8A020",
              }}>↑</div>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            No generic AI. MAX reads YOUR stock · YOUR sales · YOUR margins
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section id="platform-features" style={{ background: "#FAF8F3", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8A020", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Everything in one platform
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#0D1F3C", lineHeight: 1.15 }}>
              Built for how dealers<br />actually work
            </h2>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "🚗", title: "Stock Management", desc: "Track your entire inventory with vehicle records, images, rego alerts, and live status." },
              { icon: "📊", title: "Sales & Profit Tracking", desc: "Real-time gross profit, margin %, and MTD performance across every sale." },
              { icon: "📋", title: "VicRoads Forms Auto-Fill", desc: "Transfer form DTP-1142, sales contract, and GST invoice generated in 8 seconds." },
              { icon: "👥", title: "Customer CRM", desc: "Buyer and seller profiles with full transaction history, hot leads, and follow-up tracking." },
              { icon: "🤖", title: "MAX AI Advisor", desc: "Morning briefings, auction guidance, price drop alerts, and market intelligence daily." },
              { icon: "📈", title: "Reports & Analytics", desc: "Stocktake, aged stock, GST/BAS, turn rate, and P&L reports — all in one click." },
            ].map(f => (
              <div key={f.title} className="feature-card" style={{
                background: "white", borderRadius: 12, padding: 24,
                border: "1px solid rgba(13,31,60,0.08)",
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0D1F3C", marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: "#0D1F3C", padding: "80px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8A020", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
              How it works
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#F1F0FF", lineHeight: 1.15 }}>
              Live in under an hour
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { num: "01", title: "Sign up & add your stock", desc: "Enter your vehicles in minutes. Plate scan fills everything automatically — no manual typing." },
              { num: "02", title: "Your specialist gets to work", desc: "We list your cars on Carsales, Facebook, and your dealer website. Handle every enquiry within the hour." },
              { num: "03", title: "Sell more. Do less admin.", desc: "MAX briefs you every morning. Compliance forms auto-fill. You focus on the lot, we handle everything else." },
            ].map(s => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 56, fontWeight: 900, color: "rgba(232,160,32,0.2)", lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#F1F0FF", marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: "#FAF8F3", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8A020", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Pricing
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#0D1F3C", lineHeight: 1.15 }}>
              Three plans. One for every dealer.
            </h2>
            <p style={{ marginTop: 12, fontSize: 15, color: "#4A5568" }}>No lock-in. No hidden fees. Cancel anytime.</p>
          </div>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                name: "Software + AI",
                price: "$299",
                setup: "$499 setup",
                desc: "The full platform for dealers who want to run it themselves.",
                features: ["All AI features (MAX)", "Compliance forms", "Stock & sales management", "6 report types", "Customer CRM", "14-day free trial"],
                cta: "Start Free Trial",
                highlight: false,
              },
              {
                name: "Done For You",
                price: "$799",
                setup: "$299 setup",
                desc: "Software plus a dedicated specialist who manages the work.",
                features: ["Everything in Software", "Assigned specialist", "Listings managed for you", "Enquiries handled", "Dealer website built", "Priority support"],
                cta: "Get Started",
                highlight: true,
              },
              {
                name: "Grow For You",
                price: "$1,499",
                setup: "No setup fee",
                desc: "Full managed service plus SEO, Google, and social media growth.",
                features: ["Everything in Done For You", "SEO managed monthly", "Google Business Profile", "Social media managed", "Facebook Marketplace", "Monthly growth report"],
                cta: "Get Started",
                highlight: false,
              },
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? "#0D1F3C" : "white",
                border: `2px solid ${plan.highlight ? "#E8A020" : "rgba(13,31,60,0.1)"}`,
                borderRadius: 16, padding: 28,
                transform: plan.highlight ? "scale(1.03)" : "scale(1)",
                boxShadow: plan.highlight ? "0 24px 64px rgba(13,31,60,0.2)" : "none",
                position: "relative",
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "#E8A020", color: "#0D1F3C", fontSize: 11, fontWeight: 800,
                    padding: "4px 16px", borderRadius: 20, letterSpacing: "0.5px",
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, color: plan.highlight ? "#E8A020" : "#0D1F3C", marginBottom: 4 }}>{plan.name}</div>
                <div className="serif" style={{ fontSize: 42, fontWeight: 900, color: plan.highlight ? "#F1F0FF" : "#0D1F3C", lineHeight: 1 }}>{plan.price}</div>
                <div style={{ fontSize: 12, color: plan.highlight ? "rgba(255,255,255,0.4)" : "#9AA5B4", marginBottom: 16 }}>/mo · {plan.setup}</div>
                <p style={{ fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.55)" : "#4A5568", marginBottom: 20, lineHeight: 1.6 }}>{plan.desc}</p>
                <div style={{ borderTop: `1px solid ${plan.highlight ? "rgba(255,255,255,0.1)" : "rgba(13,31,60,0.08)"}`, paddingTop: 20, marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13, color: plan.highlight ? "rgba(255,255,255,0.7)" : "#4A5568" }}>
                      <span style={{ color: "#10B981", fontWeight: 700 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/auth/sign-up">
                  <button style={{
                    width: "100%", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14,
                    cursor: "pointer", border: "none",
                    background: plan.highlight ? "#E8A020" : "#0D1F3C",
                    color: plan.highlight ? "#0D1F3C" : "#FAF8F3",
                  }}>
                    {plan.cta} →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ background: "#0D1F3C", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 900, color: "#F1F0FF" }}>
              Real dealers. Real results.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { quote: "I saved over 15 hours a week I used to waste on admin and listings. My revenue went up 34% in three months.", stats: "15hrs · 34% · 3mo", dealer: "Dealer from Dandenong, VIC", plan: "Grow For You" },
              { quote: "Used to spend Sunday nights doing everything is now by lunch. Get to my leads within the hour thanks to the AI strategy.", stats: "Sunday admin → gone", dealer: "Dealer from Sunshine, VIC", plan: "Done For You" },
              { quote: "Page 1 on Google in 3 weeks. I stopped advertising completely. The SEO alone pays for the whole subscription.", stats: "Page 1 in 3 weeks", dealer: "Dealer from Pakenham, VIC", plan: "Grow For You" },
            ].map(t => (
              <div key={t.quote} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: 24,
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#E8A020", fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 16 }}>"{t.quote}"</p>
                <div style={{
                  background: "rgba(232,160,32,0.1)", borderRadius: 6, padding: "6px 10px",
                  fontSize: 11, color: "#E8A020", fontWeight: 700, marginBottom: 12, display: "inline-block",
                }}>{t.stats}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{t.dealer}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{t.plan}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F3", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0D1F3C", marginBottom: 16 }}>
            Ready to run your yard properly?
          </h2>
          <p style={{ fontSize: 16, color: "#4A5568", marginBottom: 32, lineHeight: 1.7 }}>
            Join Victorian dealers already using LMCT PRO to sell more, work less, and stop losing hours to admin.
          </p>
          <Link href="/auth/sign-up">
            <button className="btn-primary" style={{
              background: "#0D1F3C", color: "#FAF8F3", border: "none",
              borderRadius: 10, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
            }}>
              Start Free Trial — 14 Days →
            </button>
          </Link>
          <p style={{ marginTop: 12, fontSize: 12, color: "#9AA5B4" }}>No credit card required</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ background: "#0D1F3C", padding: "32px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#E8A020", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#0D1F3C", fontSize: 14, fontWeight: 800 }}>L</span>
            </div>
            <span className="serif" style={{ fontSize: 16, fontWeight: 700, color: "#F1F0FF" }}>
              LMCT<span style={{ color: "#E8A020" }}>PRO</span>
            </span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            Built for Australian Licensed Motor Car Traders
          </p>
        </div>
      </footer>
    </div>
  )
}
