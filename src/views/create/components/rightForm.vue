<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" :size="'large'" class="flex-1 lt-sm:mt-10">
    <div class="flex items-center">
      <div class="relative h-80 w-80 flex-shrink-0 cursor-pointer" @click="handelClick">
        <img src="@/assets/images/avatar.png" alt="" class="wh-full b-rd-50%" />
        <div class="edit absolute right-0 top-0 h-24 w-24 flex items-center justify-center b-rd-50% bg-#00000099">
          <icon-custom-edit size="12"></icon-custom-edit>
        </div>
      </div>
      <n-form-item path="title" class="ml-15 flex-1 pt-20 lt-sm:ml-8">
        <template #label>
          <n-tooltip trigger="hover" placement="bottom-center">
            <template #trigger>
              <div class="label flex items-center">
                提示词(Prompt)名称
                <icon-custom-hint size="12" class="ml-3"></icon-custom-hint>
              </div>
            </template>
            <div class="max-w-200">这个名称将显示在你的提示词（Prompt）卡片上，需要简短明了</div>
          </n-tooltip>
        </template>
        <n-input v-model:value="formValue.title" placeholder="自动邮件内容生成" class="h-full b-rd-10 bg-#1B1B1BE0" />
      </n-form-item>
    </div>
    <n-form-item path="description">
      <template #label>
        <n-tooltip trigger="hover" placement="bottom-center">
          <template #trigger>
            <div class="label">提示词描述</div>
          </template>
          <div class="max-w-200">
            在你的提示词的卡片上展示的描述。一个清晰、信息丰富且引人入胜的描述将有助于使你的提示更加引人注目。
          </div>
        </n-tooltip>
      </template>
      <n-input v-model:value="formValue.description" type="textarea" placeholder="根据不同工作场景下，创作吸引人、有说服力的邮件正文。邮件内容精简并格式清晰"
        class="h-full b-rd-10 bg-#1B1B1BE0" />
    </n-form-item>
    <n-form-item path="Tag">
      <template #label>
        <div class="label">标签</div>
      </template>
      <n-select v-model:value="formValue.Tag" placeholder="输入或选择标签" :options="tagsOption" multiple
        class="b-rd-10 bg-#1B1B1BE0!important" />
    </n-form-item>
    <n-form-item path="bountyId">
      <template #label>
        <div class="label">参与赏金任务(可选)</div>
      </template>
      <n-select v-model:value="formValue.bountyId" placeholder="输入或选择标签" :options="taskOptions"
        class="b-rd-10 bg-#1B1B1BE0 text-16" />
    </n-form-item>
    <n-form-item path="radioGroupValue">
      <template #label>
        <n-tooltip trigger="hover" placement="bottom-center">
          <template #trigger>
            <div class="label flex items-center">
              可见范围
              <icon-custom-hint size="12" class="ml-3"></icon-custom-hint>
            </div>
          </template>
          <div class="max-w-200">如果设置为私有，其它用户只有通过url链接才可以看到该提示词</div>
        </n-tooltip>
      </template>
      <n-radio-group v-model:value="formValue.live" name="radiogroup1">
        <n-space>
          <n-radio :value="true">公开</n-radio>
          <n-radio :value="false">私有</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-button type="info" size="large" class="btn_full w-110 b-rd-8 font-bold text-#fff hover:text-#fff"
      :disabled="!conversationId" @click="autoFill">
      自动填充
    </n-button>
    <n-button class="btn_commit ml-13 w-110 b-rd-8 bg-#9B9B9B font-bold text-#fff" type="primary" size="large"
      @click="handleValidateButtonClick">
      提交
    </n-button>
  </n-form>
  <PresetPhotos ref="PresetPhotosRef" />
</template>

<script setup>
import api from '~/src/api'
import PresetPhotos from './PresetPhotos.vue'
import { useRoute, useRouter } from 'vue-router'
import { chat } from '~/src/utils';
const router = useRouter()
const route = useRoute()

const props = defineProps({
  conversationId: { type: String, default: '' },
  initPrompt: { type: String, default: '' },
  initPromptData: { type: Object, default: () => { } }
})
const message = ref([])
const formMsgVal = ref([])
const decoder = new TextDecoder('utf-8')
const formRef = ref(null)
const PresetPhotosRef = ref(null)
const tagsOption = ref([])
const taskOptions = ref([])
const formValue = ref({
  title: '',
  description: '',
  Tag: [],
  bountyId: null,
  live: true,
})
const rules = {
  title: {
    required: true,
    validator (rule, value) {
      if (!value) {
        return new Error('请填写提示词(Prompt)名称')
      } else if (value.length < 10) {
        return new Error(`名称必须大于10个字符,(目前您使用了${value.length}个字符)`)
      }
      return true
    },
  },
  Tag: {
    required: true,
    message: '请至少选择一个标签',
  },
  description: {
    required: true,
    message: '请输入提示词描述',
    trigger: 'blur',
  },
}
const handleValidateButtonClick = (e) => {
  e.preventDefault()
  console.log(formValue.value)
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // $message.success('验证成功')
      const params = {
        0: {
          json: {
            ...formValue.value,
            thumbnailURL: '',
            conversationId: props.conversationId,
            initPrompt: props.initPrompt,
            language: 'zh',
          },
          meta: { values: { bountyId: ["undefined"] } }
        },
      }
      if (!props.conversationId) {
        $message.error('你需要先进行问答对话后再创建')
        return
      }
      /* 编辑 */
      if (route.query.promptId) {
        /* 更新聊天 */
        const data = await api.updateConversation({ 0: { json: { conversationId: props.conversationId, promptId: route.query.promptId, conversationType: "old" } } })
        const p = {
          0: {
            json: {
              prompt:
                { ...formValue.value, thumbnailURL: "", conversationId: props.conversationId, initPrompt: props.initPrompt, bountyId: props.initPrompt, language: "zh" },
              promptId: route.query.promptId,
              conversationId: props.conversationId
            }, meta: { values: { 'prompt.bountyId': ["undefined"] } }
          }
        }
        const updateRes = await api.updatePrompt(p)
        if (updateRes && updateRes.length) {
          $message.success('修改成功！')
          /* 创建成功 */
          router.push({
            path: '/prompt',
            query: {
              promptId: route.query.promptId,
            },
          })
          return
        }
      }
      const res = await api.cretePrompt(params)
      if (res && res.length) {
        $message.success('创建成功！')
        /* 创建成功 */
        router.push({
          path: '/prompt',
          query: {
            promptId: res[0]?.result?.data?.json,
          },
        })
      }
    } else {
      console.log(errors)
      // $message.error('验证失败')
    }
  })
}
const handelClick = () => {
  PresetPhotosRef.value.show()
}
const fetchData = async () => {
  const params = {
    0: { json: 10 },
    1: { json: null, meta: { values: ['undefined'] } },
    2: { json: null, meta: { values: ['undefined'] } },
  }
  const res = await api.getFrequentTags({ input: JSON.stringify(params) })
  if (res && res.length) {
    tagsOption.value = res[2]?.result?.data?.json.map((i) => {
      return { value: i.name, label: i.name }
    })
    taskOptions.value = res[1]?.result?.data?.json.map((i) => {
      return { value: i.id, label: i.title }
    })
    console.log(' taskOptions.value:', taskOptions.value)
  }
}

const readStream = async (reader, status) => {
  let partialLine = ''

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done } = await reader.read()
    if (done) break

    const decodedText = decoder.decode(value, { stream: true })

    if (status !== 200) {
      const json = JSON.parse(decodedText) // start with "data: "
      const content = json.error.message ?? decodedText
      // message.value.push(content)
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
      message.value.push(content)

    }
  }
}

const autoFill = async () => {
  message.value = []
  const params = { stream: false, message: `给我写一个简洁的10个字符的标题、一个简短的60个字符的描述和3个标签来宣传ChatGPT: \"${props.initPrompt}\". 的提示。用$符号把你的两个回答都包起来。例如：$<我的标题>$$<我的描述>$<标签1>$<标签2>$<标签3>$；。`, parentMessageId: "" }
  const { body, status } = await chat('', params, 'https://test.aigcopen.com/conversation')
  if (body) {
    const reader = body.getReader()
    await readStream(reader, status)
    const formMsgVal = message.value.join('').split('$').filter(i => !!i)
    const [title, description, ...reset] = formMsgVal
    formValue.value.title = title
    formValue.value.description = description
    console.log('reset:', reset)
    formValue.value.Tag = reset
  }
}
onMounted(() => {
  fetchData()
})
watch(() => props.initPromptData, () => {
  formValue.value.title = props.initPromptData?.title
  formValue.value.description = props.initPromptData?.description
  formValue.value.live = props.initPromptData?.live
  formValue.value.Tag = props.initPromptData?.Tag.map(i => i.name)
}, { deep: true })
</script>

<style lang="scss" scoped>
:deep(.n-form-item-blank) {
  background-color: #1b1b1be0;
  color: #fff;
  border-radius: 10px;
}

:deep(.n-base-selection-tags) {
  background-color: #1b1b1be0;
  color: #fff;
  border-radius: 10px;
}

:deep(.n-base-selection-label) {
  background-color: #1b1b1be0;
  color: #fff;
  border-radius: 10px;
}

:deep(.n-radio-group) {
  padding-left: 12px;
}

:deep(.n-input__input-el) {
  height: 100%;
}

:deep(.n-input-wrapper) {
  padding-right: 0;
}

.btn_full {
  &:hover {
    background-color: #c5191f;
    color: #fff;
  }

  &:focus {
    background-color: #c5191f;
    color: #fff;
  }
}

.btn_commit {
  &:hover {
    background-color: #9b9b9b;
    color: #fff;
  }

  &:focus {
    background-color: #9b9b9b;
    color: #fff;
  }
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

:deep(.n-radio) {
  .n-radio__dot.n-radio__dot--checked {
    box-shadow: inset 0 0 0 1px #aab2c8 !important;
  }

  .n-radio_dot {
    box-shadow: inset 0 0 0 1px #aab2c8 !important;
  }

  .n-radio__dot::before {
    background-color: #c5191f !important;
  }
}

.label {
  padding-left: 17px;
  position: relative;
  font-weight: bold;

  &::before {
    content: '';
    width: 3px;
    height: 24px;
    position: absolute;
    background: #c5191f;
    left: 0;
    top: 50%;
    transform: translateY(-12px);
  }
}
</style>
