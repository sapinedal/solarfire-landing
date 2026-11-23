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
- **Producción (Vercel)**: el panel usa [Keystatic Cloud](https://keystatic.cloud)
  (proyecto `devteam/solarfire-landing`). Los editores inician sesión allí, cada
  guardado hace un *commit* en GitHub y Vercel vuelve a publicar la web solo (≈1 min).

### Dar acceso a un editor

En https://keystatic.cloud → proyecto `solarfire-landing` → invita a la persona por
correo (el plan gratis permite hasta 3 usuarios). No necesita cuenta de GitHub.

Si cambia el dominio de la web, agrégalo en *Project URLs* del proyecto en Keystatic Cloud.

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
