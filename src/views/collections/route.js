const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Space',
  path: '/collections',
  component: Layout,
  meta: {
    order: 3,
  },
  children: [
    {
      name: 'Collections',
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: '分类集合',
        customIcon: 'collections',
        order: 1,
      },
    },
  ],
}
