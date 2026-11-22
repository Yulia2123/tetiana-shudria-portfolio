import Image from "next/image";
import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.name}>TETIANA SHUDRIA</h1>

          <div className={css.positionBackground} aria-hidden="true" />

          <h2 className={css.position}>UI/UX DESIGNER</h2>

          <p className={css.description}>
            Створюю дизайн сайтів, вебінтерфейсів і мобільних застосунків.
            Поєдную продуману структуру, зручність взаємодії та виразний
            візуальний стиль.
          </p>

          <div className={css.buttons}>
            <Link href="#contacts" className={css.primaryButton}>
              <span>ОБГОВОРИТИ ПРОЄКТ</span>
              <span className={css.arrow} aria-hidden="true">
                →
              </span>
            </Link>

            <Link href="#services" className={css.secondaryButton}>
              <span>ПЕРЕГЛЯНУТИ ПОСЛУГИ</span>
              <span className={css.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className={css.imageBackground} aria-hidden="true" />

        <div className={css.imageWrapper}>
          <Image
            src="/images/hero.png"
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
