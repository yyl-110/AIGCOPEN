import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { removeToken, toLogin } from '@/utils'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
    interests() {
      return this.userInfo?.interests || ''
    },
    createdAt() {
      return this.userInfo?.createdAt
    },
    moeny() {
      return this.userInfo?.moeny || 0
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api.session()
        const { id, name, image, role } = res?.user || {}
        const userParams = { 0: { json: id }, 1: { json: id } }
        const resUser = await api.getUserProfile({
          batch: 1,
          input: JSON.stringify(userParams),
        })
        const { interests, createdAt } = resUser[0]?.result?.data?.json || {}
        const moeny = resUser[1]?.result?.data?.json || 0
        this.userInfo = { id, name, avatar: image, role, interests, createdAt, moeny }
        localStorage.setItem('userId', id)
        return Promise.resolve(res)
      } catch (error) {
        console.log('error:', error)
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetTags } = useTagsStore()
      const { resetPermission } = usePermissionStore()
      // removeToken()
      // resetTags()
      resetPermission()
      resetRouter()
      localStorage.removeItem('userId')
      this.$reset()
      window.location.href = '/'
      // toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
