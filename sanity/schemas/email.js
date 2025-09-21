export default {
  name: 'email',
  title: 'Email Subscription',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'subscribedAt',
      title: 'Fecha de suscripción',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt'
    }
  }
}
