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
    {
      name: 'UserInfo',
      path: 'info',
      component: () => import('./setting/index.vue'),
      isHidden: true,
      meta: {
        title: '详细信息',
        order: 1,
      },
    },
  ],
}
