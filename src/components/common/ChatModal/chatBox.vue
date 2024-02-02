<template>
  <div w-full class="lt-lg-8 h-full flex flex-col pb-17">
    <div class="title h-42 flex flex-shrink-0 cursor-pointer items-center justify-center bg-#2C2C2E text-16"
      @click="extendChat">
      <icon-custom-msg size="16" mr-12></icon-custom-msg>
      {{ !isExtend ? '展示' : '隐藏' }}对话样例
    </div>
    <div id="scrollRef" ref="scrollRef" class="box flex-1 overflow-y-auto lt-sm:overflow-unset">
      <div class="px-20">
        <!--  -->
        <div v-if="!isExtend && !chatFlag" class="mb-64 mt-36 h-full w-full flex flex-row-reverse gap-19 lt-sm:gap-8">
          <img src="@/assets/images/chatgpt.png" class="h-40 w-40 flex-shrink-0 b-rd-50%" alt="" />
          <div class="msg h-fit w-full flex-1 rounded-xl p-6 lg:max-w-[80%]">
            <div class="relative">
              <div class="msgBox px-15" v-if="Array.isArray(ArrMsg)">
                <div class="px-10 py-15">
                  <div class="item mb-15" v-for="(item, index) in ArrMsg" :key="index">
                    <div class="label mb-10">{{ item[0] }}</div>
                    <n-input type="text" v-model:value="ArrMsg[index][1]" class="h-40 b-rd-10"></n-input>
                  </div>
                </div>
              </div>
              <n-input v-model:value="textVal" autofocus type="textarea" :autosize="{
                minRows: 3,
                maxRows: 10,
              }" placeholder="在这里问你的问题。。。" class="w-full bg-transparent" v-else />
              <div class="absolute right-0 mt-16 flex flex-row">
                <div class="w-fit flex flex-col items-center space-y-4">
                  <n-button type="primary" size="large" class="send w-110 b-rd-10 bg-#2C2C2E text-#fff"
                    @click="sendMsg(textVal)">
                    发送
                    <icon-custom-send size="16" ml-6></icon-custom-send>
                  </n-button>
                  <div class="flex flex-row items-center text-center text-xs">
                    <n-tooltip trigger="hover" placement="bottom-center">
                      <template #trigger>
                        <div class="label flex items-center">
                          <icon-custom-xh size="16" mr-6></icon-custom-xh>
                        </div>
                      </template>
                      <div class="max-w-300">
                        1.什么是token？token是AIGCOPEN社区虚拟的积分，可以用来与不同的AI模型进行对话以及使用Prompts提示词。2.如何获得token？社区通过免费发放token来让每个人可以使用到最新的AI模型。只需要在社区完成一系列任务即可获得token
                      </div>
                    </n-tooltip>
                    <div class="pb-1 text-12px">消耗 token: {{ consumeToken }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 聊天 -->
        <div v-for="(item, index) in !isExtend ? message : sampleMsg" v-else :key="index"
          class="message w-full flex flex-col">
          <div v-if="item.role === 'assistant'" class="left mb-32 mt-4 w-full flex flex-row gap-19 text-#fff">
            <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
            <div v-if="item.content" class="msg prose relative max-w-80% w-fit w-fit bg-#2C2C2ECC p-12 lt-sm:w-100%"
              style="border: 1px solid #ffffff1a; border-radius: 0 10px 10px 10px" v-html="md.render(item.content)"></div>
            <Loding v-else />
          </div>
          <div v-if="item.role === 'user'" class="right mb-32 mt-4 w-full flex flex-row-reverse gap-8 text-#fff">
            <img src="../../../assets/images/aigcopen.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
            <div class="msg relative max-w-80% w-fit flex bg-#2C2C2ECC p-12 lt-sm:w-100%"
              style="border: 1px solid #ffffff1a; border-radius: 10px 0 10px 10px">

              <!-- 展开查看模板 -->
              <div v-if="isExtend">
                <div class="innerUser relative wh-full" style="white-space: pre-wrap">
                  {{ item.content }}
                  <TheIcon icon="copy" color="#fff" type="custom"
                    class="icon absolute bottom-0 right-0 cursor-pointer opacity-0" @click="copy(item.content)"
                    v-if="isExtend" />
                </div>
              </div>

              <!-- 隐藏对话样例 -->
              <template v-else>
                <div v-if="!messageFlagList[index]?.flag">
                  <div class="innerUser relative wh-full" style="white-space: pre-wrap">
                    {{ item.content }}
                    <TheIcon icon="copy" color="#fff" type="custom"
                      class="icon absolute bottom-0 right-0 cursor-pointer opacity-0" @click="copy(item.content)"
                      v-if="isExtend" />
                  </div>
                </div>
                <!-- 输入框 -->
                <n-input v-else v-model:value="messageFlagList[index].text" autofocus type="textarea"
                  placeholder="在这里问你的问题。。。" class="w-full bg-transparent min-w-100" />
                <div class="ml-4 mt-auto flex items-center p-2 relative">
                  <TheIcon icon="edit" color="#fff" type="custom" v-if="!messageFlagList[index]?.flag"
                    class="eidt absolute bottom-3 right-3 cursor-pointer" @click="changeChat(index)" />
                  <n-button v-if="messageFlagList[index]?.flag" type="primary"
                    class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="toSend(index)">
                    <icon-custom-current size="16"></icon-custom-current>
                  </n-button>
                  <n-button v-if="messageFlagList[index]?.flag" type="primary"
                    class="btn send ml-4 h-40 w-40 b-rd-10 bg-#2C2C2E text-#fff" @click="closeInput(index)">
                    <TheIcon icon="close" size="12" color="#fff" type="custom" />
                  </n-button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="chatFlag" class="bottom relative flex-shrink-0 px-20" style="overflow: initial">
      <div v-if="!stopChat" class="lt-lg:gp-8 absolute top--45 z-1 w-full flex justify-center gap-16">
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="clear">
          <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
          清除
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="regeneration">
          <TheIcon icon="refresh" color="#fff" type="custom" class="mr-4" />
          重新生成
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="copyLink">
          <TheIcon icon="copyLink" color="#fff" type="custom" class="mr-4" />
          复制链接
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="$router.push('/chat')">
          <TheIcon icon="chat" color="#fff" type="custom" class="mr-4" />
          继续聊天
        </n-button>
      </div>
      <div v-else class="lt-lg:gp-8 absolute top--45 z-1 w-full flex justify-center gap-16">
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="stop">
          <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
          停止生成
        </n-button>
      </div>
      <n-input v-model:value="qustionVal" placeholder="在这里输入你的问题" size="large" autofocus :disabled="isTalking"
        class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D" @keydown.enter="sendMsg(qustionVal)">
        <template #suffix>
          <n-button type="primary" class="send h-full w-98 b-rd-r-10 bg-#2C2C2E text-#fff" :disabled="isTalking"
            @click="sendMsg(qustionVal)">
            发送
            <icon-custom-send size="16" ml-6></icon-custom-send>
          </n-button>
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { useUserStore } from '~/src/store'
import { useScroll } from '@/hooks/useScroll'
import { chat } from '@/utils/http/index'
import Loding from '@/components/common/ChatLoading/index.vue'
const userInfo = useUserStore()
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
import { md } from '@/utils/common/markdown'
import { copy } from '~/src/utils'
import { markedRender } from '@/utils/common/highlight'

import api from '@/api'
import { getUrl } from '~/src/utils'
const { proxy } = getCurrentInstance()
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
const roleAlias = { user: 'ME', assistant: 'ChatGPT', system: 'System' }
const decoder = new TextDecoder('utf-8')
const message = ref([])
const isExtend = ref(false)
const chatFlag = ref(false)
const isTalking = ref(false)
const sampleMsg = ref(props.promptData?.Conversation?.messages)
const qustionVal = ref('')
const textVal = ref(props.promptData?.initPrompt || '')
const ArrMsg = ref('');
const stopChat = ref(false) // 停止
const chatLinkId = ref(null)
const consumeToken = ref(0.0) // 消耗token
const messageFlagList = ref([])

const sendMsg = async (_message) => {
  if (!userInfo.userId) {
    proxy.$Login({})
    return
  }
  let msg = _message
  if (!msg) {
    return
  }
  if (ArrMsg.value.length) {
    let arr = ArrMsg.value.map(i => {
      return `${i.join('：')}`
    })
    console.log('ArrMsg.value:', arr)
    for (var i = 0; i < arr.length; i++) {
      msg = msg.replace(/\{.*?\}/, arr[i]);
    }
    console.log('msg:', msg)
  }
  stopChat.value = false
  try {
    if (textVal.value) {
      chatFlag.value = true
    }
    isTalking.value = true
    message.value.push({ role: 'user', content: msg })
    clearMessageContent()
    message.value.push({ role: 'assistant', content: '' })

    const tokenRes = await api.getChatToken({ userId: userInfo.userId })
    const params = {
      model: 'gpt-3.5-turbo',
      question: msg,
      history: message.value,
      system: '',
      temperature: 0.7,
      frequencyPenalty: 0,
      presencePenalty: 0,
      streaming: true,
      userId: userInfo.userId,
    }
    const { body, status } = await chat(tokenRes.sessionToken, params)

    stopChat.value = true

    if (body) {
      const reader = body.getReader()
      await readStream(reader, status)
      const p1 = {
        0: { json: { userId: userInfo.userId, amount: consumeToken.value, type: 'CHAT_CHATGPT' } },
        1: {
          json: {
            messages: message.value,
            model: 'gpt-3.5-turbo',
            creditUsage: consumeToken.value,
            temperature: 0.7,
            frequencyPenalty: 0,
            presencePenalty: 0,
            topP: 1,
            maxTokens: 4096,
            promptId: props.promptId,
            live: false,
          },
        },
      }
      const p2 = {
        0: { json: { userId: userInfo.userId, amount: consumeToken.value, type: 'CHAT_CHATGPT' } },
        1: { json: { conversationId: chatLinkId.value, messages: message.value } },
      }
      const updateRes = chatLinkId.value
        ? await api.conversationUpdate({ ...p2 })
        : await api.conversationCreate({ ...p1 })
      if (updateRes && updateRes.length) {
        chatLinkId.value = updateRes[1]?.result?.data?.json
      }
      useUserStore().updataMoeny(Number(userInfo.moeny) - Number(consumeToken.value))
      stopChat.value = false
      textVal.value = ''
      ArrMsg.value = ''
    }
  } catch (error) {
    appendLastMessageContent(error)
  } finally {
    chatFlag.value = true
    isTalking.value = false
  }
}

const copyLink = () => {
  const link = `${location.origin}/c?id=${chatLinkId.value}`
  copy(link)
}


const readStream = async (reader, status) => {
  let partialLine = ''

  while (true) {
    if (!stopChat.value) {
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
const appendLastMessageContent = (content) => {
  try {
    message.value[message.value.length - 1].content += content
  } catch (error) {
    console.log('error:', error)
  }
}

const clearMessageContent = () => (qustionVal.value = '')

const extendChat = () => {
  isExtend.value = !isExtend.value
}

/* 清除 */
const clear = () => {
  chatFlag.value = false
  isExtend.value = false
  isTalking.value = false
  chatLinkId.value = null
  message.value = []
  textVal.value = props.promptData?.initPrompt
}

/* 重新 */
const regeneration = () => {
  // console.log('message:', message.value)
  const msg = message.value[message.value.length - 2].content
  message.value.pop()
  message.value.pop()
  chatLinkId.value = null
  sendMsg(msg)
}

const stop = () => {
  stopChat.value = false
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


watch(message.value, () => nextTick(() => {
  scrollToBottom()
  messageFlagList.value = message.value.map(() => ({ flag: false, text: '' }))
}))
watch(
  () => props.promptData,
  () => {
    textVal.value = props.promptData?.initPrompt
    sampleMsg.value = props.promptData?.Conversation?.messages
    try {
      consumeToken.value = (Number(textVal.value.length) / 750).toFixed(2)
    } catch (error) {
      console.log('error:', error)
    }
  },
  { deep: true }
)
watch(textVal, (val) => {
  if (val) {
    try {
      const pattern = /(?<=\{)(.+?)(?=\})/g;
      let ArrVal = val.match(pattern);
      ArrVal = ArrVal.map(i => i.split(':'));
      if (Array.isArray(ArrVal)) {
        ArrMsg.value = ArrVal;
      }
    } catch (error) {
      ArrMsg.value = ""
    }
    consumeToken.value = (Number(textVal.value.length) / 750).toFixed(2)
  }
}, { immediate: true })

watch(qustionVal, (val) => {
  consumeToken.value = Number(parseFloat(val.length / 750).toFixed(2)) + 0.04
})

onMounted(() => { })
</script>

<style lang="scss" scoped>
:deep(.n-input__input-el) {
  height: 100%;
}

:deep(.n-input-wrapper) {
  padding-right: 0;
}

.msg {
  border-radius: 10px 0 10px 10px;
  border: 1px solid #ffffff1a;
  background: linear-gradient(0deg, rgba(44, 44, 46, 0.8), rgba(44, 44, 46, 0.8)),
    linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
}

.send {
  &:hover {
    background-color: #2c2c2e;
    color: #fff;
  }

  &:focus {
    background-color: #2c2c2e;
    color: #fff;
  }
}

.btn {
  border: none;

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

.innerUser {
  &:hover {
    .icon {
      opacity: 1 !important;
    }
  }
}
</style>
