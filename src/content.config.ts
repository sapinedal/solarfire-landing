// Colecciones de contenido: leen los YAML que edita el panel Keystatic (keystatic.config.ts).
// Si cambias un campo allí, actualiza también su esquema aquí.
import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIAS } from "./lib/categorias";

const BASE_PAGINAS = "./src/content/paginas";

/** Un "singleton" del panel = un archivo YAML en src/content/paginas. */
const pagina = <T extends z.ZodRawShape>(nombre: string, shape: (ctx: SchemaContext) => T) =>
  defineCollection({
    loader: glob({ pattern: `${nombre}.yaml`, base: BASE_PAGINAS }),
    schema: (ctx) => z.object(shape(ctx)),
  });

const str = z.string();
const opt = z.string().nullish();
const lista = z.array(z.string()).default([]);
const enlaces = z.array(z.object({ label: str, href: str })).default([]);
const encabezado = { eyebrow: str, title: str, description: str };

export const collections = {
  ajustes: pagina("ajustes", ({ image }) => ({
    seoTitle: str,
    seoDescription: str,
    ogImage: image(),
    logo: image(),
    companyName: str,
    whatsappNumber: z.coerce.string(),
    whatsappDisplay: str,
    landline: opt,
    email: opt,
    addressLines: lista,
    city: str,
    instagramUrl: opt,
    floatingLabel: str,
    floatingMessage: str,
    quoteIntro: str,
    quoteOutro: str,
  })),

  navegacion: pagina("navegacion", () => ({ links: enlaces, ctaLabel: str, ctaMessage: str })),

  hero: pagina("hero", ({ image }) => ({
    eyebrow: str,
    title: str,
    titleHighlight: str,
    description: str,
    primaryCta: str,
    secondaryCta: str,
    whatsappMessage: str,
    highlights: z.array(z.object({ value: str, label: str })).default([]),
    image: image(),
    imageAlt: str,
    badges: lista,
  })),

  catalogo: pagina("catalogo", () => ({ ...encabezado, allLabel: str, disclaimer: str })),

  aromas: pagina("aromas", ({ image }) => ({
    product: str,
    ...encabezado,
    features: z.array(z.object({ title: str, text: str })).default([]),
    aromas: z.array(z.object({ name: str, color: str, image: image(), note: str })).min(1),
    otherAromas: lista,
    ctaLabel: str,
  })),

  videos: pagina("videos", () => ({
    ...encabezado,
    items: z
      .array(
        z.object({
          title: str,
          subtitle: str,
          tag: str,
          category: str,
          video: str,
          poster: opt,
          benefits: lista,
          buttonLabel: str,
          whatsappMessage: str,
        }),
      )
      .default([]),
    calloutTitle: str,
    calloutText: str,
    calloutButton: str,
  })),

  nosotros: pagina("nosotros", ({ image }) => ({
    ...encabezado,
    badgeLogo: image(),
    badgeTitle: str,
    badgeSubtitle: str,
    pillars: z.array(z.object({ icon: str, title: str, text: str })).default([]),
    banner: image(),
    bannerAlt: str,
  })),

  contacto: pagina("contacto", () => ({
    ...encabezado,
    addressTitle: str,
    phonesTitle: str,
    emailTitle: str,
    extraOptions: lista,
    submitLabel: str,
    submitNote: str,
  })),

  footer: pagina("footer", () => ({ description: str, note: opt, links: enlaces, bottomTags: lista })),

  productos: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/productos" }),
    schema: ({ image }) =>
      z.object({
        name: str,
        order: z.number().default(10),
        tagline: str,
        categories: z.array(z.enum(CATEGORIAS)).default([]),
        images: z.array(z.object({ image: image(), alt: str })).min(1),
        description: lista,
        benefits: lista,
        applications: lista,
        variantsLabel: opt,
        variants: lista,
        usage: opt,
        quote: opt,
      }),
  }),
};
