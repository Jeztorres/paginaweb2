import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path'; // Needed for resolving file paths
import { fileURLToPath } from 'url'; // Needed for __dirname equivalent in ES Modules

const app = express();
app.use(cors());
app.use(express.json());

// In ES Modules, __dirname is not natively available, so we define it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory.
// This is typical for production environments where your backend also hosts the compiled frontend.
app.use(express.static(path.join(__dirname, 'dist')));

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO = 'l21200651@pachuca.tecnm.mx', // Default recipient email address
} = process.env;

let transporter;

// If EMAIL_HOST isn't specified, we'll default to Gmail's SMTP settings.
if (!EMAIL_HOST && EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' as a special service value
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
} else {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST || 'smtp.gmail.com', // Fallback to Gmail's SMTP if no host is explicitly provided
    port: EMAIL_PORT ? Number(EMAIL_PORT) : 587, // Default to port 587 (for STARTTLS) if not specified
    secure: false, // Set to 'true' if using port 465 (SSL/TLS), 'false' for 587 (STARTTLS)
    auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined, // Only use auth if credentials exist
  });
}

app.post('/api/contact', async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;
  try {
    // Send the contact email to the configured recipient (EMAIL_TO)
    await transporter.sendMail({
      from: email, // The sender's email from the contact form
      to: EMAIL_TO,
      subject: `Contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\n\n${mensaje}`, // Fixed: Removed erroneous HTML/LaTeX tags
    });

    // Send a confirmation email back to the sender if their email was provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // Your application's sending email address
        to: email,
        subject: 'Hemos recibido tu mensaje',
        text: 'Gracias por contactarnos. En breve te responderemos.',
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending contact email:', err);
    // Provide a more user-friendly error message to the client
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje de contacto.' });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    // Send a new subscriber notification to the configured recipient (EMAIL_TO)
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'Nuevo suscriptor',
      text: `Nuevo correo suscrito: ${email}`,
    });

    // Send a welcome email to the new subscriber if their email was provided
    if (email) {
      await transporter.sendMail({
        from: EMAIL_USER, // Your application's sending email address
        to: email,
        subject: 'Bienvenido a Patria Nueva',
        text: 'Gracias por suscribirte a nuestro boletín.',
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending subscription email:', err);
    // Provide a more user-friendly error message to the client
    res.status(500).json({ success: false, message: 'Error al procesar la suscripción.' });
  }
});

// This wildcard route serves your frontend's index.html for any requests
// that don't match the API endpoints. This is key for single-page applications (SPAs).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
