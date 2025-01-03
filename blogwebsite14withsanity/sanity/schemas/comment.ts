import { defineField, defineType } from 'sanity'

export const comment = defineType({
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment',
    }),
    defineField({
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }], // link each comment back to its parent post
      title: 'Post',
    }),
  ],
})
