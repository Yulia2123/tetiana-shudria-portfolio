"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import css from "./Contacts.module.css";
import toast from "react-hot-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (name === "name" || name === "phone") {
      return !value.trim();
    }

    if (name === "email" && value.trim()) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    const nextErrors: Record<FieldName, boolean> = {
      name: validateField("name", String(data.get("name") ?? "")),
      phone: validateField("phone", String(data.get("phone") ?? "")),
      email: validateField("email", String(data.get("email") ?? "")),
      project: false,
      message: false,
    };

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          project: data.get("project"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Не вдалося надіслати заявку.");
      }

      toast.success("Заявку успішно надіслано!");

      formElement.reset();

      setFormValues({
        name: "",
        phone: "",
      });

      setProjectValue("");
      setProjectOpen(false);

      setErrors({
        name: false,
        phone: false,
        email: false,
        project: false,
        message: false,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Сталася помилка. Спробуйте ще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
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
              onBlur={handleBlur}
              aria-invalid={errors.email}
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
            />
          </div>

          <button
            className={css.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            НАДІСЛАТИ
          </button>
        </form>
      </div>
    </section>
  );
}
