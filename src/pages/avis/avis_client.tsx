"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const REVIEWS = [
  {
    id: 1,
    name: "Sophie Marchand",
    role: "Directrice Marketing",
    company: "Agence Lumière",
    rating: 5,
    date: "Mars 2025",
    text: "Rina a transformé notre vision en quelque chose qu'on n'aurait pas osé imaginer. Le rendu final a dépassé ce qu'on avait demandé — sans jamais perdre de vue l'objectif. Livraison impeccable, communication claire du début à la fin.",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Julien Raoelison",
    role: "Fondateur",
    company: "StartupMada",
    rating: 5,
    date: "Janvier 2025",
    text: "J'avais un projet e-commerce assez complexe avec des contraintes techniques bien précises. Tout a été respecté, et le code est propre, maintenable. Un vrai travail de développeuse sérieuse.",
    avatar: "JR",
  },
  {
    id: 3,
    name: "Camille Fontaine",
    role: "Product Owner",
    company: "TechFlow",
    rating: 5,
    date: "Novembre 2024",
    text: "Ce qui m'a frappée, c'est la rigueur. Pas une seule fonctionnalité bâclée. Et quand il y a eu un problème en cours de route, elle l'a signalé directement et proposé une solution. C'est rare.",
    avatar: "CF",
  },
  {
    id: 4,
    name: "Ahmed Rakoto",
    role: "CEO",
    company: "Innov'Digital",
    rating: 5,
    date: "Septembre 2024",
    text: "Interface soignée, architecture backend solide. On sent que c'est quelqu'un qui pense au produit entier, pas juste à sa partie du code. Je recommande sans hésitation.",
    avatar: "AR",
  },
  {
    id: 5,
    name: "Marie-Claire Dubois",
    role: "Responsable SI",
    company: "Groupe Austral",
    rating: 4,
    date: "Juillet 2024",
    text: "Très bon travail sur l'application de gestion. Quelques allers-retours en phase de cadrage, mais rien d'inhabituel. Le résultat final est robuste et l'équipe a bien pris en main l'outil.",
    avatar: "MD",
  },
  {
    id: 6,
    name: "Thomas Andriamahaly",
    role: "Directeur Technique",
    company: "MadaTech Solutions",
    rating: 5,
    date: "Mai 2024",
    text: "On a collaboré sur une refonte complète de notre système de réservation. Rina a su s'adapter à nos contraintes métier — et croyez-moi, elles étaient nombreuses. Résultat : une appli stable, des utilisateurs satisfaits.",
    avatar: "TA",
  },
];

export default function Avis() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | 5 | 4>("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // ── Custom cursor ──
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (cursorRef.current) { cursorRef.current.style.left = mx + "px"; cursorRef.current.style.top = my + "px"; }
      if (cursorRingRef.current) { cursorRingRef.current.style.left = rx + "px"; cursorRingRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const dots = Array.from({ length: 30 });
  const filtered = activeFilter === "all" ? REVIEWS : REVIEWS.filter(r => r.rating === activeFilter);
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --accent: #FF3B1E;
          --ink: #1A1714;
          --ink-mid: #6B6560;
          --ink-light: #A8A39E;
          --bg: #F7F4F0;
          --bg-warm: #F0EBE4;
          --border: rgba(26,23,20,0.10);
        }
        html, body { width: 100%; height: 100%; overflow-x: hidden; background: var(--bg); cursor: none; }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes lineGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes dotPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.3; transform:scale(0.6) } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }

        .filter-btn:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
        .filter-btn.active { border-color: var(--accent) !important; color: var(--accent) !important; background: rgba(255,59,30,0.08) !important; }
        .review-card:hover { border-color: rgba(255,59,30,0.3) !important; }
        .nav-link:hover { color: var(--accent) !important; }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="portfolio-cursor-dot portfolio-cursor-dot--sm" />
      <div ref={cursorRingRef} className="portfolio-cursor-ring portfolio-cursor-ring--sm" />

      {/* Top accent line */}
      <div className="portfolio-accent-line" />

      {/* Dot grid */}
      <div className="portfolio-dot-grid portfolio-dot-grid--muted">
        {dots.map((_, i) => (
          <span key={i} style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", display: "block", animation: `dotPulse 3s ease-in-out ${i % 2 === 0 ? "0s" : "0.5s"} infinite` }} />
        ))}
      </div>

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, right: 0, zIndex: 100, padding: "24px 32px", animation: "fadeIn 1s ease both", display: "flex", alignItems: "center", gap: 24 }}>
        <Link to="/" className="nav-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--ink-mid)", textDecoration: "none", cursor: "none", transition: "color 0.3s ease" }}>Accueil</Link>
        <Link to="/services" className="nav-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--ink-mid)", textDecoration: "none", cursor: "none", transition: "color 0.3s ease" }}>Services</Link>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 5, background: "var(--ink)", border: "1px solid var(--ink)", padding: "12px 14px", cursor: "none" }}>
          {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 1.5, background: "var(--bg)" }} />)}
        </div>
      </nav>

      {/* Vertical label */}
      <div className="portfolio-vertical-label">
        Avis — Portfolio 2025
      </div>

      {/* Main */}
      <main className="portfolio-page-main">

        {/* Header */}
        <section className="portfolio-section-header" style={{ marginBottom: 64 }}>
          <p className="portfolio-eyebrow">
            Témoignages
          </p>
          <h1 className="portfolio-heading-display portfolio-heading-display--whoami">
            Ce que disent<br />
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>les clients.</span>
          </h1>
          <div className="portfolio-accent-divider" />
        </section>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: 48, marginBottom: 64, opacity: 0, animation: "slideUp 0.8s ease 0.85s forwards", borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{avgRating}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink-light)", textTransform: "uppercase" as const, marginTop: 8 }}>Note moyenne</p>
          </div>
          <div style={{ width: 1, background: "var(--border)" }} />
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "var(--ink)", lineHeight: 1 }}>{REVIEWS.length}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink-light)", textTransform: "uppercase" as const, marginTop: 8 }}>Avis vérifiés</p>
          </div>
          <div style={{ width: 1, background: "var(--border)" }} />
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "var(--ink)", lineHeight: 1 }}>100<span style={{ fontSize: 28, color: "var(--accent)" }}>%</span></p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink-light)", textTransform: "uppercase" as const, marginTop: 8 }}>Recommandent</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 48, opacity: 0, animation: "slideUp 0.8s ease 1s forwards" }}>
          {(["all", 5, 4] as const).map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: activeFilter === f ? "var(--accent)" : "var(--ink-light)",
                background: activeFilter === f ? "rgba(255,59,30,0.08)" : "transparent",
                border: `1px solid ${activeFilter === f ? "var(--accent)" : "var(--border)"}`,
                padding: "10px 20px",
                cursor: "none",
                transition: "all 0.3s ease",
              }}
            >
              {f === "all" ? "Tous" : `${f} ★`}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 28 }}>
          {filtered.map((review, idx) => (
            <div
              key={review.id}
              className="review-card"
              onMouseEnter={() => setHoveredCard(review.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                border: "1px solid var(--border)",
                padding: "32px",
                position: "relative",
                transition: "border-color 0.3s ease",
                opacity: 0,
                animation: `cardIn 0.6s ease ${0.9 + idx * 0.1}s forwards`,
                background: hoveredCard === review.id ? "rgba(255,59,30,0.02)" : "transparent",
              }}
            >
              {/* Left accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: hoveredCard === review.id ? "100%" : "40px", background: "var(--accent)", transition: "height 0.4s cubic-bezier(0.76,0,0.24,1)" }} />

              {/* Quote mark */}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, color: "rgba(255,59,30,0.12)", lineHeight: 1, marginBottom: 4, marginLeft: -4 }}>"</div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ fontSize: 11, color: i < review.rating ? "var(--accent)" : "var(--border)" }}>★</span>
                ))}
              </div>

              {/* Text */}
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "var(--ink-mid)", lineHeight: 1.9, marginBottom: 28 }}>
                {review.text}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 40, height: 40,
                  background: "rgba(255,59,30,0.08)",
                  border: "1px solid rgba(255,59,30,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}>
                  {review.avatar}
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink)", letterSpacing: "0.05em" }}>{review.name}</p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "var(--ink-light)", letterSpacing: "0.1em", marginTop: 4 }}>{review.role} — {review.company}</p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(26,23,20,0.3)", letterSpacing: "0.08em" }}>{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 80, padding: "48px", border: "1px solid rgba(255,59,30,0.2)", background: "rgba(255,59,30,0.03)", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0, animation: "slideUp 0.9s ease 1.6s forwards", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "var(--accent)" }} />
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 12 }}>Votre projet</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "var(--ink)" }}>Rejoignez la liste.</p>
          </div>
          <Link
            to="/contact"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "var(--bg)",
              background: "var(--accent)",
              textDecoration: "none",
              padding: "18px 36px",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              transition: "background 0.3s ease",
            }}
          >
            Me contacter
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="portfolio-footer-bar" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.9, color: "var(--ink-mid)", letterSpacing: "0.05em" }}>
          Travaillons ensemble
          <a href="mailto:horefyrina@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", display: "block" }}>horefyrina@gmail.com</a>
          +261 38 75 164 80
        </div>
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {["FB", "TW", "LI", "BE", "IG"].map(s => (
            <a key={s} href="#" style={{ color: "var(--ink-light)", textDecoration: "none", fontSize: 11, letterSpacing: "0.08em", fontFamily: "'Space Mono', monospace", cursor: "none", transition: "color 0.3s ease" }}>{s}</a>
          ))}
        </nav>
      </footer>
    </>
  );
}