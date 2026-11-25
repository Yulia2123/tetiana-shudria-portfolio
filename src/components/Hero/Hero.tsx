import Image from "next/image";
import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.name}>TETIANA SHUDRIA</h1>

          <div className={css.positionWrapper}>
            <div className={css.positionBackground} aria-hidden="true" />
            <h2 className={css.position}>UI/UX DESIGNER</h2>
          </div>

          <p className={css.description}>
            Створюю дизайн сайтів, вебінтерфейсів і мобільних застосунків.
            Поєдную продуману структуру, зручність взаємодії та виразний
            візуальний стиль.
          </p>

          <div className={css.buttons}>
            <Link href="#contacts" className={css.primaryButton}>
              <span>ОБГОВОРИТИ ПРОЄКТ</span>
              <span className={css.arrow} aria-hidden="true">
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
            </Link>

            <Link href="#services" className={css.secondaryButton}>
              <span>ПЕРЕГЛЯНУТИ ПОСЛУГИ</span>
              <span className={css.arrow} aria-hidden="true">
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
            </Link>
          </div>
        </div>

        <div className={css.imageBackground} aria-hidden="true" />

        <div className={css.imageWrapper}>
          <Image
            src="https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/hero_sk5jbk.png"
            alt="Tetiana Shudria"
            width={385}
            height={505}
            className={css.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
