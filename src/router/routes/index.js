const Layout = () => import('@/layout/index.vue')

export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    isHidden: true,
    component: () => import('@/views/error-page/404.vue'),
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
  {
    name: 'chatRoom',
    path: '/c',
    component: Layout,
    isHidden: true,
    meta: {
      order: 7,
    },
    children: [
      {
        name: 'ChatRoom',
        path: '',
        component: () => import('@/views/chatRoom/index.vue'),
        meta: {
          title: '对话分享',
          customIcon: 'chat',
          order: 0,
        },
      },
    ],
  },
  {
    name: 'Prompt',
    path: '/prompt',
    component: Layout,
    isHidden: true,
    meta: {
      order: 10,
    },
    children: [
      {
        name: 'Prompt',
        path: '',
        component: () => import('@/views/prompt/index.vue'),
        meta: {
          order: 0,
        },
      },
    ],
  },
  {
    name: 'Create',
    path: '/create',
    component: Layout,
    isHidden: true,
    meta: {
      order: 8,
    },
    children: [
      {
        name: 'Create',
        path: '',
        component: () => import('@/views/create/index.vue'),
        meta: {
          title: '创造和分享你的Prompts提示词',
        },
      },
      {
        name: 'Template',
        path: 'template',
        component: () => import('@/views/create/template/index.vue'),
        meta: {
          title: '创造你的Prompts模板',
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
let asyncRoutes = []
const userId = localStorage.getItem('userId')
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})
if (!userId) {
  asyncRoutes = asyncRoutes.filter((i) => i.name !== 'User')
}
console.log('asyncRoutes:', asyncRoutes, userId)

export { asyncRoutes }
