import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path'; // Import path for serving static files
import { fileURLToPath } from 'url'; // Import for ES Modules __dirname equivalent

const app = express();
app.use(cors());
app.use(express.json());

// For ES Modules, we need to manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory (your frontend build)
// This is typically for production deployments where the backend serves the compiled frontend.
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
    secure: false, // Use 'true' if your SMTP server uses SSL/TLS on port 465 (e.g., port 465 for SSL)
    auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
  });
}

app.post('/api/contact', async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;
  try {
    // Send email to the designated recipient (EMAIL_TO)
    await transporter.sendMail({
      from: email, // The sender's email from the form
      to: EMAIL_TO,
      subject: `Contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: <span class="math-inline">\{telefono\}\\n\\n</span>{mensaje}`,
    });

    // Send a confirmation email to the sender if an email address was provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // Your sending email account from .env
        to: email,
        subject: 'Hemos recibido tu mensaje',
        text: 'Gracias por contactarnos. En breve te responderemos.',
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending contact email:', err);
    // Provide a more descriptive error message for the client
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje de contacto.' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    // Send subscription notification to the designated recipient (EMAIL_TO)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'Nuevo suscriptor',
      text: `Nuevo correo suscrito: ${email}`,
    });

    // Send a welcome email to the subscriber if an email address was provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // Your sending email account from .env
        to: email,
        subject: 'Bienvenido a Patria Nueva',
        text: 'Gracias por suscribirte a nuestro boletín.',
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending subscription email:', err);
    // Provide a more descriptive error message for the client
    res.status(500).json({ success: false, message: 'Error al procesar la suscripción.' });
  }
});
