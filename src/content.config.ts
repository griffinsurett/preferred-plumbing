// src/content.config.ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { GlobLoad, FileLoad } from "@/utils/loaders/loaderUtils";
import { baseSchema, MenuSchema, MenuItemFields, refSchema } from "./content/schema";
import { MenuItemsLoader } from "@/utils/loaders/MenuItemsLoader";

export const collections = {
  "menus": defineCollection({
    loader: FileLoad("menus", "menus.json"),
    schema: MenuSchema,
  }),

  "menu-items": defineCollection({
    loader: MenuItemsLoader(),
    schema: MenuItemFields,
  }),

  "contact-us": defineCollection({
    loader: FileLoad("contact-us", "contact-us.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        linkPrefix: z.string().optional(),
      }),
  }),

  "social-media": defineCollection({
    loader: FileLoad("social-media", "socialmedia.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        link: z.string().optional(),
      }),
  }),

  "legal": defineCollection({
    loader: GlobLoad("legal"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        effectiveDate: z
          .union([z.date(), z.string()])
          .optional()
          .transform((val) => {
            if (!val) return undefined;
            if (val instanceof Date) return val;
            return new Date(val);
          }),
      }),
  }),

  "about-us": defineCollection({
    loader: GlobLoad("about-us"),
    schema: ({ image }) =>
      baseSchema({ image })
  }),

  "benefits": defineCollection({
    loader: FileLoad("benefits", "benefits.json"),
    schema: ({ image }) =>
      baseSchema({ image }),
  }),

  "blog": defineCollection({
    loader: GlobLoad("blog"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        author: refSchema("authors"),
        tags: z.array(z.string()).default([]),
        readingTime: z.number().optional(),
      }),
  }),

  "authors": defineCollection({
    loader: FileLoad("authors", "authors.json"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        email: z.string().email().optional(),
        social: z
          .object({
            twitter: z.string().url().optional(),
            github: z.string().url().optional(),
            linkedin: z.string().url().optional(),
            website: z.string().url().optional(),
          })
          .optional(),
        role: z.string().optional(),
      }),
  }),

  "services": defineCollection({
    loader: GlobLoad("services"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        price: z.string().optional(),
        features: z.array(z.string()).default([]),
      }),
  }),

  "testimonials": defineCollection({
    loader: GlobLoad("testimonials"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        role: z.string(),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).default(5),
        reviewDate: z.string().optional(),
        reviewUrl: z.string().url().optional(),
        avatarColor: z.string().optional(),
      }),
  }),

  "projects": defineCollection({
    loader: GlobLoad("projects"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        client: z.string(),
        projectUrl: z.string().url().optional(),
        technologies: z.array(z.string()).default([]),
        category: z.string(),
      }),
  }),

  "faq": defineCollection({
    loader: GlobLoad("faq"),
    schema: ({ image }) =>
      baseSchema({ image }).extend({
        category: z.string().optional(),
      }),
  }),
};
