<template>
  <div flex items-center>
    <Search v-if="$route.path !== '/'" />
  </div>
  <div ml-auto flex items-center>
    <template v-if="userId">
      <Create />
      <n-button round size="large" style="background-color: rgba(67, 66, 66, 0.4)" class="btn mr-10"
        @click="$router.push('/user')">
        <template #icon>
          <TheIcon icon="data" type="custom" />
        </template>
        {{ money.toFixed(2) }}
      </n-button>
      <UserAvatar />
    </template>
    <n-button v-else type="primary" size="large" class="login btn w-100 b-rd-10 bg-#2C2C2E text-#fff" @click="login">
      登录
    </n-button>
  </div>
  <!-- mobile -->
  <div class="display-none w-full">
    <UserAvatar />
    <div class="flex-justify-between" w-full flex items-center>
      <Search v-if="false" />
      <div ml-auto flex items-center>
        <Create />
        <n-button round size="medium" style="background-color: rgba(67, 66, 66, 0.4)" class="btn mr-10">
          <template #icon>
            <TheIcon icon="data" type="custom" />
          </template>
          0.00
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from './components/Search.vue'
import Create from './components/Create.vue'
// import BreadCrumb from './components/BreadCrumb.vue'
// import MenuCollapse from './components/MenuCollapse.vue'
// import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
// import ThemeMode from './components/ThemeMode.vue'
// import MessageNotification from './components/MessageNotification.vue'
import Login from '@/components/common/login/index.vue'
import { useUserStore } from '@/store'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const userStore = useUserStore()

const userId = computed(() => {
  return userStore.userId
})
const money = computed(() => {
  return userStore.moeny
})

const loginRef = ref(null)

const login = () => {
  proxy.$Login({})
}
// const userId = store
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }

  &:focus {
    background-color: rgba(67, 66, 66, 0.4) !important;
    color: #fff;
  }
}
</style>
