<template>
  <AppPage>
    <div h-full w-full>
      <div v-if="loading" class="wh-full flex items-center justify-center">
        <Loading />
      </div>
      <div
        v-else
        class="h-98% flex flex-items-start overflow-hidden px-39 pt-40 lt-sm:h-full lt-sm:flex-wrap lt-sm:overflow-y-auto lt-sm:px-10 lt-sm:pt-12"
      >
        <div class="h-full flex-1 b-rd-10 bg-#25262B66 pb-20 lt-sm:h-auto">
          <div wh-full class="discussionsBox flex flex-col">
            <div
              class="h-72 w-full flex items-center justify-between bg-#1A1B1EB2 px-13 lt-sm:h-50 lt-sm:px-5"
              style="border-radius: 10px 10px 0 0"
            >
              <div
                class="h-42 w-142 flex flex-shrink-0 flex-nowrap cursor-pointer items-center justify-center b-rd-10 bg-#1B1B1B text-15 text-#fff lt-sm:h-38 lt-sm:w-110 lt-sm:text-12"
                @click="$router.push('/discussions/create')"
              >
                <TheIcon icon="addFull" type="custom" size="15" class="mr-6 lt-sm:mr-3" />
                创建新的讨论
              </div>
              <div class="flex items-center filter">
                <n-button
                  type="primary"
                  class="btn mr-15 b-rd-10 text-#fff lt-sm:mr-5 hover:text-#000"
                  :size="largerThanSm ? 'large' : 'medium'"
                  :class="selectIndex === 0 ? 'active' : ''"
                  @click="handelClick(0, 'new')"
                >
                  最新
                </n-button>
                <n-button
                  type="primary"
                  class="btn mr-15 b-rd-10 text-#fff lt-sm:mr-5 hover:text-#000"
                  :size="largerThanSm ? 'large' : 'medium'"
                  :class="selectIndex === 1 ? 'active' : ''"
                  @click="handelClick(1, 'upvotes')"
                >
                  热门
                </n-button>
                <n-select
                  v-model:value="selectVal"
                  :size="largerThanSm ? 'large' : 'medium'"
                  :options="options"
                  class="w-102 flex-shrink-0 b-rd-10 bg-#1B1B1B lt-sm:w-80"
                  @update:value="fetchData(slotVal, selectVal)"
                />
              </div>
            </div>
            <discussions-box :discussion-list="discussionList" @handelFilter="handelFilter" />
          </div>
        </div>
        <div
          class="ml-34 h-full w-30% overflow-y-auto pb-15 lt-sm:ml-0 lt-sm:mt-10 lt-sm:h-auto lt-sm:w-full"
        >
          <div class="row1 w-full overflow-hidden b-rd-10 bg-#2C2E3399 pb-15">
            <cardTitle :title="{ text: '主题分类', icon: 'ztfl' }" />
            <div class="content mt-7 px-19 lt-sm:px-8">
              <div
                v-for="(item, index) in tagList1"
                :key="index"
                class="item ellipsis1 h-54 w-full flex cursor-pointer items-center"
                style="border-bottom: 1px solid #ffffff21"
                @click="goTo(item.slug)"
              >
                {{ index + 1 }}&emsp;{{ item.name }}
              </div>
            </div>
          </div>
          <div class="row1 mt-16 w-full overflow-hidden b-rd-10 bg-#2C2E3399">
            <cardTitle :title="{ text: '角色', icon: 'role' }" />
            <div class="content mt-7 px-19 lt-sm:px-8">
              <div
                v-for="(item, index) in tagList2"
                :key="index"
                class="item ellipsis1 h-54 w-full flex cursor-pointer items-center"
                style="border-bottom: 1px solid #ffffff21"
                @click="goTo(item.slug)"
              >
                {{ index + 1 }}&emsp;{{ item.name }}
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
import cardTitle from './components/cardTitle.vue'
import Loading from '@/components/common/Loading/index.vue'
import DiscussionsBox from './components/discussionsBox.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)

const loading = ref(true)
const tagList1 = ref([])
const tagList2 = ref([])
const discussionList = ref([])
const selectIndex = ref(0)

const slotVal = ref('new')
const selectVal = ref('Year')
const largerThanSm = breakpoints.greater('sm') // only larger than sm
const options = ref([
  {
    label: '所以',
    value: 'Year',
  },
  {
    label: '天',
    value: 'day',
  },
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
  {
    label: '年',
    value: 'year',
  },
])

const fetchData = async (sort, time) => {
  loading.value = true
  const params = {
    0: { json: 10 },
    1: { json: null, meta: { values: ['undefined'] } },
    2: {
      json: { category: route.query.category, sort: sort, time },
      meta: { values: { category: ['undefined'] } },
    },
  }
  try {
    const res = await api.getDiscussionsTags({ input: JSON.stringify(params) })
    loading.value = false
    if (res && res.length) {
      try {
        sessionStorage.setItem('selectTag', JSON.stringify(res[1]?.result?.data?.json))
      } catch (error) {
        sessionStorage.setItem('selectTag', JSON.stringify([]))
      }
      tagList1.value = res[1]?.result?.data?.json.filter((i) => i.type === 'roles')
      tagList2.value = res[1]?.result?.data?.json.filter((i) => i.type === 'topics')
      discussionList.value = res[2]?.result?.data?.json
    }
  } catch (error) {
    console.log('error:', error)
    loading.value = false
  }
}

const handelFilter = (val) => {
  fetchData(val.sort, val.time)
}

const handelClick = (index, type) => {
  console.log('type:', type)
  slotVal.value = type
  selectIndex.value = index
  fetchData(type, selectVal.value)
}

const goTo = (category) => {
  router.push({
    path: '/discussions',
    query: { category },
  })
}

onMounted(() => {
  fetchData('new', 'Year')
})
</script>

<style lang="scss" scoped>
.btn {
  &.active {
    background-color: #fff !important;
    color: #000 !important;
  }

  &:hover {
    background-color: #fff;
  }

  &:focus {
    background-color: auto;
    color: auto !important;
  }
}

:deep(.n-base-selection-label) {
  background-color: #1b1b1b;
  color: #fff;
  border-radius: 10px;
  color: #fff;
}
</style>
