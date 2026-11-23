import css from "./HowIWork.module.css";

const steps = [
  {
    number: "01",
    title: "Бриф і цілі",
    description:
      "З’ясовую задачу, аудиторію та головну дію, яку має зробити відвідувач.",
  },
  {
    number: "02",
    title: "Структура й логіка",
    description:
      "Продумую структуру сторінок, послідовність блоків та зручну навігацію.",
  },
  {
    number: "03",
    title: "Візуальна концепція",
    description:
      "Підбираю кольори, типографіку та візуальні рішення відповідно до вашого бренду.",
  },
  {
    number: "04",
    title: "Готові макети",
    description:
      "Опрацьовую деталі, адаптивні версії та готую макети до передачі в розробку.",
  },
];

export default function HowIWork() {
  return (
    <section className={css.howIWork} id="how-i-work">
      <div className={css.container}>
        <div className={css.intro}>
          <h2 className={css.title}>Як я працюю</h2>

          <p className={css.description}>
            Чотири кроки від першої розмови до готових макетів. Ви завжди
            бачите, на якому етапі проєкт.
          </p>
        </div>

        <div className={css.steps}>
          {steps.map((step) => (
            <article className={css.step} key={step.number}>
              <span className={css.number}>{step.number}</span>

              <h3 className={css.stepTitle}>{step.title}</h3>

              <p className={css.stepDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
