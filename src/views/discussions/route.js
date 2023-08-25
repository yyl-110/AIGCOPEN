const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Discussions',
  path: '/discussions',
  component: Layout,
  meta: {
    order: 4,
  },
  children: [
    {
      name: 'Discussions',
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: '社区',
        customIcon: 'sq',
        order: 1,
      },
    },
    {
      name: 'CreateDiscussions',
      path: 'create',
      isHidden: true,
      component: () => import('./Create/index.vue'),
      meta: {
        title: '创建讨论',
        order: 1,
      },
    },
  ],
}
