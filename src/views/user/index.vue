<template>
  <AppPage>
    <div h-full overflow-x-hidden>
      <div
        class="h-90% w-full flex flex-items-start overflow-hidden px-50 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div
          class="h-full min-w-280 w-30% b-rd-10 bg-#2C2E33 px-17 pb-20 pt-20 lt-sm:h-auto lt-sm:h-auto lt-sm:w-100%"
        >
          <info :data="userInfoData" />
        </div>
        <div
          class="ml-25 h-full flex-1 b-rd-10 bg-#25262B66 lt-sm:ml-8 lt-sm:mt-10 lt-sm:h-auto lt-sm:min-h-500"
        >
          <Tabs :task="task" :user-credit-num="userCreditNum" />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import api from '~/src/api'
import info from './components/info.vue'
import Tabs from './components/tabs.vue'
import { useUserStore } from '~/src/store'
const userInfoData = ref({})
const task = ref({})
const userInfo = useUserStore()
const userCreditNum = ref('0.00')
document.title = `${userInfo.name} - ${import.meta.env.VITE_PAGE_TITLE}`
const fetchUserInfo = async () => {
  const params = {
    0: { json: userInfo.userId },
    1: { json: { followingUserId: userInfo.userId, followedUserId: userInfo.userId } },
    2: { json: { userId: userInfo.userId } },
    3: { json: { userId: userInfo.userId } },
    4: { json: userInfo.userId },
  }
  const res = await api.getAllUserInfo({ input: JSON.stringify(params) })
  if (res && res.length) {
    userInfoData.value = res[0]?.result?.data?.json
    task.value = res[2]?.result?.data?.json
    userCreditNum.value = res[3]?.result?.data?.json
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.item {
  position: relative;

  &:not(:first-child) {
    &::before {
      content: '';
      background: #fff;
      position: absolute;
      width: 1px;
      height: 34px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
