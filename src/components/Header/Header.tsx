"use client";

import { useState } from "react";
import css from "./Header.module.css";

const nav = [
  { label: "Проєкти", href: "#projects" },
  { label: "Послуги", href: "#services" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contacts" },
];

export default function Header() {
  const [language, setLanguage] = useState<"UA" | "ENG">("UA");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={css.header}>
      <div
        className={`${css.container} ${menuOpen ? css.containerMenuOpen : ""}`}
      >
        <a href="/" className={css.logo} aria-label="На головну">
          <span className={css.logoIcon} aria-hidden="true" />
        </a>

        <nav className={css.nav}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={css.navLink}>
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
            <span className={css.languageDivider}>/</span>
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
          {menuOpen ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 1.5L23.5 21.5M1.5 21.5L23.5 1.5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#171A17"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
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
          )}
        </button>
      </div>

      {menuOpen && (
        <div className={css.mobileMenu}>
          <nav className={css.mobileNav}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={css.mobileNavLink}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={css.mobileButtons}>
            <a href="#brief" className={css.mobileButton} onClick={closeMenu}>
              <span>ОБГОВОРИТИ ПРОЄКТ</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 10H17M11 4L17 10L11 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#contacts"
              className={`${css.mobileButton} ${css.mobileButtonSecondary}`}
              onClick={closeMenu}
            >
              <span>ЗАПОВНИТИ БРИФ</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3 10H17M11 4L17 10L11 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className={css.socials}>
            <a
              href="https://t.me/TetyanaShudrya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <img src="/icons/contacts/telegram.svg" alt="" />
            </a>

            <a
              href="https://www.behance.net/sudratetana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
            >
              <img src="/icons/contacts/behance.svg" alt="" />
            </a>

            <a
              href="https://www.linkedin.com/in/shudriatetiana?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/icons/contacts/linkedin.svg" alt="" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
