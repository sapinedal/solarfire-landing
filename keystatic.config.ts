// Panel de administración de contenido (Keystatic).
// Local: http://localhost:4321/keystatic — en producción: https://<tu-dominio>/keystatic
//
// Cada sección de la landing es un "singleton" (una sola página de ajustes) y los
// productos son una "colección". Todo se guarda como YAML en src/content/ y las
// imágenes en src/assets/, así que cada cambio queda versionado en Git.
import { config, collection, fields, singleton } from "@keystatic/core";
import { CATEGORIAS } from "./src/lib/categorias";
import { ICONOS } from "./src/lib/iconos";

// --- Helpers -----------------------------------------------------------------

/** Imagen optimizada por Astro (vive en src/assets/paginas/<carpeta>). */
const imagenPagina = (carpeta: string, label: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: `src/assets/paginas/${carpeta}`,
    publicPath: `../../assets/paginas/${carpeta}/`,
    validation: { isRequired: true },
  });

const texto = (label: string, opts: { multiline?: boolean; description?: string; requerido?: boolean } = {}) =>
  fields.text({
    label,
    multiline: opts.multiline,
    description: opts.description,
    validation: opts.requerido === false ? undefined : { length: { min: 1 } },
  });

const textoOpcional = (label: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.text({ label, multiline: opts.multiline, description: opts.description });

const listaTextos = (label: string, itemLabel = "Elemento", description?: string) =>
  fields.array(fields.text({ label: itemLabel }), {
    label,
    description,
    itemLabel: (p) => p.value || itemLabel,
  });

const encabezado = () => ({
  eyebrow: texto("Antetítulo", { description: "Texto pequeño en mayúsculas sobre el título." }),
  title: texto("Título"),
  description: texto("Descripción", {
    multiline: true,
    description: "Usa **texto** para poner palabras en negrita.",
  }),
});

const opcionesIconos = Object.entries(ICONOS).map(([value, { label }]) => ({ value, label }));

const enlaces = (label: string) =>
  fields.array(
    fields.object({
      label: texto("Texto"),
      href: texto("Destino", { description: "Ej. #productos para ir a una sección, o una URL completa." }),
    }),
    { label, itemLabel: (p) => p.fields.label.value || "Enlace" },
  );

// --- Configuración -----------------------------------------------------------

export default config({
  // Local: guarda en los archivos del proyecto.
  // Producción: Keystatic Cloud (login de editores + commits a GitHub, sin claves en Vercel).
  storage: import.meta.env.PROD ? { kind: "cloud" } : { kind: "local" },
  cloud: { project: "devteam/solarfire-landing" },

  ui: {
    brand: { name: "Solar Fire" },
    navigation: {
      "General": ["ajustes", "navegacion", "footer"],
      "Secciones de la landing": ["hero", "catalogo", "aromas", "videos", "nosotros", "contacto"],
      "Catálogo": ["productos"],
    },
  },

  singletons: {
    ajustes: singleton({
      label: "Ajustes generales",
      path: "src/content/paginas/ajustes",
      format: { data: "yaml" },
      schema: {
        seoTitle: texto("Título de la pestaña / Google"),
        seoDescription: texto("Descripción para Google y redes", { multiline: true }),
        ogImage: imagenPagina("ajustes", "Imagen al compartir en redes", "Recomendado 1200×630 px."),
        logo: imagenPagina("ajustes", "Logo"),
        companyName: texto("Razón social", { description: "Ej. Solar Fire S.A.S." }),
        whatsappNumber: texto("Número de WhatsApp (solo dígitos, con indicativo)", {
          description: "Ej. 573023979501. Es el número al que llegan todas las cotizaciones.",
        }),
        whatsappDisplay: texto("WhatsApp como se muestra", { description: "Ej. +57 302 397 9501" }),
        landline: textoOpcional("Teléfono fijo"),
        email: textoOpcional("Correo electrónico"),
        addressLines: listaTextos("Dirección (una línea por renglón)", "Línea"),
        city: texto("Ciudad corta", { description: "Ej. Itagüí, Antioquia" }),
        instagramUrl: textoOpcional("URL de Instagram"),
        floatingLabel: texto("Texto del botón flotante de WhatsApp"),
        floatingMessage: texto("Mensaje del botón flotante de WhatsApp", { multiline: true }),
        quoteIntro: texto("Saludo al cotizar un producto", {
          multiline: true,
          description: "Primera línea del mensaje de WhatsApp al pulsar «Cotizar» en un producto.",
        }),
        quoteOutro: texto("Despedida al cotizar un producto", { multiline: true }),
      },
    }),

    navegacion: singleton({
      label: "Menú superior",
      path: "src/content/paginas/navegacion",
      format: { data: "yaml" },
      schema: {
        links: enlaces("Enlaces del menú"),
        ctaLabel: texto("Texto del botón"),
        ctaMessage: texto("Mensaje de WhatsApp del botón", { multiline: true }),
      },
    }),

    hero: singleton({
      label: "Portada (Hero)",
      path: "src/content/paginas/hero",
      format: { data: "yaml" },
      schema: {
        eyebrow: texto("Antetítulo"),
        title: texto("Título (parte 1)"),
        titleHighlight: texto("Título (parte resaltada en rojo)"),
        description: texto("Descripción", { multiline: true }),
        primaryCta: texto("Botón principal"),
        secondaryCta: texto("Botón de WhatsApp"),
        whatsappMessage: texto("Mensaje de WhatsApp del botón", { multiline: true }),
        highlights: fields.array(
          fields.object({ value: texto("Dato"), label: texto("Descripción") }),
          { label: "Datos destacados", itemLabel: (p) => p.fields.value.value || "Dato" },
        ),
        image: imagenPagina("hero", "Imagen principal"),
        imageAlt: texto("Descripción de la imagen (accesibilidad/SEO)"),
        badges: listaTextos("Etiquetas sobre la imagen", "Etiqueta"),
      },
    }),

    catalogo: singleton({
      label: "Sección Catálogo",
      path: "src/content/paginas/catalogo",
      format: { data: "yaml" },
      schema: {
        ...encabezado(),
        allLabel: texto("Texto del filtro «todos»"),
        disclaimer: texto("Nota legal en la ficha del producto", { multiline: true }),
      },
    }),

    aromas: singleton({
      label: "Sección Aromas (producto estrella)",
      path: "src/content/paginas/aromas",
      format: { data: "yaml" },
      schema: {
        product: fields.relationship({
          label: "Producto destacado",
          collection: "productos",
          validation: { isRequired: true },
        }),
        ...encabezado(),
        features: fields.array(
          fields.object({ title: texto("Título"), text: texto("Texto") }),
          { label: "Características", itemLabel: (p) => p.fields.title.value || "Característica" },
        ),
        aromas: fields.array(
          fields.object({
            name: texto("Nombre del aroma"),
            color: texto("Color (hex)", { description: "Ej. #ef4b2b" }),
            image: imagenPagina("aromas", "Foto del envase"),
            note: texto("Descripción corta"),
          }),
          { label: "Aromas con foto", itemLabel: (p) => p.fields.name.value || "Aroma" },
        ),
        otherAromas: listaTextos("Otros aromas disponibles (sin foto)", "Aroma"),
        ctaLabel: texto("Texto del botón", { description: "Se le añade el nombre del aroma al final." }),
      },
    }),

    videos: singleton({
      label: "Sección Videos",
      path: "src/content/paginas/videos",
      format: { data: "yaml" },
      schema: {
        ...encabezado(),
        items: fields.array(
          fields.object({
            title: texto("Título"),
            subtitle: texto("Descripción", { multiline: true }),
            tag: texto("Etiqueta sobre el video"),
            category: texto("Categoría"),
            video: fields.file({
              label: "Video (MP4)",
              description: "Formato vertical 9:16, idealmente menos de 10 MB.",
              directory: "public/videos",
              publicPath: "/videos/",
              validation: { isRequired: true },
            }),
            poster: fields.image({
              label: "Portada del video",
              directory: "public/videos",
              publicPath: "/videos/",
            }),
            benefits: listaTextos("Beneficios", "Beneficio"),
            buttonLabel: texto("Texto del botón"),
            whatsappMessage: texto("Mensaje de WhatsApp", { multiline: true }),
          }),
          { label: "Videos", itemLabel: (p) => p.fields.title.value || "Video" },
        ),
        calloutTitle: texto("Recuadro inferior: título"),
        calloutText: texto("Recuadro inferior: texto"),
        calloutButton: texto("Recuadro inferior: botón"),
      },
    }),

    nosotros: singleton({
      label: "Sección Nosotros",
      path: "src/content/paginas/nosotros",
      format: { data: "yaml" },
      schema: {
        ...encabezado(),
        badgeLogo: imagenPagina("nosotros", "Logo del sello"),
        badgeTitle: texto("Sello: título"),
        badgeSubtitle: texto("Sello: subtítulo"),
        pillars: fields.array(
          fields.object({
            icon: fields.select({ label: "Ícono", options: opcionesIconos, defaultValue: "escudo" }),
            title: texto("Título"),
            text: texto("Texto", { multiline: true }),
          }),
          { label: "Pilares", itemLabel: (p) => p.fields.title.value || "Pilar" },
        ),
        banner: imagenPagina("nosotros", "Banner inferior"),
        bannerAlt: texto("Descripción del banner"),
      },
    }),

    contacto: singleton({
      label: "Sección Contacto",
      path: "src/content/paginas/contacto",
      format: { data: "yaml" },
      schema: {
        ...encabezado(),
        addressTitle: texto("Título de la dirección"),
        phonesTitle: texto("Título de los teléfonos"),
        emailTitle: texto("Título del correo"),
        extraOptions: listaTextos(
          "Opciones extra en «Producto de interés»",
          "Opción",
          "Se muestran después de los productos del catálogo.",
        ),
        submitLabel: texto("Texto del botón de envío"),
        submitNote: texto("Nota bajo el botón", { multiline: true }),
      },
    }),

    footer: singleton({
      label: "Pie de página",
      path: "src/content/paginas/footer",
      format: { data: "yaml" },
      schema: {
        description: texto("Descripción de la empresa", {
          multiline: true,
          description: "Usa **texto** para negrita.",
        }),
        note: textoOpcional("Nota pequeña", { multiline: true, description: "Usa **texto** para negrita." }),
        links: enlaces("Enlaces rápidos"),
        bottomTags: listaTextos("Textos de la franja inferior", "Texto"),
      },
    }),
  },

  collections: {
    productos: collection({
      label: "Productos",
      path: "src/content/productos/*",
      format: { data: "yaml" },
      slugField: "name",
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: { label: "Nombre del producto" },
          slug: { label: "Identificador", description: "Se usa internamente; no lo cambies si no es necesario." },
        }),
        order: fields.integer({
          label: "Orden en el catálogo",
          description: "Los números menores aparecen primero.",
          defaultValue: 10,
        }),
        tagline: texto("Frase corta (tarjeta)"),
        categories: fields.multiselect({
          label: "Categorías",
          options: CATEGORIAS.map((c) => ({ label: c, value: c })),
        }),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: "Foto",
              directory: "src/assets/productos",
              publicPath: "../../assets/productos/",
              validation: { isRequired: true },
            }),
            alt: texto("Descripción de la foto"),
          }),
          {
            label: "Fotos",
            description: "La primera es la portada de la tarjeta.",
            itemLabel: (p) => p.fields.alt.value || "Foto",
            validation: { length: { min: 1 } },
          },
        ),
        description: fields.array(fields.text({ label: "Párrafo", multiline: true }), {
          label: "Descripción (párrafos)",
          itemLabel: (p) => (p.value ? `${p.value.slice(0, 60)}…` : "Párrafo"),
        }),
        benefits: listaTextos("Beneficios", "Beneficio"),
        applications: listaTextos("Aplicaciones", "Aplicación"),
        variantsLabel: textoOpcional("Título de variantes", {
          description: "Ej. Presentaciones, Aromas disponibles, Concentraciones. Déjalo vacío si no aplica.",
        }),
        variants: listaTextos("Variantes", "Variante"),
        usage: textoOpcional("Modo de uso", { multiline: true }),
        quote: textoOpcional("Frase final (cita)"),
      },
    }),
  },
});
