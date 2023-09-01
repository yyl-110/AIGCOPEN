<template>
  <div ref="setDom" class="absolute left-23 top-28 z-4">
    <n-button
      type="info"
      size="large"
      class="btn w-135 b-rd-10 text-16 font-700 text-#fff lt-sm:w-70 lt-sm:text-14 hover:text-#fff"
      @click="showModal = true"
    >
      <icon-custom-setting size="19" class="mr-5 lt-sm:mr-4"></icon-custom-setting>
      设置
    </n-button>
    <div
      v-if="showModal"
      class="mask fixed left-0 top-0 z-1 h-full w-full"
      @click.self="showModal = false"
    ></div>
    <div
      v-if="showModal"
      class="absolute top-50 z-2 h-580 w-354 b-rd-10 bg-#262729 px-28 pt-12 pt-24 text-#fff lt-sm:px-14"
    >
      <p class="font-#fff text-16">Models</p>
      <div class="mt-12 flex justify-between">
        <div
          v-for="(item, index) in channel"
          :key="item.type"
          :class="activeChannel === index ? 'active' : ''"
          class="h-92 w-80 flex flex-col cursor-pointer items-center justify-center b-rd-10 bg-#515254 hover:bg-#939394"
          @click="choseModel(item.type, index)"
        >
          <img :src="item.img" class="h-40 w-40 b-rd-10" alt="" />
          <p class="mt-5 text-16 line-height-23 text-#fff">{{ item.title }}</p>
        </div>
      </div>
      <div v-for="(item, index) in sliderList" :key="item.name" class="row mt-26 lt-sm:mt-16">
        <div class="flex items-center justify-between">
          <n-popover trigger="hover" placement="bottom">
            <template #trigger>
              <p class="flex cursor-pointer items-center">
                {{ item.name }}
                <icon-custom-hint size="19" class="ml-3"></icon-custom-hint>
              </p>
            </template>
            <span>{{ item.desc }}</span>
          </n-popover>

          <span>{{ item.value }}</span>
        </div>
        <n-slider
          v-model:value="sliderList[index].value"
          :step="item.step"
          class="mt-8"
          :max="item.max"
          :min="item.min"
          @update:value="updateData(item.type, sliderList[index].value)"
        ></n-slider>
      </div>
    </div>
  </div>
</template>

<script setup>
import chatgpt from '@/assets/images/gpt_logo.png'
import gpt4 from '@/assets/images/GPT-4.jpeg'
import Claude from '@/assets/images/Claude.jpeg'
import { useChatStore } from '~/src/store'
const settingConfig = useChatStore()
const showModal = ref(false)
const setDom = ref(null)
const activeChannel = ref(0)
const channel = ref([
  {
    title: 'ChatGPT',
    img: chatgpt,
    type: 'gpt-3.5-turbo',
  },
  {
    title: 'GPT-4',
    img: gpt4,
    type: 'gpt-4',
  },
  {
    title: 'Claude',
    img: Claude,
    type: 'claude-v1',
  },
])
const settingData = ref(settingConfig.setting)
console.log('settingData:', settingData.value)
const sliderList = ref([
  {
    name: 'Temperature',
    step: 0.1,
    value: settingData.value['temperature'],
    desc: 'hhhhhh',
    type: 'temperature',
    max: 1,
    min: 0,
  },
  { name: 'Top P', step: 0.1, value: 1, desc: 'hhhhhh', type: 'topP', max: 1, min: 0 },
  {
    name: 'Max Tokens',
    step: 1,
    value: settingData.value['maxTokens'],
    desc: 'hhhhhh',
    type: 'maxTokens',
    max: 4096,
    min: 0,
  },
  {
    name: 'Frequency Penalty',
    step: 0.1,
    value: settingData.value['frequencyPenalty'],
    desc: 'hhhhhh',
    type: 'frequencyPenalty',
    max: 2,
    min: -2,
  },
  {
    name: 'Presence Penalty',
    step: 0.1,
    value: settingData.value['presencePenalty'],
    desc: 'hhhhhh',
    type: 'presencePenalty',
    max: 2,
    min: -2,
  },
])

const updateData = (type, val) => {
  settingData.value[type] = val
  settingConfig.setChatConfig({ ...settingData.value })
}

const choseModel = (type, index) => {
  settingConfig.setChatConfig({ ...settingData.value, model: type })
  activeChannel.value = index
}
</script>

<style lang="scss" scoped>
.btn {
  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
    background-color: rgba(197, 25, 31, 1);
  }
}

.active {
  background-color: #939394;
}
</style>
