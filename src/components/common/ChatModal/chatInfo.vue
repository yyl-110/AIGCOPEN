<template>
  <div class="px-24 pb-10 pt-29 lt-lg:p-10" style="border-bottom: 1px solid #363636">
    <div class="chatInfo flex">
      <img :src="getUrl(promptData.thumbnailURL)" class="h-66 w-66 flex-shrink-0 b-rd-10" />
      <div class="ml-14 flex flex-col lt-lg:ml-7">
        <span class="text-15">{{ promptData.title }}</span>
        <div class="flex flex-nowrap items-center text-13">
          {{ formatDate }}&nbsp;{{ promptData.uses }}使用 &nbsp;
          <img src="@/assets/images/chatgpt.png" class="mr-4 h-16 w-16 flex-shrink-0 b-rd-50%" />
          {{ promptData.model }}
        </div>
        <div class="flex items-center text-13">
          <img :src="getUrl(promptData.User.image)" class="mr-4 h-18 w-18 flex-shrink-0 b-rd-50%"
            v-if="getUrl(promptData.User.image)" />
          <div class="avatar bg-#a0aec0 w-18 h-18 b-rd-50% flex-shrink-0 flex items-center justify-center mr-4" v-else>
            <TheIcon icon="d-avatar" color="#fff" size="18" type="custom" />
          </div>
          {{ promptData.User.name }}
        </div>
      </div>
    </div>
    <div class="options mt-20 flex justify-between gap-8 text-#fff lt-lg:mt-10">
      <n-button class="btn flex-1 cursor-pointer b-rd-10 bg-#3C3C3C3D" @click="handelUpvotePrompt">
        <TheIcon v-if="!upvotepromptStatus" icon="like" color="#fff" type="custom" class="mr-4" />
        <TheIcon v-else icon="like_o" color="red" type="custom" class="mr-4" />
        {{ promptUpvotesNum }}
      </n-button>
      <n-button class="btn cursor-pointer b-rd-10 bg-#3C3C3C3D" flex-1 @click="handelSavePrompt">
        <TheIcon v-if="!promptSaveStatus" class="mr-4" icon="star" color="#fff" type="custom" size="16" />
        <TheIcon v-else icon="star_o" color="rgb(251,191,36)" type="custom" size="16" class="mr-4" />
        {{ promptSaveNum }}
      </n-button>
      <n-button class="btn cursor-pointer b-rd-10 bg-#3C3C3C3D" flex-1 @click="showModal = true">
        <TheIcon icon="share1" color="#fff" type="custom" class="mr-4" />
        分享
      </n-button>
      <n-button class="btn b-rd-10 bg-#3C3C3C3D" flex-1>
        <TheIcon icon="tip" color="#fff" type="custom" class="mr-4" />
        Tips
      </n-button>
    </div>
  </div>
  <div class="lt-lgpx-10 mt-24 b-rd-10 px-20 pb-27 lt-lg:mt-12 lt-lg:pb-13" style="border-bottom: 1px solid #363636">
    <div
      class="box min-h-167 w-full flex flex-col justify-between b-rd-10 bg-#1B1B1B70 p-20 text-14 text-#fff lt-lg:h-auto lt-lg:p-10 lt-lg:text-14">
      <span>{{ promptData.description }}</span>
      <n-space class="mt-20 lt-lg:mt-20">
        <n-tag v-for="item in promptData.Tag" :key="item.id" type="primary" class="b-rd-6 bg-#9B9B9B47 text-#fff">
          {{ item.name }}
        </n-tag>
      </n-space>
    </div>
  </div>
  <div class="display-none w-full py-10 text-center lt-sm:display-block cursor-pointer"
    @click="showCommont = !showCommont">{{ showCommont ? '隐藏' : '显示' }}评论</div>
  <div class="coment px-20 lt-lg:px-10" v-if="largerThanSm || (showCommont && !largerThanSm)">
    <div class="h-60 flex items-center justify-between">
      <span class="text-20 font-700">评论</span>
      <n-select v-model:value="selectVal" placeholder="排序方式" :options="options"
        class="w-120 flex-shrink-0 b-rd-10 bg-#1B1B1B text-#fff lt-sm:w-80" />
    </div>
    <n-input v-model:value="commontVal" type="textarea" :autosize="{
      minRows: 3,
      maxRows: 3,
    }" placeholder="在这里输入你的评论..." class="w-full b-rd-8" />
    <n-button class="btn1 mt-14 w-110 b-rd-8 border-none bg-#9B9B9B33 text-#fff" @click="handelAdd()">
      评论
    </n-button>
    <div class="box mt-20">
      <div v-for="item in commentList" :key="item.id" class="item mb-20 flex">
        <img :src="getUrl(item.user.image)" class="mr-12 h-40 w-40 flex-shrink-0 b-rd-50%"
          v-if="getUrl(item.user.image)" />
        <div class="avatar bg-#a0aec0 w-40 h-40 b-rd-50% flex-shrink-0 flex items-center justify-center mr-12" v-else>
          <TheIcon icon="d-avatar" color="#fff" size="40" type="custom" />
        </div>
        <div class="w-full">
          <div class="jusitfy-center flex flex-col flex-row items-center md:content-center">
            <div class="mr-8">{{ item.user.name }}</div>
            <div class="w-fit pb-0 text-gray-600">{{ getDate(item.createdAt) }} 前</div>
          </div>
          <div>
            <div class="comment-text text-md w-full break-all py-3 text-18 line-height-40">
              {{ item.body }}
            </div>
          </div>
          <div class="mt-1 flex gap-6 text-xs font-bold text-gray-500">
            <div :class="upvoteList.includes(item.id) ? 'text-#3b82f6' : ''" class="cursor-pointer"
              @click="handelUpvoteComment(item.id)">
              点赞
              <span>{{ getUpvotes(item.upvotes, item.id) }}</span>
            </div>
            <div class="cursor-pointer" @click="handelReply(item)">回复</div>
            <div v-if="item.userId === userInfo.userId" class="cursor-pointer" @click="editCommont(item)">编辑</div>
            <div v-if="item.userId === userInfo.userId" class="cursor-pointer" @click="del(item.id)">
              删除
            </div>
          </div>
          <div class="mt-10 w-70%" v-if="inputId === item.id">
            <n-input v-model:value="replyVal" type="textarea" :autosize="{
              minRows: 2,
              maxRows: 3,
            }" placeholder="在这里输入你的评论..." class="w-full b-rd-8" />
            <div text-right mt-4>
              <n-button class="btn" @click="confirmReply(item, item.id)">{{ isEdit ? '编辑' : '回复' }}</n-button>
              <n-button class="btn ml-4" @click="inputId = 0">取消</n-button>
            </div>
          </div>
          <template v-if="item.child">
            <div v-for="val in item.child" :key="val.id" class="item my-20 flex">
              <img :src="getUrl(item.user.image)" class="mr-12 h-40 w-40 flex-shrink-0 b-rd-50%"
                v-if="getUrl(item.user.image)" />
              <div class="avatar bg-#a0aec0 w-40 h-40 b-rd-50% flex-shrink-0 flex items-center justify-center mr-12"
                v-else>
                <TheIcon icon="d-avatar" color="#fff" size="40" type="custom" />
              </div>
              <div class="w-full">
                <div class="jusitfy-center flex flex-col flex-row items-center md:content-center">
                  <div class="mr-8">{{ val.user.name }}</div>
                  <div class="w-fit pb-0 text-gray-600">{{ getDate(val.createdAt) }} 前</div>
                </div>
                <div>
                  <div class="comment-text text-md w-full break-all py-3 text-18 line-height-40">
                    {{ val.body }}
                  </div>
                </div>
                <div class="mt-1 flex gap-10 text-xs font-bold text-gray-500">
                  <div :class="upvoteList.includes(val.id) ? 'text-#3b82f6' : ''" class="cursor-pointer"
                    @click="handelUpvoteComment(val.id)">
                    点赞
                    <span>
                      {{ getUpvotes(val.upvotes, val.id) }}
                    </span>
                  </div>
                  <div class="cursor-pointer" @click="handelReply(val)">回复</div>
                  <div v-if="val.userId === userInfo.userId" class="cursor-pointer" @click="editCommont(val)">编辑</div>
                  <div v-if="val.userId === userInfo.userId" class="cursor-pointer" @click="del(val.id)">
                    删除
                  </div>
                </div>
                <div class="mt-10 w-70%" v-if="val.id === inputId">
                  <n-input v-model:value="replyVal" type="textarea" :autosize="{
                    minRows: 2,
                    maxRows: 3,
                  }" placeholder="在这里输入你的评论..." class="w-full b-rd-8" />
                  <div text-right mt-4>
                    <n-button class="btn" @click="confirmReply(val, item.id)">{{ isEdit ? '编辑' : '回复' }}</n-button>
                    <n-button class="btn ml-4" @click="inputId = 0">取消</n-button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="text-center text-14 text-#fff">您已看到所有评论！</div>
    </div>
    <n-modal v-model:show="showModal" class="h-200 w-500 b-rd-10 bg-#25262B px-10 lt-sm:mx-6 lt-sm:w-full">
      <div class="flex flex-col">
        <div class="header text-18 font-bold flex-shrink-0 py-10">分享链接</div>
        <div class="flex items-center flex-1">
          <n-input id="copy" :value="copyLink" type="text" class="w-full b-rd-8" size="large" />
          <n-button class="btn1 ml-10 w-80 b-rd-8 border-none bg-#9B9B9B33 text-#fff" size="large" @click="copyValue">
            复制
          </n-button>
        </div>

      </div>
    </n-modal>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import api from '@/api/index'
import { useUserStore } from '~/src/store'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// 导入插件
import useClipboard from 'vue-clipboard3'
const userInfo = useUserStore()
import { copy } from '~/src/utils'
const props = defineProps({
  promptData: {
    type: Object,
    default: () => { },
  },
  promptId: {
    type: String,
    default: () => { },
  },
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // only larger than sm

const promptUpvotesNum = ref(props.promptData?.upvotes || 0)
const promptSaveNum = ref(props.promptData?.saves || 0)
const selectVal = ref(null)
const commontVal = ref('')
const commentList = ref([])
const upvoteList = ref([]) // 本地存点赞列表
const upvotepromptStatus = ref(false)
const promptSaveStatus = ref(false)
const showModal = ref(false)
const showCommont = ref(false)
const inputId = ref(0)
const replyVal = ref('')
const isEdit = ref(false)
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

const formatDate = computed(() => {
  return dayjs(props?.promptData.createdAt).format('YYYY-MM-DD')
})

const copyLink = computed(() => {
  return `${location.origin}/prompt?promptId=${props.promptId}`
})
const copyValue = async () => {
  copy(copyLink.value)
  // try {
  //   await navigator.clipboard.writeText(copyLink.value)
  //   $message.success('复制成功')
  //   showModal.value = false
  // } catch (error) {
  //   console.log('error:', error)
  // }
}

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
    const upvotedData = await api.getUserUpvotedPrompt({
      input: JSON.stringify({
        0: { json: { promptId: props.promptId, userId: userInfo.userId } },
        1: { json: { promptId: props.promptId, userId: userInfo.userId } },
        2: { json: props.promptId },
      }),
    })
    if (
      upvotedData[1]?.result?.data?.json &&
      upvotedData[1]?.result?.data?.json?.userId === userInfo.userId
    ) {
      upvotepromptStatus.value = true
    } else {
      upvotepromptStatus.value = false
    }
    if (
      upvotedData[0]?.result?.data?.json &&
      upvotedData[0]?.result?.data?.json?.userId === userInfo.userId
    ) {
      promptSaveStatus.value = true
    } else {
      promptSaveStatus.value = false
    }
  }
}
const getUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  if (!url) {
    return ''
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

/* 编辑评论 */
const editCommont = async (item) => {
  replyVal.value = ''
  inputId.value = item.id

  replyVal.value = item.body
  isEdit.value = true
}

/* 回复评论 */
const handelReply = async (item) => {
  replyVal.value = ''
  inputId.value = item.id
  isEdit.value = false
}

const confirmReply = async (item, parentId) => {
  if (!replyVal.value) {
    $message.warning('请填写评论！')
    return
  }
  /* 编辑 */
  if (isEdit.value) {
    const res = await api.updateCommont({ 0: { json: { text: replyVal.value, commentId: item.id } } })
    if (res && res.length) {
      inputId.value = 0
      $message.success('编辑成功')
      fetchData()
    }
    return
  }
  const params = {
    0: {
      json: {
        text: replyVal.value,
        parentId,
        userId: userInfo.userId,
        promptId: props.promptId,
      },
      meta: { values: { parentId: ['undefined'] } },
    },
  }

  const res2 = await api.addComment(params)
  if (res2 && res2.length) {
    $message.success('评论成功！')
    inputId.value = 0
    fetchData()
  }

}

const getUpvotes = (upvotes, id) => {
  if (upvoteList.value.includes(id)) {
    return `(${upvotes + 1})`
  }
  return upvotes ? `(${upvotes})` : ''
}

/* 删除 */
const del = async (id) => {
  const res = await api.delComment({ 0: { json: id } })
  if (res && res.length) {
    $message.success('删除成功！')
    fetchData()
  }
}
const getDate = (date) => {
  const now = new Date()
  const day = dayjs(now).diff(date, 'day')
  const Hour = dayjs(now).diff(date, 'hour')
  const minute = dayjs(now).diff(date, 'minute')
  const second = dayjs(now).diff(date, 'second')
  // console.log('dayjs(now).diff(date', dayjs(now).diff(date, 'day'))
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
/* prompt点赞 */
const handelUpvotePrompt = async () => {
  const res = await api.upvotePrompt({
    0: { json: { promptId: props.promptId, userId: userInfo.userId } },
  })
  if (upvotepromptStatus.value === true) {
    promptUpvotesNum.value = promptUpvotesNum.value - 1
  } else {
    promptUpvotesNum.value = promptUpvotesNum.value + 1
  }
  upvotepromptStatus.value = !upvotepromptStatus.value
}
/* prompt保存 */
const handelSavePrompt = async () => {
  const res = await api.savePrompt({
    0: { json: { promptId: props.promptId, userId: userInfo.userId } },
  })
  if (promptSaveStatus.value === true) {
    promptSaveNum.value = promptSaveNum.value - 1
  } else {
    promptSaveNum.value = promptSaveNum.value + 1
  }
  promptSaveStatus.value = !promptSaveStatus.value
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
