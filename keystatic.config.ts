import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'thucldnguyen/thucldnguyen-astro-antigravity',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        template: fields.text({ label: 'Template' }),
        slug: fields.text({ label: 'URL Slug Override' }),
        date: fields.text({ label: 'Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        heroImage: fields.text({ label: 'Hero Image' }),
        featuredImage: fields.text({ label: 'Featured Image' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
