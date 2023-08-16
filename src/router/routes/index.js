const Layout = () => import('@/layout/index.vue')

export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    isHidden: true,
    component: () => import('@/views/error-page/404.vue'),
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },
  {
    name: 'News',
    path: '/news',
    component: Layout,
    meta: {
      order: 6,
    },
    children: [
      {
        name: 'News',
        path: 'http://news.aigcopen.com',
        meta: {
          title: '新闻',
          customIcon: 'news',
        },
      },
    ],
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

export const EMPTY_ROUTE = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: null,
}

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
console.log('modules:', modules)
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }
