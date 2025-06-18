
- `VITE_API_URL` – (opcional) URL base del API cuando el front y el servidor están en dominios distintos. Durante el desarrollo no es necesario gracias al proxy de Vite.
Copie el archivo `.env.example` como `.env` y ajuste los valores según su proveedor de correo. Luego instale las dependencias con `npm install`.
Ejecute `npm run dev` y, en otra terminal, `npm run server` para desarrollar con el API local. El proxy en `vite.config.ts` redirige las llamadas a `/api` al puerto 3001.

