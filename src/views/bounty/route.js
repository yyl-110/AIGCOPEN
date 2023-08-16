const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Bounty',
  path: '/bounty',
  component: Layout,
  meta: {
    order: 5,
  },
  children: [
    {
      name: 'Bounty',
      path: '',
      component: () => import('./index.vue'),
      meta: {
        title: '赏金任务',
        customIcon: 'sjrw',
        order: 1,
      },
    },
  ],
}
