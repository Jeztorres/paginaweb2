import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'dist')));

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO = 'l21200651@pachuca.tecnm.mx',
} = process.env;

let transporter;

// If an SMTP server is not defined, Gmail is assumed by default
if (!EMAIL_HOST && EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
} else {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST || 'smtp.gmail.com', // Fallback to Gmail SMTP if EMAIL_HOST is not provided
    port: EMAIL_PORT ? Number(EMAIL_PORT) : 587,
    secure: false, // Use 'true' if your SMTP server uses SSL/TLS on port 465
    auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
  });
}

app.post('/api/contact', async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;
  try {
    // Send email to the recipient (EMAIL_TO)
    await transporter.sendMail({
      from: email,
      to: EMAIL_TO,
      subject: `Contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\n\n${mensaje}`,
    });

    // Send confirmation email to the sender if an email is provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // The email user defined in your .env
        to: email,
        subject: 'Hemos recibido tu mensaje',
        text: 'Gracias por contactarnos. En breve te responderemos.',
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending contact email:', err);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje de contacto.' });
  }
});

// Servir la aplicación frontend en producción
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    // Send subscription notification to the recipient (EMAIL_TO)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'Nuevo suscriptor',
      text: `Nuevo correo suscrito: ${email}`,
    });

    // Send welcome email to the subscriber if an email is provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // The email user defined in your .env
        to: email,
        subject: 'Bienvenido a Patria Nueva',
        text: 'Gracias por suscribirte a nuestro boletín.',
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending subscription email:', err);
    res.status(500).json({ success: false, message: 'Error al procesar la suscripción.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});