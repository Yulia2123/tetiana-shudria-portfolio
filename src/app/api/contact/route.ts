import nodemailer from "nodemailer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedProjects = ["website", "web-interface", "mobile-app", "other"];

const projectLabels: Record<string, string> = {
  website: "Лендинг",
  "web-interface": "Багатосторінковий сайт",
  "mobile-app": "Мобільний сайт",
  other: "Інше",
};

export async function POST(request: Request) {
  try {
    const body: Record<string, unknown> = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    const email = typeof body.email === "string" ? body.email.trim() : "";

    const project = typeof body.project === "string" ? body.project : "";

    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !phone) {
      return Response.json(
        { error: "Вкажіть ім'я та номер телефону." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      phone.length > 40 ||
      email.length > 254 ||
      message.length > 5000 ||
      (email && !emailRegex.test(email)) ||
      (project && !allowedProjects.includes(project))
    ) {
      return Response.json(
        { error: "Перевірте правильність введених даних." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_APP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpUser || !smtpPassword || !contactEmail) {
      console.error("SMTP environment variables are missing");

      return Response.json(
        { error: "Поштовий сервіс не налаштований." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPassword.replace(/\s/g, ""),
      },
    });

    await transporter.sendMail({
      from: {
        name: "Portfolio",
        address: smtpUser,
      },

      to: contactEmail,

      replyTo: email || undefined,

      subject: "Нова заявка з портфоліо",

      text: `
Нова заявка з сайту портфоліо.

Ім'я: ${name}

Номер телефону: ${phone}

Email: ${email || "Не вказано"}

Тип проєкту: ${project ? projectLabels[project] : "Не вказано"}

Повідомлення:
${message || "Не вказано"}
      `,
    });

    return Response.json({
      success: true,
      message: "Заявку успішно надіслано!",
    });
  } catch (error) {
    console.error("[CONTACT API ERROR]", error);

    return Response.json(
      {
        error: "Не вдалося надіслати заявку. Спробуйте ще раз.",
      },
      { status: 500 }
    );
  }
}
