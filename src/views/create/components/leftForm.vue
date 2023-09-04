<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="'large'"
    class="pb-20 pt-20 lt-sm:mt-10"
  >
    <div class="formTop mb-20 pb-20">
      <n-form-item path="desc">
        <template #label>
          <div class="label">
            提示词描述

            <n-tooltip trigger="hover" placement="bottom-center">
              <template #trigger>
                <icon-custom-hint size="12" class="ml-3"></icon-custom-hint>
              </template>
              <div max-w-300>
                要添加模板参数，请使用以下结构｛您的参数名称：您的示例输入｝。输入此输入块后，您将在“提示预览”下看到相应的字段。
              </div>
            </n-tooltip>
          </div>
        </template>
        <n-input
          v-model:value="formValue.desc"
          type="textarea"
          :autosize="{
            minRows: 4,
            maxRows: 10,
          }"
          placeholder="你可以通过将输入的变量用{名称：示例}来创建模版。例如：扮演{专业：数学}导师，教我{学科：微积分}，用户可以通过填写你创建的变量来更好的使用模版提示词。"
          class="h-full b-rd-10 bg-#1B1B1BE0"
        />
      </n-form-item>
      <div class="flex items-center justify-end">
        <n-button type="primary" class="send h-45 w-140 b-rd-10 bg-#171717 text-#fff">
          发送提示词
          <icon-custom-send size="16" ml-6></icon-custom-send>
        </n-button>
        <n-tooltip trigger="hover" placement="bottom-center">
          <template #trigger>
            <icon-custom-hint size="12" class="ml-3"></icon-custom-hint>
          </template>
          <div max-w-300>要先进行提示词的测试问答，系统将自动生成一个结果，用来提交该提示词</div>
        </n-tooltip>
      </div>
    </div>
    <div class="flex items-center">
      <div class="relative h-80 w-80 flex-shrink-0 cursor-pointer" @click="handelClick">
        <img src="@/assets/images/avatar.png" alt="" class="wh-full b-rd-50%" />
        <div
          class="edit absolute right-0 top-0 h-24 w-24 flex items-center justify-center b-rd-50% bg-#00000099"
        >
          <icon-custom-edit size="12"></icon-custom-edit>
        </div>
      </div>
      <n-form-item path="name" class="ml-15 flex-1 lt-sm:ml-8">
        <template #label>
          <n-tooltip trigger="hover" placement="bottom-center">
            <template #trigger>
              <div class="label flex items-center">
                提示词(Prompt)名称
                <icon-custom-hint size="12" class="ml-3"></icon-custom-hint>
              </div>
            </template>
            这个名称将显示在你的提示词（Prompt）卡片上，需要简短明了
          </n-tooltip>
        </template>
        <n-input
          v-model:value="formValue.name"
          placeholder="自动邮件内容生成"
          class="h-full b-rd-10 bg-#1B1B1BE0"
        />
      </n-form-item>
    </div>
    <n-form-item path="tag">
      <template #label>
        <div class="label">标签</div>
      </template>
      <n-select
        v-model:value="formValue.tag"
        placeholder="输入或选择标签"
        :options="generalOptions"
        multiple
        class="b-rd-10 bg-#1B1B1BE0!important"
      />
    </n-form-item>
    <n-form-item path="task">
      <template #label>
        <div class="label">参与赏金任务</div>
      </template>
      <n-select
        v-model:value="formValue.task"
        placeholder="输入或选择标签"
        class="b-rd-10 bg-#1B1B1BE0 text-16"
      />
    </n-form-item>
    <n-form-item path="radioGroupValue">
      <template #label>
        <div class="label">可见范围</div>
      </template>
      <n-radio-group v-model:value="formValue.range" name="radiogroup1">
        <n-space>
          <n-radio value="range1">公开</n-radio>
          <n-radio value="range2">私有</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-button
      type="info"
      size="large"
      class="btn_full w-110 b-rd-8 font-bold text-#fff hover:text-#fff"
    >
      自动填充
    </n-button>
    <n-button
      class="btn_commit ml-13 w-110 b-rd-8 bg-#9B9B9B font-bold text-#fff"
      type="primary"
      size="large"
      @click="handleValidateButtonClick"
    >
      提交
    </n-button>
  </n-form>
  <PresetPhotos ref="PresetPhotosRef" />
</template>

<script setup>
import PresetPhotos from './PresetPhotos.vue'
import api from '~/src/api'
const emits = defineEmits(['handelSubmit'])
const PresetPhotosRef = ref(null)
const formRef = ref(null)
const tagsOption = ref([])
const taskOptions = ref([])
const Tag = ref([])
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
    message: '请输入Prompt名称',
    trigger: 'blur',
  },
  // Tag: {
  //   required: true,
  //   message: '请输入选择标签',
  //   trigger: 'input',
  // },
  description: {
    required: true,
    message: '请输入提示词描述',
    trigger: 'blur',
  },
}
const handleValidateButtonClick = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      emits('handelSubmit', formValue.value)
    } else {
      console.log(errors)
      $message.error('验证失败')
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
onMounted(() => {
  fetchData()
})
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
    background-color: #171717;
    color: #fff;
  }

  &:focus {
    background-color: #171717;
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

.formTop {
  position: relative;

  &::after {
    width: 100%;
    height: 1px;
    content: '';
    background: #6d6d6d38;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
