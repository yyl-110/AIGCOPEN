<template>
  <AppPage :show-footer="true">
    <div flex-1>
      <Header :search-value="searchValue" @updateValue="updateValue" />
      <div class="mt-30 w-full flex flex-wrap flex-items-center px-50 lt-sm:mt-20 lt-sm:px-20">
        <div
          v-for="(item, index) in tagList.slice(0, 9)"
          :key="index"
          :class="activeTag === item ? 'active' : ''"
          class="item ml-7 mt-7 cursor-pointer border-1 border-#434343 b-rd-30 border-solid bg-#434343 px-18 py-10 text-16 text-#CACACA lt-sm:px-9 lt-sm:py-5 lt-sm:text-14"
          @click="getTag(item)"
        >
          {{ item }}
        </div>
        <icon-custom-add class="ml-6 mt-7 cursor-pointer" @click="add"></icon-custom-add>
      </div>
      <!-- filter -->
      <div class="mt-18 flex flex-wrap px-50 filter lt-sm:mt-10 lt-sm:px-20">
        <div
          v-for="(item, index) in screenList"
          :key="index"
          :class="item.type === activeScreen ? 'active' : ''"
          class="screenItem ml-8 mt-9 flex cursor-pointer justify-center flex-items-center b-rd-8 bg-#000000 px-20 py-9 text-16 text-#CACACA lt-sm:ml-4 hover:bg-#C5191F lt-sm:px-10 lt-sm:py-4 lt-sm:text-14 hover:text-#fff"
          @click="getFilter(item)"
        >
          <TheIcon :icon="item.icon" type="custom" class="mr-9 lt-sm:mr-4" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="chatList mt-39 w-full px-50 lt-sm:mt-20 lt-sm:px-20">
        <n-grid cols="2 s:3 m:4 l:4 xl:4 2xl:5" :x-gap="16" :y-gap="12" responsive="screen">
          <n-grid-item v-for="item in cardList" :key="item.id">
            <card-item :card-item-data="item" @click="goPrompt(item.id)" />
          </n-grid-item>
        </n-grid>
        <div v-if="loading" class="mt-20 text-center text-#fff">
          <Loading />
        </div>
        <empty v-if="finish && cardList.length === 0" />
      </div>
    </div>
    <selectModal ref="selectModalref" :select-data="selectModalData" @handleSave="handleSave" />
    <chatModal ref="chatModalref" />
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import Header from './components/header.vue'
import cardItem from './components/cardItem.vue'
import empty from './components/empty.vue'
import selectModal from './components/selectModal.vue'
import chatModal from '@/components/common/ChatModal/ChatModal.vue'
import { useRoute, useRouter } from 'vue-router'
import Loading from '@/components/common/Loading/index.vue'
import api from '@/api'
const route = useRoute()
const router = useRouter()

const searchValue = ref(route.query.q ? route.query.q : '')
const sort = ref(route.query.sort ? route.query.sort : '')
const tag = ref(route.query.tag ? route.query.tag : '')
const rankType = ref()
const userStore = useUserStore()
const activeTag = ref(route.query.tag || '')
console.log('activeTag:', activeTag.value)
const selectModalref = ref(null)
const chatModalref = ref(null)
const screenList = ref([
  { title: '趋势 Prompt', icon: 'trend', type: 'trending' },
  { title: '最受欢迎', icon: 'popular', type: 'most-popular' },
  { title: '最多喜欢', icon: 'like', type: 'most-liked' },
  { title: '最多收藏', icon: 'collect', type: 'most-saved' },
  { title: '最新', icon: 'new', type: 'new' },
])
const activeScreen = ref(route.query.sort || '')
const pages = ref(1)
const loading = ref(false) // 是否正在加载
const finish = ref(false)
const loadMore = ref(true)
const pageSize = ref(36)

const tagList = ref([])
const selectModalData = ref([])
const cardList = ref([])
const add = () => {
  selectModalref.value.show()
}

const fetchData = async () => {
  const tagParams = {
    0: { json: 10 },
    1: { json: null, meta: { values: ['undefined'] } },
    2: {
      json: { tag: null, sort: null, 1: null, language: 'all' },
      meta: { values: { tag: ['undefined'], sort: ['undefined'], q: ['undefined'] } },
    },
    3: {
      json: { skip: pageSize.value, tag: null, sort: null, q: null, language: 'all' },
      meta: { values: { tag: ['undefined'], sort: ['undefined'], q: ['undefined'] } },
    },
  }
  const res = await api.getTag({
    batch: 1,
    input: JSON.stringify(tagParams),
  })
  if (res && res.length) {
    // if (!sort.value && !searchValue.value && !tag.value) {
    //   cardList.value = res[2]?.result?.data?.json
    // }
    if (userStore.interests) {
      let selectVal = userStore.interests
      selectVal = selectVal.split(' ').reverse()
      tagList.value = selectVal
    } else {
      tagList.value = res[1]?.result?.data?.json
    }
    selectModalData.value = res[0]?.result?.data?.json.map((i) => {
      return { ...i, select: tagList.value.includes(i.name) }
    })
  }
}
const handleGetPrompts = async () => {
  if (loading.value) return
  loading.value = true // 开始加载数据
  const _api = pageSize.value * pages.value > pageSize.value ? api.getPrompts2 : api.getPrompts
  const params = {
    0: {
      json: {
        skip: pages.value * pageSize.value > pageSize.value ? pages.value * pageSize.value : null,
        tag: tag.value,
        sort: sort.value,
        q: searchValue.value,
        language: 'all',
      },
    },
    1: {
      json: {
        skip: pages.value * pageSize.value === 36 ? pages.value * pageSize.value : null,
        tag: tag.value,
        sort: sort.value,
        q: searchValue.value,
        language: 'all',
      },
    },
    2: {
      json: {
        tag: tag.value,
        sort: sort.value,
        query: searchValue.value,
        language: 'all',
      },
    },
  }
  try {
    const res = await _api({
      input: JSON.stringify(params),
    })
    try {
      if (res[0]?.result?.data?.json.length < pageSize.value) {
        loadMore.value = false
      }
    } catch (error) {
      console.log('error:', error)
    }
    cardList.value = [...cardList.value, ...res[0]?.result?.data?.json]
    finish.value = true
    pages.value = pages.value + 1
    loading.value = false // 加载完成
  } catch (error) {
    loading.value = false
  }
}
/* 保存 */
const handleSave = async (list) => {
  const params = {
    0: {
      json: {
        userId: userStore.userId,
        userInterests: list
          .filter((i) => i.select)
          .map((i) => i.name)
          .join(' '),
        userLanguage: 'all',
      },
    },
  }

  const res = await api.updateUserOnboarding(params)
  if (res && res.length) {
    useUserStore().updateInterests(res[0]?.result?.data?.json?.interests)
  }
  selectModalref.value.hide()
  fetchData()
}

const handleScroll = () => {
  // 监听滚动事件
  const container = document.querySelector('.cus-scroll-y') // 获取滚动容器
  const { scrollTop, scrollHeight, clientHeight } = container // 获取滚动高度和内容高度
  if (scrollTop + clientHeight >= scrollHeight - 100 && !loading.value) {
    if (!loadMore.value || loading.value) {
      return
    }
    handleGetPrompts() // 滚动到底部，加载更多数据
  }
}

const getTag = (item) => {
  if (item === activeTag.value) {
    activeTag.value = ''
    router.push({
      path: '/',
      query: { sort: sort.value },
    })
    return
  }
  activeTag.value = item
  router.push({
    path: '/',
    query: { tag: item, sort: sort.value },
  })
}

const getFilter = (item) => {
  if (item.type === activeScreen.value) {
    activeScreen.value = ''
    router.push({
      path: '/',
      query: { tag: tag.value },
    })
    return
  }
  activeScreen.value = item.type
  router.push({
    path: '/',
    query: { sort: item.type, tag: tag.value },
  })
}

const updateValue = (val) => {
  pages.value = 1
  cardList.value = []
  finish.value = false
  loadMore.value = true
  searchValue.value = val
  handleGetPrompts()
}

/* prompt弹框 */
const goPrompt = (id) => {
  // router.push({ path: '/prompt', query: { promptId: id } })
  chatModalref.value.show({ id })
}

onMounted(() => {
  fetchData()
  handleGetPrompts()

  document.querySelector('.cus-scroll-y').addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  document.querySelector('.cus-scroll-y') &&
    document.querySelector('.cus-scroll-y').removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.screenItem {
  transition: all 0.3s;

  &.active {
    background-color: #c5191f;
    color: #fff;
  }

  &:first-child {
    margin-left: 0;
  }
}

.item {
  transition: all 0.3s;

  &.active {
    border-color: rgba(255, 255, 255, 0.22);
    background: #000000;
    color: #fff;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.22);
    background: #000000;
    color: #fff;
  }

  &:first-child {
    margin-left: 0;
  }
}
</style>
