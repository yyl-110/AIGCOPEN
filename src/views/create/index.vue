<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap">
        <div
          class="relative h-88% w-40% flex flex-col overflow-hidden overflow-x-hidden b-rd-10 bg-#25262B66 pb-30 lt-sm:h-300 lt-sm:w-full lt-sm:pb-10">
          <img src="@/assets/images/logo_text.png" class="logoText absolute w-240" />
          <div id="scrollRef" ref="scrollRef" class="box flex-1 overflow-y-auto px-20 lt-sm:px-5">
            <!-- 聊天 -->
            <div v-for="(item, index) in message" :key="index" class="message w-full flex flex-col">
              <div v-if="item.role === 'assistant'" class="left mb-32 mt-4 w-full flex flex-row gap-8 text-#fff">
                <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
                <div v-if="item.content" class="msg relative max-w-80% w-fit w-fit bg-#2C2C2ECC p-12"
                  style="border: 1px solid #ffffff1a; border-radius: 0 10px 10px 10px" v-html="md.render(item.content)">
                </div>
                <Loding v-else />
              </div>
              <div v-if="item.role === 'user'" class="right mb-32 mt-4 w-full flex flex-row-reverse gap-8 text-#fff">
                <img src="../../assets/images/aigcopen.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
                <div class="msg relative max-w-80% w-fit flex bg-#2C2C2ECC p-12"
                  style="border: 1px solid #ffffff1a; border-radius: 10px 0 10px 10px">
                  <div v-if="!messageFlagList[index]?.flag">
                    <div class="overflow-x-scroll min-w-80" style="white-space: pre-wrap">
                      {{ item.content }}
                    </div>
                  </div>
                  <!-- 输入框 -->
                  <n-input v-else v-model:value="messageFlagList[index].text" autofocus type="textarea"
                    placeholder="在这里问你的问题。。。" class="w-full bg-transparent min-w-80" />
                  <div class="ml-4 mt-auto flex items-center p-2">
                    <n-button v-if="!messageFlagList[index]?.flag" type="primary"
                      class="btn send h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="changeChat(index)">
                      <icon-custom-edit size="16"></icon-custom-edit>
                    </n-button>
                    <n-button v-if="messageFlagList[index]?.flag" type="primary"
                      class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="toSend(index)">
                      <icon-custom-current size="16"></icon-custom-current>
                    </n-button>
                    <n-button v-if="messageFlagList[index]?.flag" type="primary"
                      class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="closeInput(index)">
                      <TheIcon icon="close" size="16" color="#fff" type="custom" />
                    </n-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom relative flex-shrink-0 justify-center px-20" style="overflow: initial">
            <div class="lt-lg:gp-8 absolute top--45 z-1 flex gap-16">
              <n-button v-if="!chating" class="btn w-110 cursor-pointer b-rd-10 bg-#9B9B9B33 text-14" @click="clear">
                <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
                清除
              </n-button>
              <n-button v-if="!chating && message.length" class="btn w-110 cursor-pointer b-rd-10 bg-#9B9B9B33 text-14"
                @click="regeneration">
                <TheIcon icon="refresh" color="#fff" type="custom" class="mr-4" />
                重新生成
              </n-button>
              <n-button v-if="chating" class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="stop">
                <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
                停止生成
              </n-button>
            </div>
            <n-input v-model:value="questionVal" placeholder="在这里输入你的问题" size="large" autofocus :disabled="chating"
              class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D" @keydown.enter="sendMsg(questionVal)">
              <template #suffix>
                <n-button type="primary" class="btn send h-full w-98 b-rd-r-10 bg-#2C2C2E text-center text-#fff"
                  :disabled="chating" @click="sendMsg(questionVal)">
                  发送
                  <icon-custom-send size="16" ml-6></icon-custom-send>
                </n-button>
              </template>
            </n-input>
            <div
              class="absolute bottom--16 right-20 ml-auto mt-1 flex flex-row items-center gap-1 text-right text-xs space-x-1">
              <n-tooltip trigger="hover" placement="bottom-center">
                <template #trigger>
                  <div class="label flex items-center">
                    <icon-custom-hint size="16" class="mr-4"></icon-custom-hint>
                  </div>
                </template>
                <div class="max-w-300">
                  1.什么是token？token是AIGCOPEN社区虚拟的积分，可以用来与不同的AI模型进行对话以及使用Prompts提示词。2.如何获得token？社区通过免费发放token来让每个人可以使用到最新的AI模型。只需要在社区完成一系列任务即可获得token
                </div>
              </n-tooltip>
              <div class="pb-1">消耗 token: {{ tokenNum }}</div>
            </div>
          </div>
        </div>
        <div class="ml-23 h-95% flex-1 overflow-y-auto b-rd-10 bg-#2C2E3399 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%">
          <div class="wh-full flex flex-col p-20 lt-sm:p-10">
            <img src="@/assets/images/banner.png" class="logo_img h-125 w-full flex-shrink-0 b-rd-10" alt="" />
            <rightForm :conversation-id="conversationId" :init-prompt="message[0]?.content"
              :initPromptData="initPromptData" />
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import rightForm from './components/rightForm.vue'
import { useUserStore } from '~/src/store'
import { useScroll } from '@/hooks/useScroll'
import Loding from '@/components/common/ChatLoading/index.vue'
import api from '@/api'
const userInfo = useUserStore()
import { chat } from '@/utils/http/index'
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
import { md } from '@/utils/common/markdown'
import { useRoute } from 'vue-router'
const route = useRoute()

const conversationId = ref('') // 聊天id
const messageFlagList = ref([])
const chatTextChangeVal = ref('')
const tokenNum = ref(0.0)
const decoder = new TextDecoder('utf-8')
const chating = ref(false) // 是否正在回答
const questionVal = ref('')
const isStopChat = ref(false)
/* 编辑数据 */
const initPromptData = ref('')
const system =
  "你是AIGCOpen社区的ChatGPT助手, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown，回复请使用中文。"

const message = ref([])
const sendMsg = async (msg) => {
  if (!msg) {
    return
  }
  chating.value = false
  isStopChat.value = false
  try {
    message.value.push({ role: 'user', content: msg })
    message.value.push({ role: 'assistant', content: '' })
    clearMessageContent()

    const params = { message: msg, history: message.value, parentMessageId: '' }
    const { body, status } = await chat('', params, 'https://test.aigcopen.com/conversation')
    chating.value = true

    if (body) {
      const reader = body.getReader()
      await readStream(reader, status)
      await useUserStore().updateUserInfo(tokenNum.value)

      const p1 = {
        0: {
          json: {
            messages: message.value,
            promptId: null,
            creditUsage: tokenNum.value,
            model: 'chatgpt',
            temperature: 0.7,
            maxTokens: 2048,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
          },
          meta: { values: { promptId: ['undefined'] } },
        },
      }
      const p2 = { 0: { json: { conversationId: conversationId.value, messages: message.value } } }
      const updateRes = conversationId.value
        ? await api.updatePromptchat({ ...p2 })
        : await api.createPromptchat({ ...p1 })
      if (updateRes && updateRes.length) {
        conversationId.value = updateRes[0]?.result?.data?.json
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
/* 清除 */
const clear = () => {
  isStopChat.value = false
  chating.value = false
  message.value = []
  questionVal.value = ''
}

/* 点击修改聊天 */
const changeChat = (index) => {
  try {
    console.log('message.value:', message.value[index]?.content)
    const text = messageFlagList.value[index]?.text
    messageFlagList.value.splice(index, 1, {
      flag: true,
      text: text ? text : message.value[index]?.content,
    })
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

watch(
  () => message.value,
  () =>
    nextTick(() => {
      scrollToBottom()
      messageFlagList.value = message.value.map(() => ({ flag: false, text: '' }))
      console.log('messageFlagList.value:', messageFlagList.value)
    }),
  { deep: true }
)
watch(questionVal, (val) => {
  if (val === '') {
    tokenNum.value = 0.0
    return
  }
  if (tokenNum.value < 0.01 || (tokenNum.value === 0.01 && val)) {
    tokenNum.value = 0.01
  } else {
    tokenNum.value = Number(parseFloat(val.length / 750)).toFixed(2)
  }
})
/* 获取编辑数据 */
const getEditData = async () => {
  if (route.query.promptId) {
    const res = await api.getEditPromptData({ id: route.query.promptId })
    if (res && res.pageProps) {
      message.value = res?.pageProps?.initMessages
      conversationId.value = res?.pageProps?.promptData?.conversationId
      initPromptData.value = res?.pageProps?.promptData
    }
  }
}
onMounted(() => {
  if (route.query.promptId) {
    getEditData()
  }
})
</script>

<style lang="scss" scoped>
.logoText {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}

:deep(.n-input-wrapper) {
  padding-right: 0;
}

.logo_img {
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1.02) scaleY(1.02);
  }
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
</style>
