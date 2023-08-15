<template>
  <AppPage :show-footer="true">
    <div flex-1>
      <Header />
      <div class="mt-30 w-full flex flex-wrap flex-items-center px-50 lt-sm:mt-20 lt-sm:px-20">
        <div
          v-for="(item, index) in tagList"
          :key="index"
          class="item ml-7 mt-7 cursor-pointer border-1 border-#434343 b-rd-30 border-solid bg-#434343 px-18 py-10 text-16 text-#CACACA lt-sm:px-9 lt-sm:py-5 lt-sm:text-14"
          :class="index === activeTag ? 'active' : ''"
          @click="activeTag = index"
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
          :class="index === activeScreen ? 'active' : ''"
          class="screenItem ml-8 mt-9 flex cursor-pointer justify-center flex-items-center b-rd-8 bg-#000000 px-20 py-9 text-16 text-#CACACA lt-sm:ml-4 hover:bg-#C5191F lt-sm:px-10 lt-sm:py-4 lt-sm:text-14 hover:text-#fff"
          @click="activeScreen = index"
        >
          <TheIcon :icon="item.icon" type="custom" class="mr-9 lt-sm:mr-4" />
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="chatList mt-39 w-full px-50 lt-sm:mt-20 lt-sm:px-20">
        <n-grid cols="2 s:3 m:4 l:4 xl:4 2xl:5" :x-gap="16" :y-gap="12" responsive="screen">
          <n-grid-item v-for="item in 20">
            <card-item />
          </n-grid-item>
        </n-grid>
        <empty v-if="false" />
      </div>
    </div>
    <selectModal ref="selectModalref" />
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import Header from './components/header.vue'
import cardItem from './components/cardItem.vue'
import empty from './components/empty.vue'
import selectModal from './components/selectModal.vue'

const userStore = useUserStore()
const activeTag = ref(0)
const selectModalref = ref(null)
const activeScreen = ref(0)

const tagList = ref([
  'stableDiffusion',
  '头脑',
  '风暴',
  '约会',
  '风暴',
  '约会',
  '风暴',
  '约会',
  '风暴',
  '约会',
  '风暴',
  '约会',
])
const screenList = ref([
  { title: '趋势 Prompt', icon: 'trend' },
  { title: '最受欢迎', icon: 'popular' },
  { title: '最多喜欢', icon: 'like' },
  { title: '最多收藏', icon: 'collect' },
  { title: '最新', icon: 'new' },
])
const add = () => {
  selectModalref.value.show()
}
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
