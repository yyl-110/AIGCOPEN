<template>
  <AppPage>
    <div h-full overflow-x-hidden>
      <div
        class="h-98% w-full flex flex-items-start overflow-hidden px-50 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div
          class="h-full min-w-280 w-30% b-rd-10 bg-#2C2E3399 pb-20 pt-20 lt-sm:h-auto lt-sm:h-auto lt-sm:w-100%"
        >
          <div
            class="inner px-17 pb-16 lt-sm:px-9 lt-sm:pb-8"
            style="border-bottom: 1px solid #404040"
          >
            <div
              class="addChat h-48 w-full flex cursor-pointer items-center justify-center b-rd-10 bg-#1A1B1E text-15 text-#fff hover:bg-#1A1B1ECC lt-sm:text-13"
              @click="handelNewChat"
            >
              <TheIcon icon="addFull" type="custom" size="24" class="mr-6 lt-sm:mr-3" />
              新的对话
            </div>
          </div>
          <!-- prompts -->
          <Prompts :data="data" @handelSelect="handelSelect" @handelDel="handelDel" />
        </div>
        <div
          class="chat relative ml-23 h-full flex-1 b-rd-10 bg-#25262B66 lt-sm:ml-0 lt-sm:mt-10 lt-sm:h-auto lt-sm:min-h-500"
        >
          <img src="@/assets/images/logo_text.png" class="logoText absolute w-348" alt="" />
          <!-- 设置 -->
          <Setting v-if="chatState === 2" />
          <chatBox :data="chatItem" :chat-state="chatState" />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import Prompts from './components/prompts.vue'
import Setting from './components/setting.vue'
import chatBox from './components/chatBox.vue'
import api from '~/src/api'
import { useUserStore } from '~/src/store'
import { onMounted } from 'vue'
const userInfo = useUserStore()
const data = ref([])
const chatItem = ref({})
const chatState = ref(2) // 1 查看历史 2 新建聊天

const handelSelect = (id) => {
  chatItem.value = data.value.find((i) => i.id === id)
  chatState.value = 1
}
const handelDel = (id) => {
  data.value = data.value.filter((i) => i.id !== id)
  $message.success('删除成功')
  chatState.value = 2
}
const fetchData = async () => {
  const params = {
    0: { json: userInfo.userId },
    1: { json: userInfo.userId },
    2: { json: userInfo.userId },
  }
  const res = await api.getChatUserInfo({ input: JSON.stringify(params) })
  if (res && res.length) {
    data.value = res[1]?.result?.data?.json
  }
  console.log('res:', res)
}

const handelNewChat = () => {
  chatState.value = 2
  chatItem.value = {}
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.logoText {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}
</style>
