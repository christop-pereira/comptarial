import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Récupération des variables d'environnement
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const MAIL_DESTINATION = process.env.MAIL_DESTINATION;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing fields' }),
      { status: 400 }
    );
  }

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
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
