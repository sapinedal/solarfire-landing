// Catálogo de productos Solar Fire.
// Fuente: src/assets/<producto>/descripcion.md — mantener ambos sincronizados.
import type { ImageMetadata } from "astro";

import desengrasante1 from "../assets/desengrasante-industrial/desengrasante-1.webp";
import desinfectante1 from "../assets/desinfectante-ultra/desinfectante-ultra-1.webp";
import desinfectante2 from "../assets/desinfectante-ultra/desinfectante-ultra-2.webp";
import desinfectante3 from "../assets/desinfectante-ultra/desinfectante-ultra-3.webp";
import detergente1 from "../assets/detergente-ropa/detergente-1.webp";
import detergente2 from "../assets/detergente-ropa/detergente-2.webp";
import detergente3 from "../assets/detergente-ropa/detergente-3.webp";
import hipoclorito1 from "../assets/hipoclorito-sodio/hipoclorito-1.webp";
import hipoclorito2 from "../assets/hipoclorito-sodio/hipoclorito-2.webp";
import lavalozaLitro from "../assets/lavaloza/lavaloza-litro.webp";
import lavalozaGalon from "../assets/lavaloza/lavaloza-galon.webp";
import lavalozaBidon from "../assets/lavaloza/lavaloza-bidon.webp";
import pisosCitronela from "../assets/limpiapisos-desinfectante/limpia-pisos-citronela.webp";
import pisosBrisa from "../assets/limpiapisos-desinfectante/limpia-pisos-brisa-fresca.webp";
import pisosLavanda from "../assets/limpiapisos-desinfectante/limpia-pisos-lavanda.webp";
import pisosPinol from "../assets/limpiapisos-desinfectante/limpia-pisos-pinol.webp";

export type Category = "Hogar" | "Cocina" | "Desinfección" | "Industrial";

export interface ProductImage {
  src: ImageMetadata;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  categories: Category[];
  images: ProductImage[];
  benefits?: string[];
  applications: string[];
  /** Presentaciones, concentraciones o aromas, según el producto. */
  variants?: { label: string; items: string[] };
  usage?: string;
  quote: string;
}

export const categories: Category[] = ["Hogar", "Cocina", "Desinfección", "Industrial"];

export const products: Product[] = [
  {
    slug: "limpia-pisos-desinfectante",
    name: "Limpia Pisos Desinfectante 3 en 1",
    tagline: "Limpia, desinfecta y da brillo con fragancia de larga duración.",
    description: [
      "Limpiador de pisos de alto desempeño formulado para limpiar, desinfectar y realzar el brillo de las superficies. Su fórmula contiene amonio cuaternario de quinta generación, reconocido por su eficaz acción desinfectante.",
      "Además de remover la suciedad cotidiana, proporciona un brillo progresivo con el uso frecuente. Su fórmula biodegradable combina eficiencia con un menor impacto ambiental.",
    ],
    categories: ["Hogar", "Desinfección"],
    images: [
      { src: pisosCitronela, alt: "Limpia Pisos Solar Fire aroma citronela" },
      { src: pisosBrisa, alt: "Limpia Pisos Solar Fire aroma brisa fresca" },
      { src: pisosLavanda, alt: "Limpia Pisos Solar Fire aroma lavanda" },
      { src: pisosPinol, alt: "Limpia Pisos Solar Fire aroma pinol" },
    ],
    applications: [
      "Pisos cerámicos y porcelanatos",
      "Baños y sanitarios",
      "Cocinas y áreas de preparación",
      "Oficinas y áreas comunes",
      "Instituciones educativas",
      "Comercios y establecimientos",
    ],
    variants: {
      label: "Aromas disponibles",
      items: ["Citronela", "Pinol", "Lavanda", "Floral", "Brisa Fresca", "Canela", "Fusión", "Talco"],
    },
    quote: "Limpieza, desinfección y frescura en cada aplicación.",
  },
  {
    slug: "desinfectante-ultra",
    name: "Desinfectante Ultra",
    tagline: "Alcohol + amonio cuaternario de 5.ª generación. Amplio espectro.",
    description: [
      "Potente desinfectante de amplio espectro formulado con una combinación de alcohol etílico y amonio cuaternario de quinta generación, para una limpieza y desinfección eficaz en una amplia variedad de superficies.",
      "Combina la rápida acción del alcohol con el poder residual de los amonios cuaternarios, ayudando a controlar microorganismos en entornos domésticos, comerciales, industriales e institucionales.",
    ],
    categories: ["Desinfección", "Hogar", "Industrial"],
    images: [
      { src: desinfectante3, alt: "Desinfectante Ultra Solar Fire en atomizador" },
      { src: desinfectante2, alt: "Desinfectante Ultra Solar Fire en galón" },
      { src: desinfectante1, alt: "Desinfectante Ultra Solar Fire en bidón" },
    ],
    benefits: [
      "Alcohol + amonio cuaternario de quinta generación",
      "Acción rápida y eficaz",
      "Limpia, desinfecta y ayuda a controlar olores",
      "Aplicación por aspersión o paño",
      "Uso doméstico, institucional e industrial",
    ],
    applications: [
      "Pisos, paredes y techos",
      "Baños y sanitarios",
      "Cocinas y áreas de preparación",
      "Utensilios y equipos",
      "Oficinas e instituciones educativas",
      "Ambientes de alto tránsito",
    ],
    quote: "La máxima protección para sus espacios en una sola aplicación.",
  },
  {
    slug: "lavaloza",
    name: "Lavaloza Líquido Neutro",
    tagline: "Alta espuma, pH neutro y glicerina que cuida tus manos.",
    description: [
      "Lavaloza líquido de alta espuma, disponible con o sin fragancia, formulado con pH neutro. Su poderosa acción desengrasante elimina residuos de alimentos y deja vajillas y utensilios limpios y brillantes.",
      "Contiene agentes humectantes y glicerina que ayudan a proteger y suavizar las manos durante el uso frecuente.",
    ],
    categories: ["Cocina", "Hogar"],
    images: [
      { src: lavalozaLitro, alt: "Lavaloza Solar Fire presentación litro" },
      { src: lavalozaGalon, alt: "Lavaloza Solar Fire presentación galón" },
      { src: lavalozaBidon, alt: "Lavaloza Solar Fire presentación bidón 20 litros" },
    ],
    benefits: [
      "Alto poder desengrasante",
      "Espuma abundante y de larga duración",
      "pH neutro, suave con la piel",
      "Con agentes humectantes y glicerina",
      "Disponible con o sin aroma",
    ],
    applications: [
      "Platos, vasos y cubiertos",
      "Ollas, sartenes y utensilios",
      "Mesones y superficies lavables",
      "Restaurantes, cafeterías y hoteles",
    ],
    variants: {
      label: "Presentaciones",
      items: ["Litro · 1.000 ml", "Galón · 3.800 ml", "Bidón · 20.000 ml"],
    },
    quote: "Máxima limpieza, espuma duradera y protección para tus manos.",
  },
  {
    slug: "detergente-ropa",
    name: "Detergente Líquido para Ropa",
    tagline: "Biodegradable, con bicarbonato y blanqueador óptico.",
    description: [
      "Detergente líquido biodegradable de alto rendimiento para una limpieza profunda en prendas blancas y de color. Su fórmula concentrada actúa sobre la suciedad y las manchas de uso diario.",
      "Enriquecido con blanqueador óptico, realza la luminosidad de las prendas blancas y revitaliza los colores, dejando un agradable aroma de frescura duradera.",
    ],
    categories: ["Hogar"],
    images: [
      { src: detergente2, alt: "Detergente líquido Solar Fire en botella" },
      { src: detergente1, alt: "Detergente líquido Solar Fire en galón" },
      { src: detergente3, alt: "Detergente líquido Solar Fire en bidón" },
    ],
    applications: [
      "Prendas blancas y de color",
      "Hogares",
      "Lavanderías",
      "Hoteles e instituciones",
    ],
    variants: {
      label: "Presentaciones",
      items: ["Botella", "Galón", "Bidón"],
    },
    quote: "Más limpieza, más frescura y más rendimiento en cada lavado.",
  },
  {
    slug: "desengrasante-industrial",
    name: "Desengrasante Industrial",
    tagline: "Remueve grasas medias y suciedad adherida en cocinas y talleres.",
    description: [
      "Desengrasante de alto rendimiento formulado para la remoción eficaz de grasas medias, aceites, suciedad adherida y residuos orgánicos en una amplia variedad de superficies.",
      "Recomendado para cocinas, hornos, parrillas, campanas extractoras, baldosas, pisos, frigoríficos, maquinaria, motores y filtros.",
    ],
    categories: ["Cocina", "Industrial"],
    images: [{ src: desengrasante1, alt: "Desengrasante Industrial Solar Fire en galón" }],
    benefits: [
      "Alto poder detergente y desengrasante",
      "Fácil aplicación y rápida acción",
      "Ideal para mantenimiento preventivo",
      "Versátil en múltiples superficies lavables",
    ],
    applications: [
      "Cocinas industriales y domésticas",
      "Restaurantes",
      "Campanas, parrillas y hornos",
      "Talleres y zonas de mantenimiento",
      "Equipos y maquinaria",
    ],
    usage:
      "Aplicar directamente sobre la superficie o diluir según el nivel de suciedad. Dejar actuar unos minutos, frotar si es necesario y enjuagar con abundante agua.",
    quote: "Más limpieza, menos esfuerzo.",
  },
  {
    slug: "hipoclorito-sodio",
    name: "Hipoclorito de Sodio",
    tagline: "Desinfección, saneamiento y tratamiento de aguas.",
    description: [
      "Hipoclorito de sodio de alta calidad para desinfección, saneamiento y tratamiento de aguas. Gracias a su alto poder oxidante se usa en control microbiológico, desodorización y blanqueamiento.",
      "Ideal para industrias, instituciones, plantas de tratamiento, empresas de mantenimiento y lavanderías.",
    ],
    categories: ["Desinfección", "Industrial"],
    images: [
      { src: hipoclorito1, alt: "Hipoclorito de sodio Solar Fire al 5,25 %" },
      { src: hipoclorito2, alt: "Hipoclorito de sodio Solar Fire al 15 %" },
    ],
    applications: [
      "Tratamiento y desinfección de aguas",
      "Piscinas y plantas de tratamiento",
      "Procesos industriales",
      "Desinfección de superficies",
      "Lavado y blanqueamiento",
    ],
    variants: {
      label: "Concentraciones",
      items: ["5,25 %", "13 %", "15 %"],
    },
    quote: "Potencia, desinfección y confianza en cada aplicación.",
  },
];

export const WHATSAPP_NUMBER = "573023979501";
export const WHATSAPP_DISPLAY = "+57 302 397 9501";

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Mensaje de cotización con la información del producto seleccionado. */
export const productQuoteMessage = (product: Product, detail?: string) =>
  [
    "Hola Solar Fire, vengo de la página web y quiero cotizar este producto:",
    "",
    `*${product.name}*`,
    detail,
    product.variants && !detail && `${product.variants.label}: ${product.variants.items.join(", ")}`,
    `Categoría: ${product.categories.join(", ")}`,
    "",
    "¿Me pueden dar precios y disponibilidad? Gracias.",
  ]
    .filter((line) => line !== undefined && line !== false)
    .join("\n");
