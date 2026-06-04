"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../navbar/navbar";
import Footer from "../Footer/footer";


const EMAILJS_SERVICE_ID = "service_avju8zx";  
const EMAILJS_TEMPLATE_ID = "template_30lv39c";
const EMAILJS_PUBLIC_KEY = "XvT-Uug-5QPahxGgX"; 

export default function Contact() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Détection mobile ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Envoi du formulaire ──
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("Configuration EmailJS manquante. Vérifiez les variables d'environnement.");
      return;
    }

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      setError("Merci de remplir les champs Nom, Email et Message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setError("L'adresse email ne semble pas valide.");
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: trimmed.name,
          from_email: trimmed.email,
          subject: trimmed.subject || "Nouveau message Portfolio",
          message: trimmed.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      setError("L'envoi a échoué. Vérifiez votre connexion ou réessayez plus tard.");
    } finally {
      setIsSending(false);
    }
  };

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

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "var(--accent)" : "rgba(26,20,16,0.12)"}`,
    padding: "14px 0",
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    color: "var(--dark)",
    outline: "none",
    cursor: "text",
    transition: "border-color 0.3s ease",
    letterSpacing: "0.04em",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --accent: #FF3B1E; --dark: #1A1410; --bg: #F5F1EC; }
        html, body { width: 100%; height: 100%; overflow-x: hidden; background: var(--bg); }

        @media (min-width: 768px) {
          html, body { cursor: none; }
        }

        @keyframes fadeIn    { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp   { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideRight{ from { opacity: 0; transform: translateX(-30px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes lineGrow  { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        @keyframes dotPulse  { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.35; transform:scale(0.65) } }
        @keyframes successPop{ from { opacity: 0; transform: scale(0.85) } to { opacity: 1; transform: scale(1) } }

        ::placeholder { color: rgba(26,20,16,0.25); font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.1em; }
        textarea { resize: none; }

        .contact-info-link:hover { color: var(--accent) !important; }
        .social-link:hover       { color: var(--accent) !important; }
        .submit-btn:hover:not(:disabled) { background: #E6351B !important; }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed !important; }

        /* ── Layout responsive ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 80px;
          align-items: start;
        }

        /* Grille nom / email : 2 colonnes desktop, 1 colonne mobile */
        .form-name-email-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        /* Footer du formulaire : space-between desktop, colonne mobile */
        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* Dot grid : caché en mobile pour ne pas gêner */
        .dot-grid {
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(6, 10px);
          gap: 8px;
          opacity: 0.55;
          animation: fadeIn 1.2s ease 0.3s both;
        }

        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .form-name-email-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .form-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .submit-btn-wrap {
            width: 100%;
          }

          .submit-btn {
            width: 100%;
            justify-content: center;
          }

          .dot-grid {
            display: none;
          }

          .contact-main {
            padding: 100px 5% 60px !important;
          }

          .contact-header {
            margin-bottom: 40px !important;
          }

          .contact-success {
            padding: 40px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .contact-main {
            padding: 88px 4% 48px !important;
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

      <canvas ref={bgCanvasRef} className="portfolio-canvas-bg" />

      {/* Dot grid */}
      <div className="dot-grid">
        {dots.map((_, i) => (
          <span key={i} style={{ width: 4, height: 4, background: "var(--accent)", borderRadius: "50%", display: "block", animation: `dotPulse 3s ease-in-out ${i % 2 === 0 ? "0s" : "0.5s"} infinite` }} />
        ))}
      </div>

      <Navbar />

      <main className="contact-main portfolio-page-main">

        {/* Header */}
        <section className="contact-header portfolio-section-header portfolio-section-header--contact">
          <p className="portfolio-eyebrow">Parlons-en</p>
          <h1 className="portfolio-heading-display">
            Un projet ?
          </h1>
          <div className="portfolio-accent-divider portfolio-accent-divider--flush" />
        </section>

        <div
          className="contact-grid"
          style={{ opacity: 0, animation: "slideUp 0.9s ease 0.9s forwards" }}
        >

          {/* Colonne gauche — coordonnées */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 48 }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 20 }}>Coordonnées</p>
              {[
                { label: "Email", value: "horefyrina@gmail.com", href: "mailto:horefyrina@gmail.com" },
                { label: "Téléphone", value: "+261 38 75 164 80", href: "tel:+261387516480" },
                { label: "Localisation", value: "Fianarantsoa, Madagascar", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ marginBottom: 24, borderBottom: "1px solid rgba(26,20,16,0.06)", paddingBottom: 20 }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(26,20,16,0.3)", textTransform: "uppercase" as const, marginBottom: 6 }}>{label}</p>
                  {href ? (
                    <a href={href} className="contact-info-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(26,20,16,0.6)", textDecoration: "none", transition: "color 0.3s ease", cursor: "pointer" }}>{value}</a>
                  ) : (
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "rgba(26,20,16,0.6)" }}>{value}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 20 }}>Réseaux</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                {[
                  { name: "LinkedIn", url: "#" },
                  { name: "GitHub", url: "#" },
                  { name: "Instagram", url: "#" },
                ].map(({ name, url }) => (
                  <a key={name} href={url} className="contact-info-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(26,20,16,0.4)", textDecoration: "none", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "color 0.3s ease" }}>
                    <span style={{ width: 20, height: 1, background: "rgba(255,59,30,0.4)", display: "inline-block" }} />
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ padding: "20px 24px", border: "1px solid rgba(255,59,30,0.2)", background: "rgba(255,59,30,0.03)", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "var(--accent)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4cff72", display: "inline-block", boxShadow: "0 0 8px rgba(76,255,114,0.4)" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(26,20,16,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" as const }}>Disponible</span>
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(26,20,16,0.55)", lineHeight: 1.8 }}>Ouvert à de nouveaux projets freelance dès maintenant.</p>
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div>
            {sent ? (
              <div className="contact-success" style={{ padding: "64px 48px", border: "1px solid rgba(255,59,30,0.2)", textAlign: "center" as const, animation: "successPop 0.5s cubic-bezier(0.22,1,0.36,1) both" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, color: "var(--accent)", marginBottom: 20 }}>✓</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "var(--dark)", marginBottom: 12 }}>Message envoyé !</h2>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(26,20,16,0.5)", lineHeight: 1.9 }}>Merci. Je vous répondrai sous 24–48h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column" as const, gap: 36 }}>

                <div className="form-name-email-grid">
                  {[
                    { name: "name", label: "Votre nom", placeholder: "Rina Horefy", type: "text" },
                    { name: "email", label: "Adresse email", placeholder: "rina@exemple.com", type: "email" },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: focused === name ? "var(--accent)" : "rgba(26,20,16,0.3)", display: "block", marginBottom: 10, transition: "color 0.3s ease" }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[name as keyof typeof form]}
                        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                        onFocus={() => setFocused(name)}
                        onBlur={() => setFocused(null)}
                        style={inputStyle(name)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: focused === "subject" ? "var(--accent)" : "rgba(26,20,16,0.3)", display: "block", marginBottom: 10, transition: "color 0.3s ease" }}>Sujet</label>
                  <input
                    type="text"
                    placeholder="Projet de site web, collaboration..."
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("subject")}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: focused === "message" ? "var(--accent)" : "rgba(26,20,16,0.3)", display: "block", marginBottom: 10, transition: "color 0.3s ease" }}>Message</label>
                  <textarea
                    rows={6}
                    placeholder="Décrivez votre projet, vos objectifs, votre budget estimé..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), display: "block" }}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.04em", borderLeft: "2px solid var(--accent)", paddingLeft: 12 }}>
                    {error}
                  </p>
                )}

                <div className="form-footer">
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(26,20,16,0.3)", letterSpacing: "0.08em" }}>Réponse sous 24–48h</p>
                  <div className="submit-btn-wrap">
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={isSending}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase" as const,
                        color: "#F5F1EC",
                        background: isSending ? "rgba(26,20,16,0.35)" : "var(--accent)",
                        border: "none",
                        padding: "18px 36px",
                        cursor: isSending ? "not-allowed" : "pointer",
                        transition: "background 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {isSending ? "Envoi en cours…" : "Envoyer"}
                      {!isSending && (
                        <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}