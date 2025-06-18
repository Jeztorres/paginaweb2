import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO = 'l21200651@pachuca.tecnm.mx',
} = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT ? Number(EMAIL_PORT) : 587,
  secure: false,
  auth: EMAIL_USER && EMAIL_PASS ? { user: EMAIL_USER, pass: EMAIL_PASS } : undefined,
});

app.post('/api/contact', async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;
  try {
    await transporter.sendMail({
      from: email,
      to: EMAIL_TO,
      subject: `Contacto: ${asunto}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\n\n${mensaje}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending contact email:', err);
    res.status(500).json({ success: false });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'Nuevo suscriptor',
      text: `Nuevo correo suscrito: ${email}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error sending subscription email:', err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
