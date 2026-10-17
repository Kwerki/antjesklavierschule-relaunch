import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Hinweis: Die Felder hier müssen zu public/admin/config.yml (CMS) passen.

const angebot = z.object({
  titel: z.string(),
  untertitel: z.string().optional(),
  details: z.array(z.string()).default([]),
  preise: z.array(z.string()).default([]),
  text: z.string().optional(),
  bild: z.string().optional(),
});

const startseite = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/startseite' }),
  schema: z.object({
    title: z.string(),
    motto: z.string(),
    beschreibung: z.string(),
    bild: z.string(),
    bildAlt: z.string().default(''),
    kacheln: z
      .array(
        z.object({
          titel: z.string(),
          text: z.string().optional(),
          bild: z.string(),
          link: z.string(),
        }),
      )
      .default([]),
    aktuellesAnzahl: z.number().int().min(0).default(3),
    praxis: z
      .object({
        titel: z.string(),
        text: z.string(),
      })
      .optional(),
  }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seiten' }),
  schema: z.object({
    title: z.string(),
    beschreibung: z.string().default(''),
    menu: z.boolean().default(true),
    reihenfolge: z.number().default(50),
    logoZusatz: z.string().optional(),
    bild: z.string().optional(),
    bildAlt: z.string().default(''),
    einleitung: z.string().optional(),
    angebote: z.array(angebot).default([]),
    zitat: z.string().optional(),
    // Spezialbereiche, die unter dem Text angezeigt werden
    bereich: z.enum(['keiner', 'aktuelles', 'youtube', 'kontakt']).default('keiner'),
  }),
});

const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuelles' }),
  schema: z.object({
    title: z.string(),
    datum: z.coerce.date(),
    bild: z.string().optional(),
    entwurf: z.boolean().default(false),
  }),
});

export const collections = { startseite, seiten, aktuelles };
