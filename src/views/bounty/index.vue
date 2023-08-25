<template>
  <AppPage>
    <div class="wh-full flex flex-col p-39 text-#fff lt-sm:p-15">
      <div class="pic w-full">
        <n-carousel autoplay :show-dots="false">
          <img src="@/assets/images/banner.png" class="h-230 w-full b-rd-10" alt="" />
        </n-carousel>
      </div>
      <div class="mt-25 w-full b-rd-10 bg-#25262B66 pb-20 pt-29 lt-sm:mt-10">
        <n-button
          type="primary"
          size="large"
          :class="select ? 'active' : ''"
          class="btn w-150 b-rd-10 bg-#000000 text-#fff"
          @click="changeSelect"
        >
          HACKATHON S1
        </n-button>
        <div class="list mt-23 flex overflow-x-auto lt-sm:mt-10">
          <div v-if="loading" class="wh-full">
            <Loading />
          </div>
          <div
            v-for="item in list"
            :key="item.id"
            class="card relative ml-35 w-352 flex-shrink-0 b-rd-10"
          >
            <img :src="getUrl(item.coverUrl)" class="h-197 w-full b-rd-10" alt="" />
            <div
              class="tag absolute right-0 top-112 h-28 w-70 flex items-center justify-center bg-#C5191F text-13 text-#fff"
              style="border-radius: 4px 0 0 4px"
            >
              还剩18天
            </div>
            <div
              class="info relative z-100 mt--45 h-147 px-20 pt-15 lt-sm:px-10 lt-sm:pt-6"
              style="border-radius: 0 0 10px 10px; background-color: rgba(27, 27, 27, 0.8)"
            >
              <div class="top pb-14 lt-sm:pb" style="border-bottom: 1px solid #ffffff29">
                <h2 class="text-20 font-700 lt-sm:text-14">{{ item.title }}</h2>
                <p class="ellipsis1 mt-12 text-14 lt-sm:mt-6 lt-sm:text-12">{{ item.tagline }}</p>
              </div>
              <div class="flex justify-between pt-6">
                <span class="text-24 font-700 text-#fff lt-sm:text-18">¥{{ item.bounty }}</span>
                <div class="flex flex flex-row-reverse items-center justify-end">
                  <img
                    v-for="val in item.BountyPrompt"
                    :key="val.id"
                    :src="getUrl(val?.Prompt?.User?.image)"
                    class="img h-24 w-24 b-rd-50%"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import api from '~/src/api'
import Loading from '@/components/common/Loading/index.vue'
const select = ref(false)

const loading = ref(true)
const list = ref({})

const changeSelect = () => {
  select.value = !select.value
  list.value = []
  fetchData()
}

const getUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  return import.meta.env.VITE_BASE_API + url
}

const fetchData = async () => {
  loading.value = true
  const params = {
    0: { json: 10 },
    1: { json: { tag: select ? 'HACKATHON S1' : 'Hackathon S2' } },
    2: { json: null, meta: { values: ['undefined'] } },
  }
  const res = await api.getBountyList({ input: JSON.stringify(params) })
  loading.value = false
  if (res && res.length) {
    list.value = res[1]?.result?.data?.json
  }
  console.log('res:', res)
}
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.img {
  &:not(:first-child) {
    margin-right: -12px;
  }
}

.list {
  &::-webkit-scrollbar {
    height: 5px;
  }
}

.btn {
  &.active {
    background-color: #808080 !important;
  }

  &:hover {
    background: #000;
    color: #fff;
  }

  &:focus {
    color: #fff;
    background: #000;
  }
}
</style>
