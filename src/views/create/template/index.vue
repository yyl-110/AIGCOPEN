<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap lt-sm:overflow-y-auto">
        <div
          class="relative h-95% flex flex-col flex-1 overflow-x-hidden overflow-y-auto b-rd-10 bg-#2C2E3399 px-20 lt-sm:h-fit lt-sm:w-full lt-sm:overflow-initial lt-sm:px-10"
        >
          <leftForm @handelSubmit="handelSubmit" />
        </div>
        <div
          class="ml-23 h-95% w-40% overflow-hidden b-rd-10 bg-#25262B66 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%"
        >
          <Chat ref="chatRef" />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import leftForm from '../components/leftForm.vue'
import Chat from '../components/chat.vue'
import api from '~/src/api'
const chatRef = ref(null)

const handelSubmit = async (formData = {}) => {
  if (!chatRef.value.conversationId) {
    $message.error('你需要先进行问答对话后再创建')
    return
  }
  const params = {
    0: {
      json: {
        ...formData,
        thumbnailURL: '',
        conversationId: chatRef.value.conversationId,
        initPrompt: chatRef.value.initPrompt,
        language: 'zh',
      },
    },
  }

  console.log(chatRef.value.conversationId, chatRef.value.initPrompt)
  const res = await api.cretePrompt(params)
  if (res && res.length) {
    $message.success('创建成功！')
  }
}
</script>

<style lang="scss" scoped></style>
