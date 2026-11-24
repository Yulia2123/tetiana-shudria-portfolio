import Image from "next/image";
import css from "./About.module.css";
import SkillsCloud from "./SkillsCloud/SkillsCloud";

const skills = [
  { title: "AI for Design", tone: "lime" },
  { title: "UI Design", tone: "gray" },
  { title: "Wireframing", tone: "gray" },
  { title: "Prototyping", tone: "white" },

  { title: "Website Design", tone: "white" },
  { title: "Visual Hierarchy", tone: "white" },

  { title: "User Flows", tone: "white" },
  { title: "Typography", tone: "lime" },
  { title: "UX Design", tone: "lime" },
  { title: "Color Theory", tone: "gray" },
  { title: "Responsive Design", tone: "white" },
] as const;

export default function About() {
  return (
    <section className={css.about} id="about">
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            src="https://res.cloudinary.com/dprfmsunw/image/upload/f_auto,q_auto/img151_pkyqgd.png"
            alt="Тетяна — UI/UX дизайнерка"
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 655px"
            className={css.photo}
          />
        </div>

        <div className={css.content}>
          <h2 className={css.title}>Про мене</h2>

          <div className={css.description}>
            <p>
              Привіт! Я Тетяна — UI/UX-дизайнерка, якій подобається
              перетворювати складні ідеї на зрозумілі та продумані інтерфейси.
            </p>

            <p>
              У дизайні для мене важливий баланс між естетикою та
              функціональністю. Люблю працювати зі структурою, типографікою,
              кольором і деталями, щоб кожен елемент мав своє місце та
              призначення.
            </p>

            <p>
              Мені близький уважний і послідовний підхід до роботи, відкритість
              до нових ідей та постійне навчання. Вірю, що хороший дизайн
              починається з розуміння людей, для яких він створюється.
            </p>
          </div>

          <h3 className={css.skillsTitle}>МОЇ НАВИЧКИ:</h3>

          <SkillsCloud skills={skills} />
        </div>
      </div>
    </section>
  );
}
