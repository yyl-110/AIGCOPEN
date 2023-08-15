const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Chat',
  path: '/chat',
  component: Layout,
  meta: {
    order: 2,
  },
  children: [
    {
      name: 'Chat',
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: '对话',
        customIcon: 'chat',
        order: 0,
      },
    },
  ],
}
