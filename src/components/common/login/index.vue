<template>
  <n-modal v-model:show="showModal">
    <div class="relative h-400 w-380 flex items-center justify-center b-rd-10 bg-#fff">
      <TheIcon icon="close" color="#000" type="custom" class="absolute right-20 top-20 cursor-pointer"
        @click="showModal = false" />
      <iframe :src="url" scrolling="auto" frameborder="no" class="h-310" />
    </div>
  </n-modal>
</template>

<script setup>
const showModal = ref(true)
const url = ref('https://test.aigcopen.com/login/wechat')

const props = defineProps({
  handleOk: {
    type: Function,
    default: () => { },
  },
  handleCancel: {
    type: Function,
    default: () => { },
  },
  remove: {
    type: Function,
    default: () => { },
  },
  redirect: {
    type: String,
    default: ''
  }
})
// 确认
const confirm = () => {
  typeof props.handleOk === 'function' && props.handleOk()
  showModal.value = false
}
const cancel = () => {
  showModal.value = false
  typeof props.handleCancel === 'function' && props.handleCancel()
}

const show = () => {
  showModal.value = true
}

// 监听显示的消失，需要移除dom
watch(
  () => showModal.value,
  (val) => {
    !val && props.remove()
  }
)
</script>

<style lang="scss" scoped></style>
