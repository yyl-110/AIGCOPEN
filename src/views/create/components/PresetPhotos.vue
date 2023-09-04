<template>
  <n-modal v-model:show="showModal">
    <div class="h-566 w-446 flex flex-col overflow-hidden b-rd-10 bg-#1A1B1E lt-sm:w-full">
      <div class="header h-80 flex items-center justify-center">
        <span class="text-24 font-700 line-height-34 text-#fff">Preset Photos</span>
        <div class="close absolute right-12 flex cursor-pointer items-center justify-center b-rd-4 bg-#D9D9D933 p-8"
          @click="showModal = false">
          <TheIcon icon="close" type="custom" :size="16" />
        </div>
      </div>
      <div class="nav box-border h-78 w-full flex items-center gap-20 overflow-x-auto px-32 lt-sm:px-10">
        <div v-for="(item, index) in navList" :key="index" :class="activeIndex == index ? 'active' : ''"
          class="btnInfo h-38 flex-shrink-0 cursor-pointer b-rd-6 px-11 py-7 text-16 font-700 text-#FFFFFFB2 lt-sm:text-14"
          @click="activeIndex = index">
          {{ item.title }}
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-32">
        <n-grid cols="2 s:3 m:3 l:3 xl:3 2xl:3" :x-gap="16" :y-gap="12" responsive="screen">
          <n-grid-item v-for="(item, index) in navList[activeIndex].imgNum">
            <img :src="getImgUrl(index)" class="w-full b-rd-4" alt="" />
          </n-grid-item>
        </n-grid>
      </div>
      <div class="footer h-92 pt-20 text-center">
        <n-button type="info " class="btnInfo b-rd-8" size="large">Upload Cover</n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
const showModal = ref(false)
const navList = ref([
  { title: 'Abstract', imgNum: 6, iconName: 'abstract/abs' },
  { title: 'Cute', imgNum: 6, iconName: 'cute/cute' },
  { title: 'Futuristic', imgNum: 9, iconName: 'futuristic/futu' },
  { title: 'Illustrative', imgNum: 7, iconName: 'illustrative/illus' },
  { title: 'Minimalist', imgNum: 10, iconName: 'minimalist/mini' },
  { title: 'Realistic', imgNum: 9, iconName: 'realistic/real' },
  { title: 'Vintage', imgNum: 11, iconName: 'vintage/vint' },
])
const activeIndex = ref(0)
const show = () => {
  showModal.value = true
}
const getImgUrl = (index) => {
  return `https://test.aigcopen.com/icon/${navList.value[activeIndex.value].iconName}_${index + 1}.png`
}
defineExpose({
  show,
})
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #6d6d6d38;
}

.nav {
  &::-webkit-scrollbar {
    display: none;
  }
}

.btnInfo {
  &.active {
    background: #c5191f;
    color: #fff;
  }

  &:hover {
    background: #c5191f;
    color: #fff;
  }

  &:focus {
    background: #c5191f;
    color: #fff;
  }
}
</style>
