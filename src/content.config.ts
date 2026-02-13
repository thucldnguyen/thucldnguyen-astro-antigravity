import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Legacy content uses 'date'
			date: z.coerce.date(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			featuredImage: z.union([image(), z.string()]).optional(),
			heroImage: z.union([image(), z.string()]).optional(),
			image: z.union([image(), z.string()]).optional(),
			tags: z.array(z.string()).optional(),
			slug: z.string().optional(),
			template: z.string().optional(),
		}),
});

const thoughts = defineCollection({
	loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx,yaml}' }),
	schema: z.object({
		title: z.string(),
		content: z.string().max(500),
		image: z.string().optional(),
		publishedAt: z.coerce.date(),
	}),
});

export const collections = { blog, thoughts };
