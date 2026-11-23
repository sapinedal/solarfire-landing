// Categorías del catálogo. Se usan en el panel (Keystatic) y en los filtros de la landing.
export const CATEGORIAS = ["Hogar", "Cocina", "Desinfección", "Industrial"] as const;
export type Categoria = (typeof CATEGORIAS)[number];
