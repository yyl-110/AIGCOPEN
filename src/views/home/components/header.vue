<template>
  <div class="header px-50 pt-69 lt-sm:px-15 lt-sm:pt-30">
    <div class="title flex flex-wrap justify-center flex-items-center">
      <div class="flex flex-nowrap flex-items-center">
        <icon-custom-logo class="flex-shrink-0 lt-sm:text-24" color-primary></icon-custom-logo>
        <img src="@/assets/images/logo_text.png" alt="" class="ml-22 w-300 lt-sm:m-0 lt-sm:ml-5 lt-sm:w-140" />
      </div>
      <span class="ml-5 text-nowrap text-32 text-#fff lt-sm:text-12">中国最大PROMPT提示词社区</span>
    </div>
    <div class="mt-64 min-h-166 w-full flex flex-nowrap lt-sm:mt-32 lt-sm:flex-wrap">
      <n-input v-model:value="searchData" type="textarea" :autosize="{
        minRows: 3,
        maxRows: 3,
      }" placeholder="输入关键词，搜索Prompt或与AI进行对话"
        class="flex-1 resize-none border-1 border-#7D7D7D b-rd-10 border-solid text-22 lg:text-22 lt-sm:text-16 md:text-16 sm:text-16"
        @input="updateValue" />
      <div
        class="ml-28 w-200 flex flex-col justify-between lt-sm:ml-0 lt-sm:mt-20 lt-sm:w-full lt-sm:flex-row lt-sm:justify-center">
        <n-button round size="large" type="primary"
          class="bt1 h-72 b-rd-100 text-20 lt-sm:h-50 lt-sm:w-140 focus:bg-primary lt-md:text-16">
          <template #icon>
            <icon-custom-search color-primary></icon-custom-search>
          </template>
          搜索
        </n-button>
        <n-button round size="large" type="primary" class="bt2 h-72 b-rd-100 text-20 lt-sm:h-50 lt-sm:w-140 lt-sm:text-16"
          @click="authVerifyLink('/chat', $router)">
          <template #icon>
            <icon-custom-chatIcon color-primary></icon-custom-chatIcon>
          </template>
          对话
        </n-button>
      </div>
    </div>
    <div class="bottom_line mt-39 h-1 w-full bg-#404040 lt-sm:mt-12"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import _ from 'lodash'
import { authVerifyLink } from '~/src/utils';
const emit = defineEmits(['updateValue'])
const props = defineProps({
  searchValue: {
    type: String,
    default: '',
  },
})
const searchData = ref('')
const updateValue = _.debounce((e) => {
  emit('updateValue', e)
}, 500)

watch(
  () => props.searchValue,
  (val) => {
    searchData.value = val
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.n-button {
  color: #fff;

  &:active {
    color: #fff;
  }

  &:focus {
    color: #fff;
    background-color: unset;
  }

  &:hover {
    color: #fff;
    background-color: transparent;
  }

  &.bt1 {
    &:focus {
      background: #1a1b1e;
    }
  }

  &.bt2 {
    &:focus {
      background: rgba(236, 236, 236, 0.4);
    }
  }

  .n-button__border {
    border-color: transparent;
  }
}

.bt2 {
  background-color: rgba(236, 236, 236, 0.4);
}
</style>
