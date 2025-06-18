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
- `VITE_API_URL` – (opcional) URL base del API cuando el front y el servidor están en dominios distintos.

## Comandos útiles

- `npm run dev`     – Inicia Vite para desarrollo.
- `npm run server`  – Inicia el servidor Express.
- `npm run build`   – Compila la aplicación para producción.
- `npm run lint`    – Ejecuta ESLint.

Los formularios de contacto y suscripción envían datos a `/api/*`.  
Si el servidor se aloja en un dominio distinto, defina `VITE_API_URL` en un archivo `.env` para apuntar a dicho dominio (por ejemplo `https://midominio.com`).
