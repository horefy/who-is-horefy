"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/footer";

const services = [
  {
    num: "01",
    title: "Mobile / Desktop App",
    short: "Interfaces mémorables",
    desc: "Conception d'expériences utilisateur élaborées : wireframes, prototypes interactifs, design systems et interfaces pixel-perfect adaptées à vos besoins.",
    tags: ["Figma", "Phython", "Design System", "Java FX", "Flutter", "React Native"],
  },
  {
    num: "02",
    title: "Développement Back-end & Front-end",
    short: "Code propre & performant",
    desc: "Intégration et développement front-end avec React, Next.js et TypeScript. Du composant isolé à l'application complète, livrée en production.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS", "Python", "PHP", "Node.js"],
  },
  {
    num: "03",
    title: "Branding & Identité",
    short: "Une marque cohérente",
    desc: "Création d'identités visuelles fortes : logo, palette, typographie et guidelines qui donnent une personnalité unique à votre projet ou entreprise.",
    tags: ["Logo", "Charte graphique", "Illustration", "Motion"],
  },
  {
    num: "04",
    title: "Consulting Design",
    short: "Regard expert",
    desc: "Audit UX, revue de code front-end, recommandations stratégiques et accompagnement de vos équipes pour améliorer qualité et cohérence produit.",
    tags: ["Audit UX", "Code Review", "Stratégie", "Formation"],
  },
];

const process = [
  { step: "01", label: "Découverte", desc: "Échanges approfondis pour cerner vos objectifs, votre cible et vos contraintes." },
  { step: "02", label: "Conception", desc: "Maquettes, prototypes et itérations jusqu'à la validation complète du design." },
  { step: "03", label: "Développement", desc: "Intégration rigoureuse, code maintenable et tests sur tous les supports." },
  { step: "04", label: "Livraison", desc: "Mise en ligne, transfert des assets et suivi post-lancement." },
];

export default function Service() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Détection mobile ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Background gradient ──
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d")!;
      const g = ctx.createRadialGradient(
        window.innerWidth * 0.35, window.innerHeight * 0.5, 0,
        window.innerWidth * 0.5, window.innerHeight * 0.5, window.innerWidth * 0.8
      );
      g.addColorStop(0, "#EDE5D8");
      g.addColorStop(0.4, "#F0EBE3");
      g.addColorStop(1, "#F5F1EC");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const g2 = ctx.createRadialGradient(
        window.innerWidth * 0.65, window.innerHeight * 0.45, 0,
        window.innerWidth * 0.65, window.innerHeight * 0.45, 340
      );
      g2.addColorStop(0, "rgba(255,59,30,0.10)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  // ── Custom cursor (desktop uniquement) ──
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  const dots = Array.from({ length: 30 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --accent: #FF3B1E;
          --dark: #1A1410;
          --bg: #F5F1EC;
        }
        html, body { width: 100%; height: 100%; overflow-x: hidden; background: var(--bg); }

        @media (min-width: 768px) {
          html, body { cursor: none; }
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(-30px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes lineGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes dotPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.35; transform:scale(0.65) } }
        @keyframes expandH { from { max-height: 0; opacity: 0 } to { max-height: 400px; opacity: 1 } }

        .service-row {
          width: 100%;
          display: block;
          padding: 0;
          text-align: left;
          font: inherit;
          color: inherit;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(26,20,16,0.06);
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .service-row:hover { background: rgba(26,20,16,0.03); }
        .service-row:hover .service-num { color: var(--accent) !important; }
        .service-row:hover .service-arrow { transform: translateX(4px); color: var(--accent) !important; }
        .service-arrow { transition: transform 0.3s ease, color 0.3s ease; }
        .service-detail { overflow: hidden; animation: expandH 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .process-card:hover { border-color: rgba(255,59,30,0.4) !important; background: rgba(255,59,30,0.03) !important; }

        /* ── Process grid ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }

        /* ── CTA section ── */
        .cta-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
        }

        /* ── Dot grid ── */
        .dot-grid {
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(6, 10px);
          gap: 8px;
          opacity: 0.7;
          animation: fadeIn 1.2s ease 0.3s both;
        }

        /* ── Label vertical — caché mobile ── */
        .vertical-label {
          position: fixed;
          left: 28px;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(26,20,16,0.2);
          z-index: 10;
          animation: fadeIn 1s ease 1s both;
          white-space: nowrap;
        }

        /* ── Service detail padding mobile ── */
        .service-detail-inner {
          padding-left: 60px;
          padding-bottom: 28px;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 767px) {
          .dot-grid {
            display: none;
          }

          .vertical-label {
            display: none;
          }

          .service-main {
            padding: 100px 5% 60px !important;
          }

          .service-header {
            margin-bottom: 48px !important;
          }

          .process-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .service-detail-inner {
            padding-left: 20px;
            padding-bottom: 20px;
          }

          .cta-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-buttons a {
            text-align: center;
            justify-content: center;
            width: 100%;
          }

          .pricing-section {
            padding: 28px 20px !important;
          }
        }

        @media (max-width: 480px) {
          .service-main {
            padding: 88px 4% 48px !important;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Cursor — desktop uniquement */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="portfolio-cursor-dot portfolio-cursor-dot--multiply" />
          <div ref={cursorRingRef} className="portfolio-cursor-ring" />
        </>
      )}

      {/* Top accent line */}
      <div className="portfolio-accent-line" />

      {/* Background canvas */}
      <canvas ref={bgCanvasRef} className="portfolio-canvas-bg" />

      {/* Noise overlay */}
      <div className="portfolio-noise-overlay" />

      {/* Dot grid */}
      <div className="dot-grid">
        {dots.map((_, i) => (
          <span key={i} style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", display: "block", animation: `dotPulse 3s ease-in-out ${i % 2 === 0 ? "0s" : "0.5s"} infinite` }} />
        ))}
      </div>

      <Navbar />

      {/* Vertical label — desktop uniquement */}
      <div className="vertical-label">
        Services — Portfolio 2026
      </div>

      {/* Main content */}
      <main className="service-main portfolio-page-main">

        {/* Header */}
        <section className="service-header portfolio-section-header">
          <p className="portfolio-eyebrow">
            Ce que je fais
          </p>
          <h1 className="portfolio-heading-display">
            Mes services
          </h1>
          <div className="portfolio-accent-divider" />
          <p className="portfolio-body-mono">
            Je travaille avec des startups, des entreprises et des indépendants pour concevoir et développer des produits digitaux qui se démarquent. Chaque projet est unique.
          </p>
        </section>

        {/* Services accordion */}
        <section style={{ marginBottom: 100, opacity: 0, animation: "slideUp 0.9s ease 1.0s forwards" }}>
          {services.map((svc, i) => (
            <button
              type="button"
              key={svc.num}
              className="service-row"
              aria-expanded={activeService === i}
              onClick={() => setActiveService(activeService === i ? null : i)}
            >
              <div style={{ padding: "28px 0", display: "flex", alignItems: "center", gap: isMobile ? 16 : 32 }}>
                <span className="service-num" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(26,20,16,0.2)", letterSpacing: "0.15em", minWidth: 28, transition: "color 0.3s ease" }}>{svc.num}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 3vw, 32px)", fontWeight: 900, color: "var(--dark)", lineHeight: 1.1 }}>{svc.title}</h2>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(26,20,16,0.35)", letterSpacing: "0.12em", marginTop: 4, textTransform: "uppercase" as const }}>{svc.short}</p>
                </div>
                <span className="service-arrow" style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: "rgba(26,20,16,0.3)", flexShrink: 0 }}>
                  {activeService === i ? "−" : "+"}
                </span>
              </div>

              {activeService === i && (
                <div className="service-detail">
                  <div className="service-detail-inner">
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, lineHeight: 2.0, color: "rgba(26,20,16,0.55)", maxWidth: 520, marginBottom: 20 }}>{svc.desc}</p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                      {svc.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", border: "1px solid rgba(255,59,30,0.35)", padding: "4px 10px" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </section>

        {/* Process */}
        <section style={{ marginBottom: 96, opacity: 0, animation: "slideUp 0.9s ease 1.1s forwards" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 16 }}>Ma méthode</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 900, color: "var(--dark)", marginBottom: 48 }}>
            Un processus <span style={{ fontStyle: "italic", color: "var(--accent)" }}>éprouvé.</span>
          </h2>
          <div className="process-grid">
            {process.map(({ step, label, desc }) => (
              <div
                key={step}
                className="process-card"
                style={{ padding: "28px 24px", border: "1px solid rgba(26,20,16,0.06)", transition: "border-color 0.3s ease, background 0.3s ease" }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: "rgba(255,59,30,0.2)", lineHeight: 1, marginBottom: 16 }}>{step}</div>
                <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "var(--dark)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" as const }}>{label}</h3>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, lineHeight: 1.9, color: "rgba(26,20,16,0.4)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing hint */}
        <section
          className="pricing-section"
          style={{ marginBottom: 80, opacity: 0, animation: "slideUp 0.9s ease 1.2s forwards", padding: "40px", border: "1px solid rgba(255,59,30,0.2)", background: "rgba(255,59,30,0.03)", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "var(--accent)" }} />
          <div style={{ paddingLeft: 20 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 12 }}>Tarification</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, color: "var(--dark)", marginBottom: 12 }}>Chaque projet est unique — les tarifs aussi.</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.9, color: "rgba(26,20,16,0.5)", maxWidth: 480 }}>
              Je travaille en devis personnalisé selon la complexité, les délais et l'envergure du projet. Parlons-en pour trouver la formule qui vous convient.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" style={{ opacity: 0, animation: "slideUp 0.9s ease 1.3s forwards", borderTop: "1px solid rgba(26,20,16,0.06)", paddingTop: 48 }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(26,20,16,0.4)", textTransform: "uppercase" as const, marginBottom: 8 }}>Un projet en tête ?</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "var(--dark)" }}>Discutons de votre <span style={{ color: "var(--accent)", fontStyle: "italic" }}>vision.</span></p>
          </div>
          <div className="cta-buttons">
            <a
              href="mailto:horefyrina@gmail.com"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#F5F1EC", background: "var(--accent)", border: "none", padding: "16px 28px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              Démarrer un projet
            </a>
            <Link
              to="/WhoAmI"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(26,20,16,0.5)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid rgba(26,20,16,0.1)", padding: "16px 28px" }}
            >
              Qui suis-je ?
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}