"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import css from "./Services.module.css";

const services = [
  {
    title: "Дизайн лендингу",
    description:
      "Для презентації одного продукту, послуги або спеціальної пропозиції на одній сторінці.",
    image:
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto/q_auto/Frame_48096010_izndcy.png",
    imageAlt: "Дизайн лендингу",
  },
  {
    title: "Дизайн онлайн-сервісів",
    description:
      "Для платформ, де користувачі реєструються, керують своїми даними, замовленнями та іншими функціями.",
    image:
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto/q_auto/Service_Image_hwjdul.png",
    imageAlt: "Дизайн онлайн-сервісу",
  },
  {
    title: "Редизайн сайту",
    description:
      "Для оновлення застарілого дизайну, покращення структури та зручності наявного сайту.",
    image:
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto/q_auto/Service_Image_1_rmdxpg.png",
    imageAlt: "Редизайн сайту",
  },
  {
    title: "Дизайн мобільного застосунку",
    description: "Для цифрових продуктів, якими користуються зі смартфона.",
    image:
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto/q_auto/Service_Image_2_iuni4o.png",
    imageAlt: "Дизайн мобільного застосунку",
  },
] as const;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeService = services[activeIndex];

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 390px)");

    let observer: IntersectionObserver | null = null;

    const observeServices = () => {
      observer?.disconnect();

      if (!mobileQuery.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = Number(entry.target.getAttribute("data-index"));

            setRevealedCount((current) => Math.max(current, index + 1));
          });
        },
        {
          rootMargin: "-15% 0px -25% 0px",
          threshold: 0,
        }
      );

      itemRefs.current.forEach((item) => {
        if (item) observer?.observe(item);
      });
    };

    observeServices();
    mobileQuery.addEventListener("change", observeServices);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener("change", observeServices);
    };
  }, []);

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);

    if (window.matchMedia("(max-width: 390px)").matches) {
      setRevealedCount((current) => Math.max(current, index + 1));
    }
  };

  return (
    <section className={css.services} id="services">
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.intro}>
            <h2 className={css.title}>Мої послуги</h2>

            <p className={css.description}>
              Допомагаю втілювати цифрові проєкти в продуманий дизайн — від
              структури та логіки до готового інтерфейсу
            </p>
          </div>

          <div className={css.serviceList}>
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              const isRevealed = index < revealedCount;
              const isMobile = window.matchMedia("(max-width: 390px)").matches;

              return (
                <div className={css.serviceCard} key={service.title}>
                  <button
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    data-index={index}
                    type="button"
                    className={`${css.serviceItem} ${
                      isActive ? css.serviceItemActive : ""
                    } ${isRevealed ? css.serviceItemRevealed : ""}`}
                    onClick={() => handleServiceClick(index)}
                    aria-pressed={isActive}
                  >
                    <span className={css.indicator} aria-hidden="true" />

                    <span className={css.serviceText}>
                      <span className={css.serviceTitle}>{service.title}</span>

                      <span className={css.serviceDescription}>
                        {service.description}
                      </span>
                    </span>
                  </button>

                  {isRevealed && (
                    <div className={css.mobileImageWrapper}>
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 390px) 350px, 0px"
                        className={css.serviceImage}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={css.imageWrapper}>
          <Image
            key={activeService.image}
            src={activeService.image}
            alt={activeService.imageAlt}
            fill
            sizes="(max-width: 1100px) 100vw, 655px"
            className={css.serviceImage}
            priority={activeIndex === 0}
          />
        </div>

        <a href="#contacts" className={css.contactButton}>
          <span>ОБГОВОРИТИ ПРОЄКТ</span>

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
        </a>
      </div>
    </section>
  );
}
