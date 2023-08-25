<template>
  <div w-full class="lt-lg-8 h-full flex flex-col pb-17">
    <div
      class="title h-42 flex flex-shrink-0 cursor-pointer items-center justify-center bg-#2C2C2E text-16"
    >
      <icon-custom-msg size="16" mr-12></icon-custom-msg>
      展示对话样例
    </div>
    <div id="scrollRef" ref="scrollRef" class="box flex-1 overflow-y-auto">
      <div class="px-20">
        <!--  -->
        <div v-if="false" class="mb-64 mt-36 h-full w-full flex flex-row-reverse gap-2">
          <img src="@/assets/images/avatar.png" class="h-40 w-40 flex-shrink-0 b-rd-50%" alt="" />
          <div class="msg h-fit w-full flex-1 rounded-xl p-4 lg:max-w-[65%]">
            <div class="relative">
              <n-input
                v-model:value="val"
                type="textarea"
                :autosize="{
                  minRows: 3,
                  maxRows: 10,
                }"
                placeholder="在这里问你的问题。。。"
                class="w-full bg-transparent"
              />
              <div class="absolute right-0 mt-16 flex flex-row">
                <div class="w-fit flex flex-col items-center space-y-4">
                  <n-button
                    type="primary"
                    size="large"
                    class="send w-110 b-rd-10 bg-#2C2C2E text-#fff"
                  >
                    发送
                    <icon-custom-send size="16" ml-6></icon-custom-send>
                  </n-button>
                  <div class="flex flex-row items-center text-center text-xs">
                    <icon-custom-xh size="16" ml-6></icon-custom-xh>
                    <div class="pb-1">消耗 token: 0.67</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 聊天 -->
        <div v-for="item in data.messages" class="message w-full flex flex-col">
          <div
            v-if="item.role === 'assistant'"
            class="left mb-32 mt-4 w-full flex flex-row gap-8 text-#fff"
          >
            <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
            <div
              class="msg relative w-fit bg-#2C2C2ECC p-12"
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
              class="msg relative w-fit bg-#2C2C2ECC p-12"
              style="border: 1px solid #ffffff1a; border-radius: 10px 0px 10px 10px"
            >
              {{ item.content }}
            </div>
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
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14">
          <TheIcon icon="copyLink" color="#fff" type="custom" class="mr-4" />
          复制链接
        </n-button>
        <n-button class="btn w-110 b-rd-10 bg-#9B9B9B33 text-14">
          <TheIcon icon="chat" color="#fff" type="custom" class="mr-4" />
          继续聊天
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
    </div>
  </div>
</template>

<script setup>
import chatData from '@/components/common/ChatModal/data.json'
console.log('chatData:', chatData.json)
const data = ref(chatData.json[2])
const state = ref(1)
const val = ref('')
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
</style>
