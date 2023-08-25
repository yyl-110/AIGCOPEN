<template>
  <div
    v-if="data"
    class="card relative h-auto w-full cursor-pointer overflow-hidden b-rd-10 bg-[#25262B]"
  >
    <div class="imgWrap relative w-full overflow-hidden pb-100%">
      <img :src="getUrl(data?.thumbnailURL)" class="absolute left-0 top-0 h-full w-full" alt="" />
    </div>
    <div class="flex flex-col px-9 pb-8">
      <div class="ellipsis1 mt-10 pl-6 text-22 text-#fff lt-sm:mt-5 lt-sm:pl-3 lt-sm:text-14">
        {{ data.title }}
      </div>
      <div
        class="desc ellipsis3 mt-9 min-h-60 w-full pl-6 text-14 line-height-20 text-#CFCFCF lt-sm:mt-4 lt-sm:pl-3 lt-sm:text-12"
      >
        {{ data.description }}
      </div>
      <div class="option mt-20 flex flex-justify-between lt-sm:mt-10">
        <div class="item flex flex-items-center text-12 text-[#9B9B9B]">
          <TheIcon icon="fire" type="custom" class="mr-4 lt-sm:mr-2" />
          {{ data.popularity }}
        </div>
        <div class="item flex flex-items-center text-12 text-[#9B9B9B]">
          <TheIcon icon="play" type="custom" class="mr-4 lt-sm:mr-2" />
          {{ data.uses }}
        </div>
        <div class="item flex flex-items-center text-12 text-[#9B9B9B]">
          <TheIcon icon="love" type="custom" class="mr-4 lt-sm:mr-2" />
          {{ data.upvotes }}
        </div>
        <div class="item flex items-center text-12 text-[#9B9B9B]">
          <img :src="data?.User?.image" class="h-14 w-14 flex-shrink-0 b-rd-50%" />
          <span class="ellipsis1 ml-4 w-40 text-12 font-700 text-#9B9B9B lt-sm:ml-2">
            {{ data?.User?.name }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="data?.Tag[0]?.name"
      class="tag absolute right-10 top-10 h-18 b-rd-4 bg-[#FF7C81] px-8 text-center text-12 lh-18 text-#fff"
    >
      {{ data?.Tag[0]?.name }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardItemData: {
    type: Object,
    default: () => {},
  },
})
const data = computed(() => {
  return props.cardItemData
})
const getUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  return import.meta.env.VITE_BASE_API + url
}
const iconList = ref(['fire', 'play', 'love'])
</script>

<style lang="scss" scoped>
.card {
  transition: all 0.3s;

  &:hover {
    background-color: rgb(82 82 91);
  }
}
</style>
