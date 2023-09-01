<template>
  <div class="list w-full flex-1 overflow-y-auto pl-13 pr-27 lt-sm:px-6">
    <div
      v-for="item in list"
      :key="item.id"
      class="mt-18 h-83 w-full flex items-center gap-7 lt-sm:mt-9"
    >
      <div class="h-full flex-1 overflow-hidden b-rd-10 bg-#1B1B1B80">
        <div
          class="h-39 w-full bg-#1B1B1B px-23 text-15 font-700 line-height-39 text-#fff lt-sm:px-8 lt-sm:text-13"
        >
          {{ item.title }}
        </div>
        <div
          class="h-44 w-full flex items-center justify-between px-26 text-12 text-#fff lt-sm:px-8"
        >
          <div class="flex items-center">
            <img :src="getUrl(item?.user?.image)" class="h-22 w-22 flex-shrink-0 b-rd-50%" alt="" />
            <span ml-9 text-12 class="lt-sm:ml-4">Wangyufeng</span>
          </div>
          <div class="cursor-pointer">in{{ item.category }}</div>
          <div>{{ item?.commentCount }} 回复</div>
          <div>{{ getDate(item?.createdAt) }}前</div>
        </div>
      </div>
      <div
        :class="item.isupvotes ? 'pointActive' : ''"
        class="h-full w-69 flex flex-col flex-shrink-0 cursor-pointer items-center justify-center b-rd-10 bg-#1B1B1B lt-sm:w-52 hover:bg-#c5191f"
        @click="handelUpvotes(item.id)"
      >
        <TheIcon icon="point" type="custom" size="24" class="mr-6 lt-sm:mr-3" />
        <span class="mt-8 text-13 font-700 line-height-18 text-#fff">{{ item?.upvotes }}</span>
      </div>
    </div>
    <p class="hint mt-50 text-center text-16 lt-sm:mt-25">
      {{ discussionList.length ? '已展示所有讨论主题' : '未找到讨论主题' }}
    </p>
  </div>
</template>

<script setup name="discussionsBox">
import { getUrl } from '~/src/utils'
import dayjs from 'dayjs'
import api from '@/api'

const props = defineProps({
  discussionList: { type: Array, default: () => [] },
})

const emits = defineEmits(['handelFilter'])

const _list = props?.discussionList.map((i) => {
  return { ...i, isupvotes: false }
})

const list = ref(_list)

const getDate = (date) => {
  const now = new Date()
  const year = dayjs(now).diff(date, 'year')
  const month = dayjs(now).diff(date, 'month')
  const day = dayjs(now).diff(date, 'day')
  const Hour = dayjs(now).diff(date, 'hour')
  const minute = dayjs(now).diff(date, 'minute')
  const second = dayjs(now).diff(date, 'second')
  console.log('dayjs(now).diff(date', dayjs(now).diff(date, 'day'))
  if (year > 0) {
    return year + '年'
  }
  if (month > 0) {
    return month + '月'
  }
  if (day > 0) {
    return day + '天'
  }
  if (Hour > 0) {
    return Hour + '小时'
  }
  if (minute > 0) {
    return minute + '分钟'
  }
  return second + '秒'
}

const handelUpvotes = async (id) => {
  await api.discussionUpvote({ 0: { json: id } })
  const newList = list.value.map((i) => {
    if (i.id === id) {
      return { ...i, upvotes: i.isupvotes ? i.upvotes - 1 : i.upvotes + 1, isupvotes: !i.upvotes }
    }
    return { ...i }
  })
  list.value = newList
}
</script>

<style lang="scss" scoped>
.pointActive {
  background-color: #c5191f;
}
</style>
