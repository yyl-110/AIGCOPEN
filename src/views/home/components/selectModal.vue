<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="background-color: #fff; color: #000"
      class="relative w-654"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <icon-custom-close
        class="absolute right-30 top-30 h-16 w-16 cursor-pointer"
        @click="showModal = false"
      ></icon-custom-close>
      <template #header>
        <div class="flex items-center px-24 py-30 text-#000">
          <img src="@/assets/images/selfSet.png" mr-6 h-29 w-29 alt="" />
          <span text-24 lt-sm:text-16>个人偏好设置</span>
        </div>
      </template>
      <div class="content h-616 wh-full bg-#F9F9F9 px-16 pt-12 lt-sm:h-300">
        <div class="inner wh-full overflow-y-auto">
          <div class="tagList flex flex-wrap">
            <div
              v-for="(item, index) in tagList"
              :key="index"
              class="item m-5 flex cursor-pointer items-center justify-center b-rd-8 bg-#CACACA px-16 py-8 text-#000 hover:bg-#000 hover:text-#fff"
            >
              <TheIcon icon="choose" type="custom" class="mr-5" />
              <TheIcon v-if="false" icon="current" type="custom" class="mr-5" />
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center">
          <div
            class="save h-38 w-90 flex cursor-pointer items-center justify-center b-rd-5 bg-#C5191F text-15 text-#fff"
          >
            保存
          </div>
          <span class="ml-13 text-14 text-#000">不再显示该偏好设置</span>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
const showModal = ref(false)
const tagList = ref([
  'stableDiffusion',
  '生产力',
  '头脑',
  '娱乐',
  '生产力',
  '头脑',
  'stableDiffusion',
  'stableDiffusion',
  '娱乐',
  '头脑',
  '娱乐',
  '生产力',
  '生产力',
  '头脑',
  'stableDiffusion',
  '娱乐',
  '生产力',
  '头脑',
  'stableDiffusion',
  '娱乐',
  '生产力',
  '头脑',
  'stableDiffusion',
  '娱乐',
])
const show = () => {
  showModal.value = true
}

defineExpose({
  show,
})
</script>

<style lang="scss" scoped>
.n-card > :deep(.n-card-header) {
  padding: 0 !important;
}

@media only screen and (min-width: 768px) and (max-width: 1500px) {
  .content {
    height: 400px !important;
  }
}
</style>
