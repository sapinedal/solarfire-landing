// Acceso al contenido editable desde el panel (/keystatic).
import { getCollection, getEntry, type CollectionEntry, type DataEntryMap } from "astro:content";

type Paginas = Exclude<keyof DataEntryMap, "productos">;

/** Devuelve los datos de una sección (singleton) del panel. */
export async function getPagina<K extends Paginas>(nombre: K): Promise<CollectionEntry<K>["data"]> {
  const entry = await getEntry(nombre, nombre as never);
  if (!entry) throw new Error(`Falta el contenido "src/content/paginas/${nombre}.yaml". Ábrelo y guárdalo desde /keystatic.`);
  return (entry as CollectionEntry<K>).data;
}

export type Producto = CollectionEntry<"productos">["data"] & { slug: string };

/** Productos del catálogo ordenados por el campo «Orden». */
export async function getProductos(): Promise<Producto[]> {
  const entries = await getCollection("productos");
  return entries
    .map((e) => ({ ...e.data, slug: e.id }))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}
