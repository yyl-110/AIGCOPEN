<template>
  <div w-full class="h-full flex flex-col px-22 pr-0 overflow-y-auto">
    <div id="scrollRef" ref="scrollRef" class="chat w-full flex flex-col flex-1 overflow-y-auto pr-22">
      <div v-for="(item, index) in message" :key="index" class="message w-full flex flex-col">
        <div v-if="item.role === 'assistant'" class="left mb-32 mt-4 w-full flex flex-row gap-8 text-#fff">
          <img src="@/assets/images/chatgpt.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div v-if="item.content" class="msg relative max-w-80% w-fit w-fit bg-#2C2C2ECC p-12"
            style="border-radius: 0 10px 10px 10px" v-html="md.render(item.content)"></div>
          <Loding v-else />
        </div>
        <div v-if="item.role === 'user'" class="right mb-32 mt-4 w-full flex flex-row-reverse gap-8 text-#fff">
          <img src="@/assets/images/aigcopen.png" alt="" class="avatar h-40 w-40 b-rd-50%" />
          <div class="msg relative max-w-80% w-fit flex bg-#2C2C2ECC p-12" style="border-radius: 10px 0 10px 10px">
            <div>
              <div class="innerUser relative wh-full" style="white-space: pre-wrap">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '@/views/chat/data.json'
import { md } from '@/utils/common/markdown'
console.log('data:', data)
const msg = data.json[2].messages

const message = ref(msg)

const fetchData = () => {
}
</script>

<style lang="scss" scoped></style>
