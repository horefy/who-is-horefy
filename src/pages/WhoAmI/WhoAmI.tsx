"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import photo from "../../assets/photo_1.png";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/footer";

export default function WhoAmI() {
  const [isOpen, setIsOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

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

  const skills = [
    { label: "Web Fullstack", level: 50 },
    { label: "Postgresql/Mysql", level: 70 },
    { label: "DevOPs", level: 74 },
    { label: "Motion Design", level: 60 },
    { label: "Destop & Mobile", level: 60 },
     { label: "Data Analist", level: 60 },
  ];

  const timeline = [
    { year: "2026", title: "Freelance  Dev", desc: "Project de developpement une application web pour la gestion d'agruculture personnel." },
    { year: "2025", title: "Maintenance d'une web", desc: "Une travail d'optimisation de la site privé de la compagnie du miel à Antananarivo" },
    { year: "2026", title: "Developpement Mobile", desc: "Application mobile inclus des agents AI pour ameliorer la perfonance d'une culture." },
    //{ year: "2018", title: "Formation & Passion", desc: "Auto-formation intensive en design et code à Fianarantsoa." },
  ];

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
        html, body {
          width: 100%; height: 100%;
          overflow-x: hidden;
          background: var(--bg);
          cursor: none;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes lineGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes barFill { from { width: 0% } to { width: var(--bar-w) } }
        @keyframes dotPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.3; transform:scale(0.6) } }

        .skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), rgba(255,59,30,0.4));
          animation: barFill 1.4s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: var(--bar-delay);
          width: 0%;
        }

        .timeline-item:hover .timeline-dot {
          background: var(--accent) !important;
          box-shadow: 0 0 10px rgba(255,59,30,0.35);
        }

        .social-link:hover { color: var(--accent) !important; }
        .nav-link:hover { color: var(--accent) !important; }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="portfolio-cursor-dot portfolio-cursor-dot--sm" />
      <div ref={cursorRingRef} className="portfolio-cursor-ring portfolio-cursor-ring--sm" />

      {/* Top accent line */}
      <div className="portfolio-accent-line" />

      {/* Subtle dot grid (top-left) */}
      <div className="portfolio-dot-grid portfolio-dot-grid--muted">
        {dots.map((_, i) => (
          <span key={i} style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", display: "block", animation: `dotPulse 3s ease-in-out ${i % 2 === 0 ? "0s" : "0.5s"} infinite` }} />
        ))}
      </div>

      {/* Navbar */}
      <Navbar />
      {/* Vertical label */}
      <div className="portfolio-vertical-label">
        À propos — Portfolio 2025
      </div>

      {/* Main content */}
      <main className="portfolio-page-main">

        {/* Header */}
        <section className="portfolio-section-header">
          <p className="portfolio-eyebrow">
            À propos de moi
          </p>
          <h1 className="portfolio-heading-display portfolio-heading-display--whoami">
            Just for code,<br />
            <span style={{ color: "var(--accent)", fontStyle: "normal" }}></span>
          </h1>

          <div className="portfolio-accent-divider" />

          <p className="portfolio-body-mono portfolio-body-mono--whoami">
            Je m'appelle <span style={{ color: "var(--ink)", fontWeight: 700 }}>Rina Horefy</span>, développeur en génie logiciel et gere la systeme de gestion de base de données basé à Fianarantsoa, Madagascar. Je crée des interfaces digitales qui mêlent esthétique rigoureuse et expérience utilisateur fluide — parce que le beau doit aussi être utile.
          </p>
        </section>

        {/* Two-column: portrait + bio stats */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 96, opacity: 0, animation: "slideUp 0.9s ease 1.0s forwards", alignItems: "start" }}>

          {/* Portrait placeholder */}
          <div className="portfolio-portrait-frame">
            {/* Remplacez le texte "Photo à venir" par votre image */}
            <img
              src={photo}
              alt="Portrait"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover" // Crucial pour garder le ratio sans déformer
              }}
            />
          </div>

          {/* Stats & bio */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 32 }}>
            {[
              { num: "2+", label: "Années d'expérience" },
              { num: "5+", label: "Projets livrés" },
              { num: "10+", label: "Clients satisfaits" },
            ].map(({ num, label }) => (
              <div key={label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.15em", marginTop: 6, textTransform: "uppercase" as const }}>{label}</div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginTop: 8 }}>
              {["Design", "React", "TypeScript", "Figma", "Node.js", "Python", "Dart", 'SQL'].map(tag => (
                <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", border: "1px solid rgba(255,59,30,0.3)", padding: "5px 12px", background: "rgba(255,59,30,0.04)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 96, opacity: 0, animation: "slideUp 0.9s ease 1.1s forwards" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 36 }}>Compétences</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 64px" }}>
            {skills.map(({ label, level }, i) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--ink)", letterSpacing: "0.08em" }}>{label}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--accent)" }}>{level}%</span>
                </div>
                <div style={{ height: 2, background: "rgba(26,23,20,0.1)", position: "relative", overflow: "hidden" }}>
                  <div
                    className="skill-bar-fill"
                    style={{ "--bar-w": `${level}%`, "--bar-delay": `${1.2 + i * 0.1}s` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section style={{ marginBottom: 80, opacity: 0, animation: "slideUp 0.9s ease 1.2s forwards" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 40 }}>Parcours</p>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 1, background: "rgba(255,59,30,0.2)" }} />
            {timeline.map(({ year, title, desc }, i) => (
              <div key={year} className="timeline-item" style={{ position: "relative", marginBottom: i < timeline.length - 1 ? 40 : 0, cursor: "none" }}>
                <div className="timeline-dot" style={{ position: "absolute", left: -29, top: 6, width: 10, height: 10, borderRadius: "50%", background: "rgba(255,59,30,0.2)", border: "1px solid var(--accent)", transition: "all 0.3s ease" }} />
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em", minWidth: 40, paddingTop: 3 }}>{year}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{title}</h3>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.8, color: "var(--ink-mid)" }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ opacity: 0, animation: "slideUp 0.9s ease 1.3s forwards", borderTop: "1px solid var(--border)", paddingTop: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 24 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/service" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--bg)", background: "var(--accent)", border: "none", padding: "16px 28px", cursor: "none", textDecoration: "none" }}>
              Mes services
            </Link>
            <a href="mailto:horefyrina@gmail.com" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--ink-mid)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, cursor: "none", border: "1px solid var(--border)", padding: "16px 28px" }}>
              Me contacter
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}