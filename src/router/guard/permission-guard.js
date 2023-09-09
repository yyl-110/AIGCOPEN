import { getToken, refreshAccessToken, isNullOrWhitespace } from '@/utils'
import { useUserStore } from '~/src/store'

const WHITE_LIST = ['/login', '/404']
export function createPermissionGuard(router) {
  router.beforeEach(async (to, from) => {
    const token = getToken()
    const userInfo = useUserStore()

    /** 没有token的情况 */
    // if (isNullOrWhitespace(token)) {
    //   return true
    // if (WHITE_LIST.includes(to.path))
    // return { path: 'login', query: { ...to.query, redirect: to.path } }
    // }

    /** 有token的情况 */
    // if (to.path === '/login') return { path: '/' }

    // refreshAccessToken()
    /* 获取用户信息 */
    await userInfo.getUserInfo()
    return true
  })
}
