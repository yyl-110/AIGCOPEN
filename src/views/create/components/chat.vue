<template>
  <div class="relative wh-full flex flex-col overflow-hidden">
    <img src="@/assets/images/logo_text.png" class="logoText absolute w-240" />
    <div id="scrollRef" ref="scrollRef" class="box flex-1 overflow-y-auto px-20 lt-sm:px-5">
      <!-- 聊天 -->
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
    <div class="bottom relative flex-shrink-0 px-20" style="overflow: initial">
      <div class="lt-lg:gp-8 absolute top--45 z-1 flex gap-16">
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14">
          <TheIcon icon="del" color="#fff" type="custom" class="mr-4" />
          清除
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14">
          <TheIcon icon="refresh" color="#fff" type="custom" class="mr-4" />
          重新生成
        </n-button>
      </div>
      <n-input
        placeholder="在这里输入你的问题"
        size="large"
        autofocus
        class="h-45 flex-shrink-0 b-rd-10 bg-#000000 text-#47484D"
      >
        <template #suffix>
          <n-button type="primary" class="send h-full w-98 b-rd-r-10 bg-#2C2C2E text-#fff">
            发送
            <icon-custom-send size="16" ml-6></icon-custom-send>
          </n-button>
        </template>
      </n-input>
      <div
        class="absolute bottom--16 right-20 ml-auto mt-1 flex flex-row items-center gap-1 text-right text-xs space-x-1"
      >
        <icon-custom-hint size="16" class="mr-4"></icon-custom-hint>
        <div class="pb-1">消耗 token: 0.05</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import chatData from '@/components/common/ChatModal/data.json'
console.log('chatData:', chatData.json)
const data = ref(chatData.json[2])
</script>

<style lang="scss" scoped>
:deep(.n-input-wrapper) {
  padding-right: 0;
}

.logoText {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}
</style>
