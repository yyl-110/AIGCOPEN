<template>
  <div w-full class="h-full flex flex-col px-22 pb-26 pr-0">
    <div
      id="scrollRef"
      ref="scrollRef"
      class="chat w-full flex flex-col flex-1 overflow-y-auto pr-22"
    >
      <div v-for="item in data.messages" class="message w-full flex flex-col">
        <div
          v-if="item.role === 'assistant'"
          class="left mb-32 mt-4 w-full flex flex-row gap-8 text-#fff"
        >
          <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div
            class="msg relative max-w-80% w-fit bg-#2C2C2ECC p-12"
            style="border: 1px solid #ffffff1a; border-radius: 0 10px 10px 10px"
          >
            {{ item.content }}
          </div>
        </div>
        <div
          v-if="item.role === 'user'"
          class="right mb-32 mt-4 w-full flex flex-row-reverse gap-8 text-#fff"
        >
          <img src="@/assets/images/avatar.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div
            class="msg relative max-w-80% w-fit bg-#2C2C2ECC p-12"
            style="border: 1px solid #ffffff1a; border-radius: 10px 0px 10px 10px"
          >
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <div relative pr-22>
      <div
        v-if="chatState === 1"
        class="lt-lg:gp-8 absolute top--45 z-1 w-full flex justify-center gap-16"
      >
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14">
          <TheIcon icon="refresh" color="#fff" type="custom" class="mr-4" />
          重新生成
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14" @click="copy">
          <TheIcon icon="copyLink" color="#fff" type="custom" class="mr-4" />
          复制链接
        </n-button>
      </div>
      <n-input
        placeholder="在这里输入你的问题"
        size="large"
        autofocus
        class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D"
      >
        <template #suffix>
          <n-button quaternary @click="addChat">
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
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()

const props = defineProps({
  data: { type: Object, default: () => {} },
  chatState: { type: Number, default: 2 },
})
const addChat = () => {
  scrollToBottom()
}

const copy = () => {
  // 创建输入框元素
  const input = document.createElement('input') //不会保留文本格式
  //如果要保留文本格式，比如保留换行符，或者多行文本，可以使用  textarea 标签，再配和模板字符串 ` `
  //const input = document.createElement('textarea')
  // 将想要复制的值
  input.value = 221
  // 页面底部追加输入框
  document.body.appendChild(input)
  // 选中输入框
  input.select()
  // 执行浏览器复制命令
  document.execCommand('Copy')
  // 弹出复制成功信息
  $message.success('复制成功')
  // 复制后移除输入框
  input.remove()
}

watch(
  () => props.data,
  () => {
    scrollToBottom()
    console.log('props.data:', props.data)
  },
  { deep: true }
)
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
</style>
