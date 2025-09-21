export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Celulares', value: 'Celulares'},
          {title: 'Correo', value: 'Correo'},
          {title: 'Microsoft Office', value: 'Office'},
          {title: 'Inteligencia Artificial', value: 'IA'},
          {title: 'Seguridad Digital', value: 'Seguridad'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Equipo de Inclusión Digital',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'authorImg',
      title: 'Imagen del autor',
      type: 'image',
      options: {
        hotspot: true,
      },
      initialValue: {
        _type: 'image',
        asset: {
          _ref: 'image-profile_icon-png',
          _type: 'reference'
        }
      }
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `por ${author}`
      })
    }
  }
}
