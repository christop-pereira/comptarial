import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { name, email, message } = req.body;

  // Configure le transporteur SMTP Infomaniak
  const transporter = nodemailer.createTransport({
    host: 'mail.infomaniak.com',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: MAIL_DESTINATION,
      subject: `Nouveau message de ${name}`,
      text: message,
      replyTo: email,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
