const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Home',
  path: '/',
  component: Layout,
  redirect: '/',
  meta: {
    order: 0,
  },
  children: [
    {
      name: 'Home',
      path: '/',
      component: () => import('./index.vue'),
      meta: {
        title: '开始',
        icon: 'mdi:home',
        order: 0,
      },
    },
  ],
}
