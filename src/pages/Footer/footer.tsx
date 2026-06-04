import {MessageCircle, } from "lucide-react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="portfolio-footer-bar">
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: 1.9, color: "rgba(26,20,16,0.4)", letterSpacing: "0.05em" }}>
        Travaillons ensemble
        <a href="mailto:horefyrina@gmail.com" style={{ color: "var(--accent)", textDecoration: "none", display: "block" }}>horefyrina@gmail.com</a>
        +261 38 75 164 80
      </div>
      <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {[
          { name: "Facebook", icon: FaFacebook, url: "https://web.facebook.com/rina.horefy/" },
          { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/rina.horefy/" },
          { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/261387516480" },
          { name: "GitHub", icon: FaGithub, url: "https://github.com/horefy" },
          { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/rina-horefy-4b2b3421a/" },
        ].map(({ name, icon: Icon, url }) => (
          <a
            key={name}
            href={url}
            className="service-social"
            style={{
              color: "rgba(26,20,16,0.3)",
              textDecoration: "none",
              cursor: "none",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon size={18} strokeWidth={1.5} />
          </a>
        ))}
      </nav>
    </footer>
  );
}