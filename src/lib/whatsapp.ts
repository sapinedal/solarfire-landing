// Utilidades de WhatsApp. Sin dependencias de Astro para poder usarlas también en el navegador.

export const whatsappLink = (number: string, text = "") =>
  `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

interface ProductoCotizable {
  name: string;
  categories: readonly string[];
  variantsLabel?: string | null;
  variants?: readonly string[];
}

export interface PlantillaCotizacion {
  intro: string;
  outro: string;
}

/** Mensaje de cotización con la información del producto seleccionado. */
export const productQuoteMessage = (product: ProductoCotizable, plantilla: PlantillaCotizacion, detail?: string) =>
  [
    plantilla.intro,
    "",
    `*${product.name}*`,
    detail,
    !detail && product.variantsLabel && product.variants?.length
      ? `${product.variantsLabel}: ${product.variants.join(", ")}`
      : undefined,
    product.categories.length ? `Categoría: ${product.categories.join(", ")}` : undefined,
    "",
    plantilla.outro,
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");
