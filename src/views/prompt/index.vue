<template>
  <div class="wh-full">
    <div class="wh-full flex-1 text-#fff">
      <div class="wh-full flex lt-sm:flex-wrap">
        <div class="info h-full w-30% overflow-y-auto bg-#25262B pb-49 lt-sm:h-auto">
          <chatInfo v-if="promptData" :prompt-data="promptData" :prompt-id="promptId" />
        </div>
        <div class="chat flex-1 overflow-hidden overflow-y-auto bg-#25262BCC lt-sm:h-auto">
          <chatBox :prompt-data="promptData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import chatInfo from './components/chatInfo.vue'
import chatBox from './components/chatBox.vue'
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
