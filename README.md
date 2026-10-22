# Portafolio

Next.js + Tailwind CSS v4, desplegado con Docker en Dokploy.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Probar la imagen en local

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 -t portafolio .
docker run --rm -p 3000:3000 portafolio
```

Healthcheck: `GET /api/health` → `{"status":"ok"}`.

## Despliegue en Dokploy

1. Crear una **Application** y conectar el repositorio (rama `main`).
2. **Build Type:** `Dockerfile`. Ruta: `./Dockerfile`, contexto `.`.
3. **Build-time arguments** (Environment → Build-time Arguments):
   `NEXT_PUBLIC_SITE_URL=https://tudominio.com`.
   Las `NEXT_PUBLIC_*` quedan grabadas en el JS al hacer el build; cambiarlas obliga a
   redeplegar. Cada nueva `NEXT_PUBLIC_*` hay que declararla también como `ARG`/`ENV` en
   el `Dockerfile`.
4. Variables solo de servidor (si se agregan): en Environment, como variables normales.
5. **Domains:** agregar el dominio, **Container Port `3000`**, HTTPS con Let's Encrypt.
6. Activar auto-deploy (webhook) si se quiere desplegar en cada push.

La imagen corre como usuario sin privilegios, escucha en `0.0.0.0:3000` y usa la salida
`standalone` de Next, así que no incluye `node_modules` completos.
