# Solar Fire — Landing

Landing en [Astro](https://astro.build) + Tailwind, con un panel de administración
tipo WordPress ([Keystatic](https://keystatic.com)) para editar textos, imágenes,
productos y videos sin tocar código.

## Editar el contenido

Abre **`/keystatic`** (en local: http://localhost:4321/keystatic).

| En el panel | Qué controla |
| --- | --- |
| Ajustes generales | SEO, logo, WhatsApp, teléfonos, correo, dirección, Instagram, mensajes de cotización |
| Menú superior / Pie de página | Enlaces y textos de navegación |
| Portada (Hero) | Título, descripción, botones, datos destacados, imagen principal |
| Sección Catálogo | Encabezado del catálogo y nota legal de las fichas |
| Sección Aromas | Producto destacado, aromas (nombre, color, foto, nota) |
| Sección Videos | Videos, portadas, beneficios y mensajes de WhatsApp |
| Sección Nosotros | Texto, sello INVIMA, pilares (con ícono) y banner |
| Sección Contacto | Textos del formulario y opciones extra |
| Productos | Crear / editar / borrar productos, fotos, categorías, orden |

Tip: en los textos marcados así, `**texto**` se muestra en **negrita**.

### ¿Dónde se guarda?

- Textos: `src/content/paginas/*.yaml` y `src/content/productos/*.yaml`
- Imágenes: `src/assets/paginas/…` y `src/assets/productos/<producto>/…` (Astro las optimiza)
- Videos y sus portadas: `public/videos/`

Todo queda en Git, así que cualquier cambio se puede revisar o deshacer.

## Cómo funciona en cada entorno

- **Local (`npm run dev`)**: el panel guarda directo en los archivos del proyecto.
- **Producción (Vercel)**: el panel guarda haciendo un *commit* en GitHub
  (`sapinedal/solarfire-landing`) y Vercel vuelve a publicar la web solo (≈1 min).

### Configurar el panel en producción (una sola vez)

1. Crea la GitHub App de Keystatic: en local, cambia temporalmente `storage` en
   `keystatic.config.ts` a `{ kind: "github", repo: "sapinedal/solarfire-landing" }`,
   ejecuta `npm run dev`, abre `/keystatic` y sigue el asistente. Al terminar crea un
   `.env` con:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=…
   KEYSTATIC_GITHUB_CLIENT_SECRET=…
   KEYSTATIC_SECRET=…
   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=…
   ```
   Luego deja `storage` como estaba (el `.env` no se sube a Git).
2. Copia esas 4 variables en Vercel → *Project → Settings → Environment Variables*.
3. En la GitHub App, agrega como *Callback URL*
   `https://<tu-dominio>/api/keystatic/github/oauth/callback`.
4. Instala la GitHub App en el repositorio y da acceso de escritura a quien vaya a editar.

## Comandos

| Comando | Acción |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` (panel en `/keystatic`) |
| `npm run build` | Compila para producción (salida para Vercel) |
| `npm run preview` | Previsualiza el build |

## Para desarrolladores

- Esquema del panel: `keystatic.config.ts`
- Esquema/validación para Astro: `src/content.config.ts` (mantener sincronizado con el anterior)
- Lectura de contenido: `src/lib/contenido.ts` (`getPagina`, `getProductos`)
- Categorías del catálogo: `src/lib/categorias.ts` · Íconos elegibles: `src/lib/iconos.ts`
