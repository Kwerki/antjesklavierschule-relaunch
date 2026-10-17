import { getCollection } from 'astro:content';

export async function getMenu() {
  const seiten = await getCollection('seiten', ({ data }) => data.menu);
  return seiten
    .sort((a, b) => a.data.reihenfolge - b.data.reihenfolge)
    .map((s) => ({ titel: s.data.title, pfad: `/${s.id}` }));
}
