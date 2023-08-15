const Layout = () => import('@/layout/index.vue')

export default {
  name: 'User',
  path: '/user',
  component: Layout,
  meta: {
    order: 1,
  },
  children: [
    {
      name: 'User',
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: '我的空间',
        customIcon: 'space',
        order: 1,
      },
    },
  ],
}
