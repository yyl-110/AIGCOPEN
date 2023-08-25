<template>
  <div class="px-24 pb-10 pt-29 lt-lg:p-10" style="border-bottom: 1px solid #363636">
    <div class="chatInfo flex">
      <img :src="getUrl(promptData.thumbnailURL)" class="h-66 w-66 flex-shrink-0 b-rd-10" alt="" />
      <div class="ml-14 flex flex-col lt-lg:ml-7">
        <span class="text-15">{{ promptData.title }}</span>
        <div class="flex flex-nowrap items-center text-13">
          {{ promptData.updatedAt }}|{{ promptData.uses }}使用|
          <img
            src="@/assets/images/chatgpt.png"
            class="mr-4 h-16 w-16 flex-shrink-0 b-rd-50%"
            alt=""
          />
          {{ promptData.model }}
        </div>
        <div class="flex items-center text-13">
          <img
            :src="getUrl(promptData.User.image)"
            class="mr-4 h-18 w-18 flex-shrink-0 b-rd-50%"
            alt=""
          />
          {{ promptData.User.name }}
        </div>
      </div>
    </div>
    <div class="options mt-20 flex justify-between gap-8 text-#fff lt-lg:mt-10">
      <n-button class="btn flex-1 b-rd-10 bg-#3C3C3C3D">
        <TheIcon icon="like" color="#fff" type="custom" class="mr-4" />
        {{ promptData.upvotes }}
      </n-button>
      <n-button class="btn b-rd-10 bg-#3C3C3C3D" flex-1>
        <TheIcon icon="star" color="#fff" type="custom" class="mr-4" />
        {{ promptData.saves }}
      </n-button>
      <n-button class="btn b-rd-10 bg-#3C3C3C3D" flex-1>
        <TheIcon icon="share1" color="#fff" type="custom" class="mr-4" />
        分享
      </n-button>
      <n-button class="btn b-rd-10 bg-#3C3C3C3D" flex-1>
        <TheIcon icon="tip" color="#fff" type="custom" class="mr-4" />
        Tips
      </n-button>
    </div>
  </div>
  <div
    class="lt-lgpx-10 mt-24 b-rd-10 px-20 pb-27 lt-lg:mt-12 lt-lg:pb-13"
    style="border-bottom: 1px solid #363636"
  >
    <div
      class="box h-167 w-full flex flex-col justify-between b-rd-10 bg-#1B1B1B70 p-20 text-14 text-#fff lt-lg:h-auto lt-lg:p-10 lt-lg:text-14"
    >
      <span>{{ promptData.description }}</span>
      <n-space class="lt-lg:mt-20">
        <n-tag
          v-for="item in promptData.Tag"
          :key="item.id"
          type="primary"
          class="b-rd-6 bg-#9B9B9B47 text-#fff"
        >
          {{ item.name }}
        </n-tag>
      </n-space>
    </div>
  </div>
  <div class="coment px-20 lt-lg:px-10">
    <div class="h-60 flex items-center justify-between">
      <span class="text-20 font-700">评论</span>
      <n-select
        v-model:value="selectVal"
        placeholder="排序方式"
        :options="options"
        class="w-120 flex-shrink-0 b-rd-10 bg-#1B1B1B text-#fff lt-sm:w-80"
      />
    </div>
    <n-input
      v-model:value="commontVal"
      type="textarea"
      :autosize="{
        minRows: 3,
        maxRows: 3,
      }"
      placeholder="在这里输入你的评论..."
      class="w-full"
    />
    <n-button
      class="btn1 mt-14 w-110 b-rd-8 border-none bg-#9B9B9B33 text-#fff"
      @click="handelAdd()"
    >
      评论
    </n-button>
    <div class="box mt-20">
      <div v-for="item in commentList" :key="item.id" class="item mb-20 flex">
        <img :src="getUrl(item.user.image)" class="mr-12 h-40 w-40 flex-shrink-0 b-rd-50%" alt="" />
        <div class="w-full">
          <div class="jusitfy-center flex flex-col flex-row items-center md:content-center">
            <div class="mr-8">{{ item.user.name }}</div>
            <div class="w-fit pb-0 text-gray-600">{{ getDate(item.createdAt) }} 前</div>
          </div>
          <div>
            <div class="comment-text text-md w-full break-all py-3 text-lg line-height-40">
              {{ item.body }}
            </div>
          </div>
          <div class="mt-1 flex gap-6 text-xs font-bold text-gray-500">
            <div
              :class="upvoteList.includes(item.id) ? 'text-#3b82f6' : ''"
              class="cursor-pointer"
              @click="handelUpvoteComment(item.id)"
            >
              点赞
              <span>{{ getUpvotes(item.upvotes, item.id) }}</span>
            </div>
            <div class="cursor-pointer">回复</div>
            <div v-if="item.user.id === userInfo.userId" class="cursor-pointer">编辑</div>
            <div v-if="item.user.id === userInfo.userId" class="cursor-pointer">删除</div>
          </div>
          <template v-if="item.child">
            <div v-for="val in item.child" :key="val.id" class="item my-20 flex">
              <img
                :src="getUrl(val.user.image)"
                class="mr-12 h-40 w-40 flex-shrink-0 b-rd-50%"
                alt=""
              />
              <div class="w-full">
                <div class="jusitfy-center flex flex-col flex-row items-center md:content-center">
                  <div class="mr-8">{{ val.user.name }}</div>
                  <div class="w-fit pb-0 text-gray-600">{{ getDate(val.createdAt) }} 前</div>
                </div>
                <div>
                  <div class="comment-text text-md w-full break-all py-3 text-lg line-height-40">
                    {{ val.body }}
                  </div>
                </div>
                <div class="mt-1 flex gap-10 text-xs font-bold text-gray-500">
                  <div
                    :class="upvoteList.includes(val.id) ? 'text-#3b82f6' : ''"
                    class="cursor-pointer"
                    @click="handelUpvoteComment(val.id)"
                  >
                    点赞
                    <span>
                      {{ getUpvotes(val.upvotes, val.id) }}
                    </span>
                  </div>
                  <div class="cursor-pointer">回复</div>
                  <div v-if="val.user.id === userInfo.userId" class="cursor-pointer">编辑</div>
                  <div v-if="val.user.id === userInfo.userId" class="cursor-pointer">删除</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="text-center text-14 text-#fff">您已看到所有评论！</div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import api from '@/api/index'
import { useUserStore } from '~/src/store'
const userInfo = useUserStore()
const props = defineProps({
  promptData: {
    type: Object,
    default: () => {},
  },
  promptId: {
    type: String,
    default: () => {},
  },
})
const selectVal = ref(null)
const commontVal = ref('')
const commentList = ref([])
const upvoteList = ref([]) // 本地存点赞列表
const options = ref([
  {
    label: '热门评论',
    value: 0,
  },
  {
    label: '最新的',
    value: 1,
  },
])
const fetchData = async () => {
  const params = { 0: { json: props.promptId } }
  const res = await api.getCommentList({ input: JSON.stringify(params) })
  if (res && res.length) {
    const list = res[0]?.result?.data?.json.reverse()
    const childList = list.filter((i) => i.parentId)
    const parentList = list.filter((i) => !i.parentId)
    const lastlist = parentList.map((i) => {
      const l = childList.filter((val) => val.parentId === i.id)
      if (l.length) {
        return { ...i, child: l }
      }
      return i
    })
    commentList.value = lastlist
  }
}
const getUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  return import.meta.env.VITE_BASE_API + url
}
/* 评论 */
const handelAdd = async (parentId = null) => {
  if (!commontVal.value) {
    $message.warning('请填写评论！')
    return
  }
  const params = {
    0: {
      json: {
        text: commontVal.value,
        parentId: parentId,
        userId: userInfo.userId,
        promptId: props.promptId,
      },
      meta: { values: { parentId: ['undefined'] } },
    },
  }

  const res = await api.addComment(params)
  if (res && res.length) {
    $message.success('评论成功！')
    commontVal.value = ''
    fetchData()
  }
}
/* 点赞 */
const handelUpvoteComment = async (id) => {
  const params = { 0: { json: { commentId: id, userId: userInfo.userId } } }

  const res = await api.upvoteComment(params)
  if (res && res.length && res[0]?.result?.data?.json) {
    const list = upvoteList.value
    if (list.some((i) => i === id)) {
      upvoteList.value = list.filter((i) => i !== id)
    } else {
      list.push(id)
      upvoteList.value = list
    }
  }
}
const getUpvotes = (upvotes, id) => {
  if (upvoteList.value.includes(id)) {
    return `(${upvotes + 1})`
  }
  return upvotes ? `(${upvotes})` : ''
}
const getDate = (date) => {
  const now = new Date()
  const day = dayjs(now).diff(date, 'day')
  const Hour = dayjs(now).diff(date, 'hour')
  const minute = dayjs(now).diff(date, 'minute')
  const second = dayjs(now).diff(date, 'second')
  console.log('dayjs(now).diff(date', dayjs(now).diff(date, 'day'))
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
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
:deep(.n-base-selection-label) {
  background-color: #1b1b1b;
  color: #fff;
  border-radius: 10px;
}

:deep(.n-base-selection-placeholder) {
  color: #fff;
}

.btn {
  &:hover {
    background-color: #3c3c3c3d;
    color: #fff;
  }

  &:focus {
    background-color: #3c3c3c3d;
    color: #fff;
  }
}

.btn1 {
  &:hover {
    background-color: #9b9b9b33;
    color: #fff;
  }

  &:focus {
    background-color: #9b9b9b33;
    color: #fff;
  }
}
</style>
