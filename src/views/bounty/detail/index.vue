<template>
  <AppPage>
    <div class="wh-full px-40 text-#fff lt-sm:px-15">
      <div class="mt-40 w-full b-rd-10 bg-#25262B66 px-45 pb-28 lt-sm:mt-15 lt-sm:px-15">
        <div
          class="h-90 w-full flex items-end pb-14 text-30 font-700 lt-sm:h-70 lt-sm:pb-14 lt-sm:text-20"
        >
          工作效率&生产力
        </div>
        <div class="mt-19 flex items-center lt-sm:px-10">
          <n-button
            type="info"
            class="btn w-166 b-rd-10 font-700 text-#fff lt-sm:w-120"
            size="large"
            disabled
          >
            参与该任务
          </n-button>
          <div class="ml-26 flex flex flex-row-reverse items-center justify-end lt-sm:ml-13">
            <img src="@/assets/images/avatar.png" class="img h-24 w-24 b-rd-50%" alt="" />
            <img src="@/assets/images/avatar.png" class="img h-24 w-24 b-rd-50%" alt="" />
            <img src="@/assets/images/avatar.png" class="img h-24 w-24 b-rd-50%" alt="" />
          </div>
        </div>
        <div class="mt-25 h-136 flex">
          <div class="box ellipsis3 mr-21 flex-1 b-rd-10 bg-#00000019 px-13 pt-16 lt-sm:px-4">
            这个主题专注于帮助用户提高工作效率并实现职业目标的任务。从为新产品发布创建一个引人注目的产品描述，到为产品或企业撰写一个引人入胜且高转化率的邮件、微博、微信稿件，这个主题中的任务为了提高生产力，帮助用户在职业生涯中取得成功。
          </div>
          <div
            class="ml-15 h-full w-94 flex flex-col items-center justify-center b-rd-10 bg-#FFFFFF0F"
          >
            <span class="text-32 font-700 line-height-46">4</span>
            <span>参与</span>
          </div>
          <div
            class="ml-15 h-full w-94 flex flex-col items-center justify-center b-rd-10 bg-#FFFFFF0F"
          >
            <span class="text-32 font-700 line-height-46">18天</span>
            <span>剩余时间</span>
          </div>
          <div
            class="ml-15 h-full w-94 flex flex-col items-center justify-center b-rd-10 bg-#FFFFFF0F"
          >
            <span class="text-32 font-700 line-height-46">¥500</span>
            <span>赏金</span>
          </div>
        </div>
        <div
          class="list mt-32 min-h-200 w-full b-rd-10 bg-#00000033 px-28 pt-24 lt-sm:mt-16 lt-sm:px-14"
        >
          <div class="flex flex-wrap filter">
            <div
              v-for="(item, index) in screenList"
              :key="index"
              :class="index === activeScreen ? 'active' : ''"
              class="screenItem ml-8 mt-9 flex cursor-pointer justify-center flex-items-center b-rd-8 bg-#000000 px-20 py-9 text-16 text-#CACACA lt-sm:ml-4 hover:bg-#C5191F lt-sm:px-10 lt-sm:py-4 lt-sm:text-14 hover:text-#fff"
              @click="activeScreen = index"
            >
              <TheIcon :icon="item.icon" type="custom" class="mr-9 lt-sm:mr-4" />
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="chatList mt-28 w-full lt-sm:mt-14">
            <n-grid cols="2 s:3 m:4 l:4 xl:4 2xl:5" :x-gap="16" :y-gap="12" responsive="screen">
              <n-grid-item v-for="item in 20">
                <card-item />
              </n-grid-item>
            </n-grid>
            <empty v-if="false" />
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import cardItem from '../components/cardItem.vue'
const activeScreen = ref(0)
const screenList = ref([
  { title: '趋势', icon: 'trend' },
  { title: '排名领先', icon: 'rank' },
])
</script>

<style lang="scss" scoped>
.screenItem {
  transition: all 0.3s;

  &.active {
    background-color: #c5191f;
    color: #fff;
  }

  &:first-child {
    margin-left: 0;
  }
}

.btn {
  &.n-button--disabled {
    background-color: #cacaca;
    color: #fff;
    opacity: 1;

    &:hover {
      background-color: #cacaca;
    }
  }

  &:hover {
    background-color: #c5191f;
    color: #fff;
  }

  &:focus {
    background-color: #c5191f;
    color: #fff;
  }
}

.img {
  &:not(:first-child) {
    margin-right: -12px;
  }
}
</style>
