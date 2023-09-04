<template>
  <div w-full class="h-full flex flex-col px-22 pb-26 pr-0">
    <div id="scrollRef" ref="scrollRef" class="chat w-full flex flex-col flex-1 overflow-y-auto pr-22">
      <div v-for="(item, index) in message" :key="index" class="message w-full flex flex-col">
        <div v-if="item.role === 'assistant'" class="left mb-32 mt-4 w-full flex flex-row gap-8 text-#fff">
          <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div v-if="item.content" class="msg relative max-w-80% w-fit w-fit bg-#2C2C2ECC p-12"
            style="border: 1px solid #ffffff1a; border-radius: 0 10px 10px 10px" v-html="md.render(item.content)"></div>
          <Loding v-else />
        </div>
        <div v-if="item.role === 'user'" class="right mb-32 mt-4 w-full flex flex-row-reverse gap-8 text-#fff">
          <img src="../../../assets/images/aigcopen.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div class="msg relative max-w-80% w-fit flex bg-#2C2C2ECC p-12"
            style="border: 1px solid #ffffff1a; border-radius: 10px 0 10px 10px">


            <div v-if="!messageFlagList[index]?.flag">
              <div class="innerUser relative wh-full" style="white-space: pre-wrap">
                {{ item.content }}
              </div>
            </div>
            <!-- 输入框 -->
            <n-input v-else v-model:value="messageFlagList[index].text" autofocus type="textarea"
              placeholder="在这里问你的问题。。。" class="w-full bg-transparent min-w-100" />
            <div class="ml-4 mt-auto flex items-center p-2 relative">
              <TheIcon icon="edit" color="#fff" type="custom" v-if="!messageFlagList[index]?.flag"
                class="edit absolute bottom-3 right-3 cursor-pointer" @click="changeChat(index)" />
              <n-button v-if="messageFlagList[index]?.flag" type="primary"
                class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="toSend(index)">
                <icon-custom-current size="16"></icon-custom-current>
              </n-button>
              <n-button v-if="messageFlagList[index]?.flag" type="primary"
                class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="closeInput(index)">
                <TheIcon icon="close" size="12" color="#fff" type="custom" />
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div relative pr-22>
      <div v-if="chatState === 1 && !chating" class="lt-lg:gp-8 absolute top--45 z-1 w-full flex justify-center gap-16">
        <n-button class="btn w-110 cursor-pointer b-rd-10 bg-#9B9B9B33 text-14" @click="regeneration">
          <TheIcon icon="refresh" color="#fff" type="custom" class="mr-4" />
          重新生成
        </n-button>
        <n-button class="btn w-110 cursor-pointer b-rd-10 bg-#9B9B9B33 text-14" @click="copyLink">
          <TheIcon icon="copyLink" color="#fff" type="custom" class="mr-4" />
          复制链接
        </n-button>
      </div>
      <div v-if="chating" class="lt-lg:gp-8 absolute top--45 z-1 w-full flex cursor-pointer justify-center gap-16">
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="stop">
          <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
          停止生成
        </n-button>
      </div>
      <n-input v-model:value="questionVal" placeholder="在这里输入你的问题" size="large" autofocus :disabled="chating"
        ref="inputRef" class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D" @keydown.enter="sendMsg(questionVal)">
        <template #suffix>
          <n-button quaternary :disabled="chating" @click="sendMsg(questionVal)">
            <icon-custom-send size="16"></icon-custom-send>
          </n-button>
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup>
import { useScroll } from '@/hooks/useScroll'
import { watch } from 'vue'
import { useChatStore, useUserStore } from '~/src/store'
import { copy } from '~/src/utils'
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
import { chat } from '@/utils/http/index'
import Loding from '@/components/common/ChatLoading/index.vue'
import { md } from '@/utils/common/markdown'
import api from '@/api'
const userInfo = useUserStore()
const settingConfig = useChatStore()

const props = defineProps({
  data: { type: Object, default: () => { } },
  chatState: { type: Number, default: 2 },
  chatLinkId: { type: String, default: '' },
})
const inputRef = ref(null)
const tokenNum = ref(0.04)
const decoder = new TextDecoder('utf-8')
const emits = defineEmits(['changeId', 'getChatList'])
const chating = ref(false) // 是否正在回答
const questionVal = ref('')
const isStopChat = ref(false)
const messageFlagList = ref([])
const system =
  "你是AIGCOpen社区的ChatGPT助手, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown，回复请使用中文。"

const message = ref(props.data?.messages || [])

const sendMsg = async (msg) => {
  if (!msg) return
  chating.value = false
  isStopChat.value = false
  try {
    message.value.push({ role: 'user', content: msg })
    message.value.push({ role: 'assistant', content: '' })
    clearMessageContent()

    const tokenRes = await api.getChatToken({ userId: userInfo.userId })
    const params = {
      question: msg,
      history: message.value,
      system,
      ...settingConfig.setting,
      streaming: true,
      userId: userInfo.userId,
    }
    const { body, status } = await chat(tokenRes.sessionToken, params)

    chating.value = true

    if (body) {
      const reader = body.getReader()
      await readStream(reader, status)
      emits('getChatList')
      const p1 = {
        0: {
          json: {
            userId: userInfo.userId,
            amount: tokenNum.value,
            type: 'CHAT_CHATGPT',
          },
        },
        1: {
          json: {
            messages: message.value,
            ...settingConfig.setting,
            creditUsage: tokenNum.value,
            promptId: null,
            live: true,
          },
          meta: { values: { promptId: ['undefined'] } },
        },
      }
      const p2 = {
        0: { json: { userId: userInfo.userId, amount: tokenNum.value, type: 'CHAT_CHATGPT' } },
        1: { json: { conversationId: props.chatLinkId, messages: message.value } },
      }
      const updateRes = props?.chatLinkId
        ? await api.conversationUpdate({ ...p2 })
        : await api.conversationCreate({ ...p1 })
      if (updateRes && updateRes.length) {
        const chatLinkId = updateRes[1]?.result?.data?.json
        emits('changeId', chatLinkId)
        useUserStore().updataMoeny(Number(userInfo.moeny) - Number(tokenNum.value))
      }
    }
  } catch (error) {
    appendLastMessageContent(error)
  } finally {
    chating.value = false
  }
}

const readStream = async (reader, status) => {
  let partialLine = ''

  while (true) {
    if (isStopChat.value) {
      break
    }
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read()
    if (done) break

    const decodedText = decoder.decode(value, { stream: true })

    if (status !== 200) {
      const json = JSON.parse(decodedText) // start with "data: "
      const content = json.error.message ?? decodedText
      appendLastMessageContent(content)
      return
    }

    const chunk = partialLine + decodedText
    const newLines = chunk.split(/\r?\n/)

    partialLine = newLines.pop() ?? ''

    for (const line of newLines) {
      if (line.length === 0) continue // ignore empty message
      if (line.startsWith(':')) continue // ignore sse comment message
      if (line === 'data: [DONE]') return //

      const json = JSON.parse(line.substring(6)) // start with "data: "
      const content = status === 200 ? json.choices[0].delta.content ?? '' : json.error.message
      appendLastMessageContent(content)
    }
  }
}

/* 添加消息 */
const appendLastMessageContent = (content) =>
  (message.value[message.value.length - 1].content += content)

const clearMessageContent = () => (questionVal.value = '')

const regeneration = () => {
  const msg = message.value[message.value.length - 2].content
  message.value.pop()
  message.value.pop()
  sendMsg(msg)
}

const stop = () => {
  isStopChat.value = true
  chating.value = false
}

/* 点击修改聊天 */
const changeChat = (index) => {
  try {
    console.log('message.value:', message.value[index]?.content)
    const text = messageFlagList.value[index]?.text
    console.log('messageFlagList.value:', messageFlagList.value)
    messageFlagList.value.splice(index, 1, {
      flag: true,
      text: text ? text : message.value[index]?.content,
    })
    console.log('messageFlagList.value:', messageFlagList.value)
  } catch (error) {
    console.log('error:', error)
  }
}
/* 取消修改 */
const closeInput = (index) => {
  try {
    messageFlagList.value.splice(index, 1, { flag: false, text: '' })
  } catch (error) {
    console.log('error:', error)
  }
}

/* 重新发送消息 */
const toSend = (index) => {
  const msg = messageFlagList.value[index]?.text
  /* 删除数组 */
  message.value.splice(index)
  sendMsg(msg)
}

const copyLink = () => {
  const link = `${location.origin}/c?id=${props.chatLinkId}`
  copy(link)
}

watch(() => message.value, () => nextTick(() => {
  scrollToBottom()
  messageFlagList.value = []
  messageFlagList.value = message.value.map(() => ({ flag: false, text: '' }))
}), { deep: true })
watch(
  () => props.data,
  () => {

    message.value = props.data?.messages || []
  },
  { deep: true }
)
watch(questionVal, (val) => {
  tokenNum.value = Number(parseFloat(val.length / 750).toFixed(2)) + 0.04
})

watch(() => props.chatState, (val) => {
  if (val === 2) {
    inputRef.value?.focus()
  }
})
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100%;
}

.btn {
  &:hover {
    background-color: #9b9b9b33;
    color: #fff;
  }

  &:focus {
    background-color: #9b9b9b33;
    color: #fff;
  }
}

:deep(pre) {
  font-family: -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial,
    'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC',
    'Source Han Sans CN', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti',
    SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
  background: rgb(40, 44, 52);
  color: rgb(171, 178, 191);
  text-shadow: rgba(0, 0, 0, 0.3) 0px 1px;
  font-family: Menlo, Monaco, 'Courier New', monospace;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 1.5;
  tab-size: 2;
  hyphens: none;
  padding: 1em;
  margin: 0px;
  overflow: auto;
  border-radius: 8px;
  font-size: 14px;
  font-weight: normal;
}

.msg {
  .edit {
    display: none;
  }

  &:hover {
    .edit {
      display: block;
    }
  }
}
</style>
