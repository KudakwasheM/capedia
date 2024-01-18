import nodemailer from "nodemailer";

export default async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: process.env.MAIL_SERVICE,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email not sent");
    throw new Error("Email not sent");
  }
};
