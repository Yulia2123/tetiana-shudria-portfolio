"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import css from "./Contacts.module.css";

const projectOptions = [
  { value: "website", label: "Лендинг" },
  { value: "web-interface", label: "Багатосторінковий сайт" },
  { value: "mobile-app", label: "Мобільний сайт" },
  { value: "other", label: "Інше" },
];

export default function Contacts() {
  const [projectValue, setProjectValue] = useState("");
  const [projectOpen, setProjectOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
  });

  const isContactInfoFilled =
    formValues.name.trim() !== "" && formValues.phone.trim() !== "";

  type FieldName = "name" | "phone" | "email" | "project" | "message";

  const [errors, setErrors] = useState<Record<FieldName, boolean>>({
    name: false,
    phone: false,
    email: false,
    project: false,
    message: false,
  });

  const validateField = (name: FieldName, value: string) => {
    if (!value.trim()) return true;

    if (name === "email") {
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    return false;
  };

  const handleBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.currentTarget;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as FieldName, value),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const nextErrors: Record<FieldName, boolean> = {
      name: validateField("name", String(data.get("name") ?? "")),
      phone: validateField("phone", String(data.get("phone") ?? "")),
      email: validateField("email", String(data.get("email") ?? "")),
      project: validateField("project", String(data.get("project") ?? "")),
      message: validateField("message", String(data.get("message") ?? "")),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) return;

    // resent
  };
  return (
    <section className={css.contacts} id="contacts">
      <div className={css.container}>
        <div className={css.info}>
          <h2 className={css.title}>
            МАЄТЕ ПРОЄКТ?
            <span>ОБГОВОРИМО!</span>
          </h2>

          <p className={css.description}>
            Розкажіть, який дизайн вам потрібен: сайт, вебінтерфейс чи мобільний
            застосунок. Я ознайомлюся з вашим запитом і відповім, щоб обговорити
            деталі співпраці.
          </p>

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

        <form className={css.form} onSubmit={handleSubmit} noValidate>
          <div className={css.field}>
            <label htmlFor="name">Ім’я*</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Прізвище Ім’я"
              required
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              onBlur={handleBlur}
              aria-invalid={errors.name}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="phone">Номер телефону*</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+380 (50) 12  34 567"
              required
              value={formValues.phone}
              onChange={(e) =>
                setFormValues({ ...formValues, phone: e.target.value })
              }
              onBlur={handleBlur}
              aria-invalid={errors.phone}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className={`${css.field} ${css.projectField}`}>
            <label id="project-label">Тип проєкту</label>

            <input type="hidden" name="project" value={projectValue} />

            <button
              type="button"
              className={css.projectTrigger}
              disabled={!isContactInfoFilled}
              data-selected={Boolean(projectValue)}
              aria-labelledby="project-label"
              aria-expanded={projectOpen}
              aria-invalid={errors.project}
              onClick={() => setProjectOpen((prev) => !prev)}
            >
              <span>
                {projectOptions.find((option) => option.value === projectValue)
                  ?.label || "Оберіть варіант"}
              </span>

              <span className={css.projectArrow} />
            </button>

            {projectOpen && isContactInfoFilled && (
              <ul className={css.projectOptions} role="listbox">
                {projectOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={projectValue === option.value}
                      onClick={() => {
                        setProjectValue(option.value);
                        setProjectOpen(false);
                        setErrors((prev) => ({ ...prev, project: false }));
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`${css.field} ${css.messageField}`}>
            <label htmlFor="message">Повідомлення</label>
            <textarea
              id="message"
              name="message"
              placeholder="Розкажіть про проєкт..."
              rows={3}
              required
            />
          </div>

          <button className={css.submitButton} type="submit">
            НАДІСЛАТИ
          </button>
        </form>
      </div>
    </section>
  );
}
