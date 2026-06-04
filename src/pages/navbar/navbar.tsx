"use client";

import { useState } from "react";
import { Link } from "react-router";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="navbar-toggle"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="navbar-toggle-icon">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={[
                "navbar-toggle-bar",
                isOpen && i === 0 ? "navbar-toggle-bar--open-top" : "",
                isOpen && i === 2 ? "navbar-toggle-bar--open-bottom" : "",
                isOpen && i === 1 ? "navbar-toggle-bar--hidden" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="navbar-overlay">
          {[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/service" },
            { name: "À propos", path: "/whoami" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="navbar-overlay-link"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
