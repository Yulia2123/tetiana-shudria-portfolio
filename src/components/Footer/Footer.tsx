import css from "./Footer.module.css";

const nav = [
  { label: "Проєкти", href: "#projects" },
  { label: "Послуги", href: "#services" },
  { label: "Про мене", href: "#about" },
  { label: "Контакти", href: "#contacts" },
];

const contacts = [
  { label: "Behance", href: "https://www.behance.net/sudratetana" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shudriatetiana?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  { label: "Telegram", href: "https://t.me/TetyanaShudrya" },
  {
    label: "CV",
    href: "https://drive.google.com/file/d/1DeG_dGf9cE2VC6kzQdsX6a9UTClFZ0Sh/view?usp=drivesdk",
  },
];

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.left}>
          <div className={css.identity}>
            <a href="/" className={css.name}>
              <span>TETIANA SHUDRIA</span>
            </a>
          </div>

          <nav className={css.nav}>
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={css.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
          <p className={css.copyright}>© 2026 Tetiana Shudria</p>
        </div>

        <div className={css.right}>
          <h2 className={css.specialty}>UI/UX DESIGNER</h2>

          <div className={css.contacts}>
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={css.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <span aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12H20M13 19L20 12L13 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
