"use client";

import { useState } from "react";
import css from "./Header.module.css";

const nav = [
  { label: "Проєкти ", href: "#projects" },
  { label: "Послуги ", href: "#services" },
  { label: "Про мене ", href: "#about" },
  { label: "Контакти ", href: "#contacts" },
];

export default function Header() {
  const [language, setLanguage] = useState<"UA" | "ENG">("UA");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="/" className={css.logo} aria-label="На головну">
          <span className={css.logoIcon} aria-hidden="true" />
        </a>

        <nav className={`${css.nav} ${menuOpen ? css.navigationOpen : ""}`}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={css.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={css.actions}>
          <div className={css.language}>
            <button
              type="button"
              className={language === "UA" ? css.activeLanguage : ""}
              onClick={() => setLanguage("UA")}
            >
              UA
            </button>
            <span>/</span>
            <button
              type="button"
              className={language === "ENG" ? css.activeLanguage : ""}
              onClick={() => setLanguage("ENG")}
            >
              ENG
            </button>
          </div>

          <a href="#brief" className={css.briefButton}>
            ЗАПОВНИТИ БРИФ
          </a>
        </div>

        <button
          type="button"
          className={css.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={menuOpen}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9H35.9333M5 20.25H35.9333M5 31.7H35.9333"
              stroke="#171A17"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
