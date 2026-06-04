import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/footer";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --accent: #FF3B1E;
          --dark: #1A1410;
          --bg: #F5F1EC;
          --surface: #EDE9E2;
        }
        html, body { width: 100%; height: 100%; overflow-x: hidden; background: var(--bg); cursor: none; }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes lineGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes dotPulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.35; transform:scale(0.65) } }
        @keyframes scrollAnim {
          0% { transform: scaleY(0); transform-origin: top }
          50% { transform: scaleY(1); transform-origin: top }
          51% { transform: scaleY(1); transform-origin: bottom }
          100% { transform: scaleY(0); transform-origin: bottom }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(-50%) scale(0.7) rotate(20deg) }
          to   { opacity: 1; transform: translateY(-50%) scale(1) rotate(0deg) }
        }

        .home-nav-link { transition: color 0.3s ease; }
        .home-nav-link:hover { color: var(--accent) !important; }
        .home-social:hover { color: var(--accent) !important; }
        .home-cta-secondary:hover { color: var(--accent) !important; }
      `}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="portfolio-cursor-dot portfolio-cursor-dot--multiply" />
      <div ref={cursorRingRef} className="portfolio-cursor-ring" />

      {/* Top accent line */}
      <div className="portfolio-accent-line" />

      {/* Background canvas */}
      <canvas ref={bgCanvasRef} className="portfolio-canvas-bg" />

      {/* Noise overlay */}
      <div className="portfolio-noise-overlay" />

      {/* Dot grid */}
      <div className="portfolio-dot-grid">
        {dots.map((_, i) => (
          <span key={i} style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", display: "block", animation: `dotPulse 3s ease-in-out ${i % 2 === 0 ? "0s" : "0.5s"} infinite` }} />
        ))}
      </div>

      {/* Navbar */}
     <Navbar />

      <main className="portfolio-home-main">
        <p className="portfolio-home-eyebrow">
          Disponible pour des projets
        </p>

        <h1 className="portfolio-heading-display portfolio-heading-display--home portfolio-heading-display--home-hero">
          Je suis{" "}<br />
          <span style={{ color: "var(--accent)", fontStyle: "normal", display: "inline-block" }}>Rina Horefy</span>
        </h1>

        <p className="portfolio-home-lead">
          Etudiant en Génie Logiciel  &amp; Système de gestion de Base de données<br />
          basé à L'ENI Fianarantsoa, Madagascar.
        </p>

        <div className="portfolio-home-cta-row">
          <Link to="/WhoAmI" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#F5F1EC", background: "var(--accent)", border: "none", padding: "18px 36px", cursor: "none", textDecoration: "none" }}>
            Qui suis-je ?
          </Link>
          {/* <a href="/" className="home-cta-secondary" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(26,20,16,0.45)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, cursor: "none", transition: "color 0.3s ease" }}>
            Voir mes projets
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a> */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}