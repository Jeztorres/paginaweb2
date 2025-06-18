# Patria Nueva Website

Este proyecto es un sitio web construido con Vite y React. Ahora incluye un pequeño servidor de Express para manejar el formulario de contacto y la suscripción por correo.

## Configuración del servidor de correo

El servidor utiliza `nodemailer` para enviar correos. Configure las siguientes variables de entorno antes de iniciar el servidor:

- `EMAIL_HOST` – Servidor SMTP (por ejemplo `smtp.gmail.com`).
- `EMAIL_PORT` – Puerto SMTP (por defecto 587).
- `EMAIL_USER` – Usuario de la cuenta remitente.
- `EMAIL_PASS` – Contraseña o token de la cuenta remitente.
- `EMAIL_TO`   – Dirección que recibirá los mensajes (por defecto `l21200651@pachuca.tecnm.mx`).
- `PORT`       – Puerto en el que se ejecutará el servidor (opcional, por defecto 3001).

## Comandos útiles

- `npm run dev`     – Inicia Vite para desarrollo.
- `npm run server`  – Inicia el servidor Express.
- `npm run build`   – Compila la aplicación para producción.
- `npm run lint`    – Ejecuta ESLint.

Una vez iniciado el servidor (por defecto en `http://localhost:3001`), los formularios de contacto y de suscripción enviarán la información a este endpoint y se reenviará un correo a la dirección configurada.
