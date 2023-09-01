<template>
  <div class="wh-full">
    <div class="wh-full flex-1 text-#fff">
      <div class="wh-full flex lt-sm:flex-wrap lt-sm:overflow-y-scroll">
        <div
          class="info h-full w-30% overflow-y-auto bg-#25262B pb-49 lt-sm:h-auto lt-sm:w-full lt-sm:pb-10"
        >
          <chatInfo v-if="promptData" :prompt-data="promptData" :prompt-id="promptId" />
        </div>
        <div
          class="chat flex-1 overflow-hidden overflow-y-auto bg-#25262BCC lt-sm:h-auto lt-sm:w-full lt-sm:overflow-unset"
        >
          <chatBox :prompt-data="promptData" :prompt-id="promptId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import chatInfo from '@/components/common/ChatModal/chatInfo.vue'
import chatBox from '@/components/common/ChatModal/chatBox.vue'
import { useRoute } from 'vue-router'
import api from '~/src/api'
const route = useRoute()
const promptId = ref(route.query.promptId)
const promptData = ref(null)

const fetchData = async () => {
  const params = { 0: { json: promptId.value } }
  const res = await api.getPromptsBuyId({ input: JSON.stringify(params) })
  if (res && res.length) {
    promptData.value = res[0]?.result?.data?.json
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
