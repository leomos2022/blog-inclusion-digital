export default {
  name: 'userResponse',
  title: 'User Response',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'blog',
      title: 'Blog',
      type: 'reference',
      to: [{type: 'blog'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'responses',
      title: 'Respuestas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Pregunta',
              type: 'reference',
              to: [{type: 'question'}]
            },
            {
              name: 'selectedOption',
              title: 'Opción seleccionada',
              type: 'string'
            },
            {
              name: 'isCorrect',
              title: 'Es correcta',
              type: 'boolean'
            }
          ]
        }
      ]
    },
    {
      name: 'score',
      title: 'Puntuación',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100)
    },
    {
      name: 'passed',
      title: 'Aprobado',
      type: 'boolean',
      validation: Rule => Rule.required()
    },
    {
      name: 'completedAt',
      title: 'Completado en',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'blog.title',
      score: 'score'
    },
    prepare(selection) {
      const {title, subtitle, score} = selection
      return {
        title,
        subtitle: `${subtitle} - ${score}%`
      }
    }
  }
}
