import mailer from "nodemailer";

const transporter = mailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "june.damore@ethereal.email",
    pass: "9zXuRZeNBMevZBYHh7",
  },
});

export default async function sendMail(adress, subject, text, isHtml = false) {
  let mailObject;
  if (isHtml)
    mailObject = {
      from: "june.damore@ethereal.email",
      to: adress,
      subject,
      html: text,
    };
  else
    mailObject = {
      from: "june.damore@ethereal.email",
      to: adress,
      subject,
      text,
    };

  try {
    const result = await transporter.sendMail(mailObject);
    return result;
  } catch (error) {
    return error;
  }
}
