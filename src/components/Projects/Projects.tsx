"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import css from "./Projects.module.css";

const projects = [
  {
    slug: "vona",
    title: "VONA",
    images: [
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/Project_Cover_pudpn8.png",
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/Rectangle_3_m21v5g.png",
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/Rectangle_4_w2a9ss.png",
      "https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/Rectangle_5_cwvezg.png",
    ],
    description:
      "Дизайн сайту для косметолога з акцентом на естетику, довіру та індивідуальний підхід.",
    tags: ["Website Design", "Landing Page", "Client Project"],
    caseUrl: "/projects/vona",
  },
  {
    slug: "velika-krucha",
    title: "Готель «Велика Круча»",
    images: [
      "/images/projects/velika-krucha.jpg",
      "/images/projects/velika-krucha-2.jpg",
      "/images/projects/velika-krucha-3.jpg",
    ],
    description:
      "Оновлення сайту для створення сучасного та зручного інтерфейсу, що підкреслює унікальність комплексу, його історичну й культурну цінність та відкриває нові можливості для взаємодії з аудиторією.",
    tags: ["Website Design", "Landing Page", "Redesign", "Study case"],
    caseUrl: "/projects/velika-krucha",
  },
  {
    slug: "pyriatyn",
    title: "Готель «Пирятин»",
    images: [
      "/images/projects/pyriatyn.jpg",
      "/images/projects/pyriatyn-2.jpg",
      "/images/projects/pyriatyn-3.jpg",
    ],
    description:
      "Редизайн сайту готелю «Пирятин» — проєкт зі створення сучасного та зручного вебінтерфейсу, який поєднує елегантну естетику, атмосферу затишку та просту навігацію.",
    tags: ["Website Design", "Landing Page", "Redesign", "Study case"],
    caseUrl: "/projects/pyriatyn",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [outgoingImage, setOutgoingImage] = useState<string | null>(null);
  const [imageDirection, setImageDirection] = useState<"next" | "prev">("next");

  const activeProject = projects[activeIndex];

  const activeImage = activeProject.images[activeImageIndex];

  const changeImage = (direction: "next" | "prev") => {
    if (outgoingImage) return;

    setOutgoingImage(activeImage);
    setImageDirection(direction);

    setActiveImageIndex((prev) =>
      direction === "next"
        ? (prev + 1) % activeProject.images.length
        : (prev - 1 + activeProject.images.length) % activeProject.images.length
    );
  };

  const nextImage = () => changeImage("next");
  const previousImage = () => changeImage("prev");

  const selectProject = (index: number) => {
    setActiveIndex(index);
    setActiveImageIndex(0);
    setOutgoingImage(null);
  };

  const previewListRef = useRef<HTMLDivElement>(null);

  const scrollPreviews = (direction: -1 | 1) => {
    previewListRef.current?.scrollBy({
      left: direction * 366,
      behavior: "smooth",
    });
  };

  const nextProject = () => {
    selectProject((activeIndex + 1) % projects.length);
  };

  const previousProject = () => {
    selectProject((activeIndex - 1 + projects.length) % projects.length);
  };

  const previewProjects = Array.from(
    { length: projects.length - 1 },
    (_, index) => projects[(activeIndex + index + 1) % projects.length]
  );

  return (
    <section className={css.projects} id="projects">
      <div className={css.container}>
        <div className={css.intro}>
          <h2 className={css.title}>Вибрані проєкти</h2>

          <p className={css.description}>
            Кожен проєкт — це окрема ідея, пошук рішень і робота над
            користувацьким досвідом. У цій добірці — сайти та цифрові
            інтерфейси, створені з увагою до деталей, зручності й візуальної
            цілісності.
          </p>
        </div>

        <div className={css.navigation}>
          <button
            type="button"
            className={css.navButton}
            onClick={previousProject}
            aria-label="Попередній проєкт"
          >
            ←
          </button>

          <button
            type="button"
            className={css.navButton}
            onClick={nextProject}
            aria-label="Наступний проєкт"
          >
            →
          </button>
        </div>

        <div className={css.gallery}>
          <div className={css.featured}>
            <div className={css.mainImage}>
              {outgoingImage && (
                <div
                  className={`${css.imageLayer} ${
                    imageDirection === "next"
                      ? css.imageExitNext
                      : css.imageExitPrev
                  }`}
                  onAnimationEnd={() => setOutgoingImage(null)}
                >
                  <Image
                    src={outgoingImage}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 66vw"
                    className={css.image}
                  />
                </div>
              )}

              <div
                key={`${activeProject.slug}-${activeImageIndex}`}
                className={`${css.imageLayer} ${
                  imageDirection === "next"
                    ? css.imageEnterNext
                    : css.imageEnterPrev
                }`}
              >
                <Image
                  src={activeImage}
                  alt={`${activeProject.title} — зображення ${
                    activeImageIndex + 1
                  }`}
                  fill
                  sizes="(max-width: 900px) 100vw, 66vw"
                  className={css.image}
                />
              </div>

              <button
                type="button"
                className={`${css.imageNavButton} ${css.imagePrev}`}
                onClick={previousImage}
                aria-label="Попереднє зображення"
              >
                <svg
                  width="14"
                  height="38"
                  viewBox="0 0 14 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 0.750122L12.75 19.5001L0.75 36.7501"
                    stroke="#171A17"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className={`${css.imageNavButton} ${css.imageNext}`}
                onClick={nextImage}
                aria-label="Наступне зображення"
              >
                <svg
                  width="14"
                  height="38"
                  viewBox="0 0 14 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 0.750122L12.75 19.5001L0.75 36.7501"
                    stroke="#171A17"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className={css.projectInfo}>
              <div className={css.projectText}>
                <h3 className={css.projectTitle}>{activeProject.title}</h3>

                <p className={css.projectDescription}>
                  {activeProject.description}
                </p>

                <div className={css.tags}>
                  {activeProject.tags.map((tag) => (
                    <span className={css.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a href={activeProject.caseUrl} className={css.caseButton}>
                <span>ПЕРЕГЛЯНУТИ КЕЙС</span>
                <span className={css.caseArrow} aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className={css.previewRail}>
            <div className={css.previewList} ref={previewListRef}>
              {previewProjects.map((project) => {
                const index = projects.findIndex(
                  (item) => item.slug === project.slug
                );

                return (
                  <button
                    type="button"
                    className={css.preview}
                    key={project.slug}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Відкрити проєкт ${project.title}`}
                  >
                    <div className={css.previewImage}>
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        sizes="350px"
                        className={css.image}
                      />
                    </div>

                    <div className={css.previewInfo}>
                      <span className={css.previewTitle}>{project.title}</span>

                      <span className={css.previewCategory}>
                        Website Design
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
