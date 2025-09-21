export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  fields: [
    {
      name: 'blog',
      title: 'Blog',
      type: 'reference',
      to: [{type: 'blog'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'options',
      title: 'Opciones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'isCorrect',
              title: 'Es correcta',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(2).max(4)
    },
    {
      name: 'explanation',
      title: 'Explicación',
      type: 'text',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'blog.title'
    }
  }
}
