<template>
  <div
    class="item relative h-122 w-full flex flex-col cursor-pointer b-rd-10 bg-#D3D3D342 px-11 pt-15 hover:bg-#FFFFFF26"
    @click="goToPrompt"
  >
    <div
      class="w-full flex items-center overflow-hidden pb-12"
      style="border-bottom: 1px solid rgba(255, 255, 255, 0.15)"
    >
      <div class="imgWrap relative h-60 w-60 flex-shrink-0 overflow-hidden b-rd-10">
        <img :src="getUrl(data?.thumbnailURL)" class="wh-full" />
      </div>
      <div class="ml-12 flex flex-col">
        <div class="ellipsis1 text-15 font-500 text-#fff">{{ data?.title }}</div>
        <div class="ellipsis2 mt-2 w-full text-12 text-#CFCFCF">
          {{ data?.description }}
        </div>
      </div>
    </div>
    <div class="option flex flex-1 items-center justify-between overflow-hidden">
      <div v-if="data" w-full flex items-center>
        <div
          v-for="item in iconList"
          :key="item.key"
          class="option-item mr-10 h-full flex items-center justify-start text-12 font-700 text-[#9B9B9B]"
        >
          <TheIcon :icon="item.icon" type="custom" class="mr-4 lt-sm:mr-2" />
          {{ data[item?.key] }}
        </div>
      </div>
      <div class="name h-full flex items-center">
        <img
          src="https://image.aigcopen.com/4d97ede04cfd23dc5384c11a3740d5bc.png"
          class="h-18 w-18 flex-shrink-0 b-rd-50%"
          alt=""
        />
        <span class="ellipsis1 ml-4 w-40 text-12 font-700 text-#9B9B9B lt-sm:ml-2">Grablierrw</span>
      </div>
    </div>
    <div
      class="tag absolute right-12 top-7 h-16 b-rd-4 bg-[#FF7C81] px-8 text-center text-12 lh-16 text-#fff"
    >
      {{ data?.Tag[0]?.name }}
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getUrl } from '~/src/utils'
const router = useRouter()

const iconList = ref([
  { icon: 'fire_o', key: 'popularity' },
  { icon: 'play_o', key: 'uses' },
  { icon: 'love_o', key: 'upvotes' },
])
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
const goToPrompt = () => {
  router.push({
    path: '/prompt',
    query: {
      promptId: props.data.id,
    },
  })
}
</script>

<style lang="scss" scoped>
.option-item {
  &:not(:first-child) {
    margin-left: 11px;
  }
}
</style>
