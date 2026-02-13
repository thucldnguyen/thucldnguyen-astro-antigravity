import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'cloud' },
  cloud: {
    project: 'thucldnguyen/thucldnguyen-astro',
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
    thoughts: collection({
      label: 'Thoughts',
      slugField: 'title',
      path: 'src/content/thoughts/*',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'Auto-generated from content, or customize'
          }
        }),
        content: fields.text({
          label: 'What\'s on your mind?',
          multiline: true,
          validation: { length: { max: 500 } }
        }),
        image: fields.image({
          label: 'Image (optional)',
          directory: 'public/images/thoughts',
          publicPath: '/images/thoughts/'
        }),
        publishedAt: fields.datetime({
          label: 'Published At',
          defaultValue: { kind: 'now' }
        }),
      },
    }),
  },
});
