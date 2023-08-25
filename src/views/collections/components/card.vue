<template>
  <div
    w-full
    class="card min-h-600 cursor-pointer overflow-hidden b-rd-10 bg-#D9D9D9 hover:bg-#D9D9D999"
    @click="$router.push(`/collections/detail?id=${cardData.id}`)"
  >
    <img :src="getUrl(cardData.thumbnailUrl)" class="h-30% w-full" />
    <div class="info px-14 pt-12 lt-sm:px-8">
      <h2 class="ellipsis1 w-full text-18 font-700 text-#000 lt-sm:text-16">
        {{ cardData.title }}
      </h2>
      <p
        class="ellipsis4 mb-10 mt-7 w-full text-13 line-height-18 text-#000 lt-sm:mb-5 lt-sm:mt-3 lt-sm:text-12"
      >
        {{ cardData.description }}
      </p>
      <div class="list w-full b-rd-10 bg-#FFFFFF4D px-10 lt-sm:px-5">
        <div
          v-for="item in cardData.Prompt.slice(0, 4)"
          :key="item.id"
          class="item lt-sm:40 h-50 w-full flex cursor-pointer items-center b-rd-10 lt-sm:h-40"
        >
          <img :src="getUrl(item.thumbnailURL)" class="h-34 w-34 b-rd-10 lt-sm:h-26 lt-sm:w-26" />
          <span class="ellipsis1 ml-9 text-15 font-500 text-#1B1B1B lt-sm:ml-4 lt-sm:text-13">
            {{ item.title }}
          </span>
        </div>
      </div>
      <p
        v-if="cardData.Prompt.length > 4"
        class="tip h-34 w-full flex items-center text-12 text-#9B9B9B"
      >
        {{ cardData.Prompt.length - 4 }} more prompts +
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {},
  },
})

const getUrl = (url) => {
  if (url.includes('http')) {
    return url
  }
  return import.meta.env.VITE_BASE_API + url
}
</script>

<style lang="scss" scoped>
.card {
  &:hover {
    .tip {
      color: #fff;
    }
  }

  .list {
    .item {
      margin-top: 3px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ffffff66;
        bottom: -3px;
      }

      &:hover {
        background: rgba(75, 85, 99, 0.1);
      }

      &:last-child {
        &::before {
          display: none;
        }

        border: none !important;
      }
    }
  }
}
</style>
