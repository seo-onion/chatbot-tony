# CosapIA — Guía de implementación

## Estructura del proyecto

```
chatbot-tony/
├── system-prompt.md          # Instrucciones del bot (editar aquí para cambiar comportamiento)
├── IMPLEMENTACION.md         # Este archivo
├── vercel.json               # Config de deployment para Vercel
├── .env.local                # API key local (no commitear)
├── .env.example              # Plantilla de variables de entorno
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── src/
    ├── App.tsx               # Componente raíz con layout responsive
    ├── index.css             # Tailwind + animaciones del typing indicator
    ├── main.tsx              # Entry point de React
    ├── vite-env.d.ts         # Tipos para importar .md como string
    ├── lib/
    │   └── gemini.ts         # Inicializa el cliente de Gemini con el system prompt
    ├── hooks/
    │   └── useChat.ts        # Estado del chat + lógica de llamadas a la API
    └── components/
        ├── Header.tsx        # Encabezado estilo bancario
        ├── ChatWindow.tsx    # Lista de mensajes con auto-scroll
        ├── MessageBubble.tsx # Burbuja individual de mensaje
        ├── TypingIndicator.tsx # Animación de escritura
        └── ChatInput.tsx     # Área de input con envío por Enter
```

---

## Setup local

### Requisitos

- Node.js ≥ 18
- API Key de Gemini ([Google AI Studio](https://aistudio.google.com/app/apikey))

### Instalación

```bash
cd chatbot-tony
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

### Variables de entorno

El archivo `.env.local` ya contiene tu API key. Si necesitas cambiarla:

```
VITE_GEMINI_API_KEY=tu_nueva_api_key
```

> ⚠️ `.env.local` está en `.gitignore` y no se sube al repo.

---

## Cómo funciona

1. Al arrancar, `src/lib/gemini.ts` importa `system-prompt.md` como string y lo pasa como `systemInstruction` al modelo `gemini-2.0-flash`.
2. `useChat.ts` mantiene el historial de mensajes y la sesión de chat (`ChatSession`) en un `useRef` para preservar el contexto entre turnos.
3. El mensaje de bienvenida se muestra localmente sin consumir API; la primera llamada ocurre cuando el usuario escribe.
4. Enter envía el mensaje; Shift+Enter inserta salto de línea.

### Cambiar el comportamiento del bot

Solo edita `system-prompt.md`. No toques el código.

---

## Deploy en Vercel

### Opción A — Desde la CLI

```bash
npm install -g vercel
vercel
```

En el asistente de Vercel:
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### Opción B — Desde GitHub

1. Sube el repositorio a GitHub (sin `.env.local`).
2. Entra a [vercel.com](https://vercel.com) → **New Project** → importa el repo.
3. Vercel detecta Vite automáticamente.
4. En **Environment Variables** agrega:
   ```
   VITE_GEMINI_API_KEY = tu_api_key_aqui
   ```
5. Deploy.

> El `vercel.json` incluido redirige todas las rutas a `index.html` (necesario para SPAs).

---

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build local |
| `npm run typecheck` | Verificación de tipos TypeScript |

---

## Consideración de seguridad

El prefijo `VITE_` expone la variable en el bundle del cliente. Para un entorno de producción con tráfico abierto, considera:

- Crear un backend mínimo (Vercel Edge Function / API Route) que haga las llamadas a Gemini y mantener la API key solo en el servidor.
- Agregar rate limiting para evitar abuso de la key.

Para uso interno o demo esto no es crítico.
