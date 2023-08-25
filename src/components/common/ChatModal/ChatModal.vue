<template>
  <n-modal v-model:show="showModal">
    <div class="w-80% text-#fff lt-sm:w-90%">
      <n-grid cols="5 s:1 m:5 l:5 xl:5 2xl:5" responsive="screen" item-responsive>
        <n-grid-item span="5 s:5 m:2 l:2 xl:2 2xl:2">
          <div
            class="info h-700 w-full overflow-y-auto b-rd-l-20 bg-#25262B pb-49 lt-lg:h-auto lt-lg:b-rd-b-0 lt-lg:b-rd-t-10"
          >
            <chatInfo :prompt-data="promptData" :prompt-id="promptId" />
          </div>
        </n-grid-item>
        <n-grid-item span="5 s:5 m:3 l:3 xl:3 2xl:3">
          <div
            class="chat h-700 w-full overflow-hidden overflow-y-auto b-rd-r-20 bg-#25262BCC lt-lg:h-auto lt-lg:b-rd-b-10 lt-lg:b-rd-t-0"
          >
            <chatBox :prompt-data="promptData" />
          </div>
        </n-grid-item>
      </n-grid>
    </div>
  </n-modal>
</template>

<script setup>
import chatInfo from './chatInfo.vue'
import chatBox from './chatBox.vue'
import { useRoute } from 'vue-router'
import api from '~/src/api'
const showModal = ref(false)
const route = useRoute()
const promptId = ref('')
const promptData = ref({})

const show = (params) => {
  const { id } = params
  promptId.value = id
  fetchData()
}

const fetchData = async () => {
  const params = { 0: { json: promptId.value } }
  const res = await api.getPromptsBuyId({ input: JSON.stringify(params) })
  console.log('res:', res)
  if (res && res.length) {
    promptData.value = res[0]?.result?.data?.json
  }
  showModal.value = true
}

// onMounted(() => {
//   fetchData()
// })

defineExpose({
  show,
})
</script>

<style lang="scss" scoped></style>
