<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap">
        <div class="h-95% flex-1 overflow-y-auto b-rd-10 bg-#25262B66 lt-sm:h-auto">
          <promptDetail />
        </div>
        <div
          class="ml-30 h-95% w-30% overflow-y-auto b-rd-10 bg-#2C2E3330 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%"
        >
          <Special />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import api from '~/src/api'
import promptDetail from '../components/promptDetail.vue'
import Special from '../components/special.vue'
const loading = ref(true)
const detail = ref({})

const fetchData = async () => {
  loading.value = true
  const params = {
    0: { json: 10 },
    1: { json: 208 },
    2: { json: 208 },
    3: { json: 208 },
    4: { json: { followingUserId: '', followedUserId: 208 } },
    5: {
      json: {
        tags: [
          '有创意的',
          '英语',
          '市场营销',
          ' 想法',
          '头脑风暴',
          '社交媒体',
          'Copywriting',
          '内容营销',
          '业务',
          '启动',
          '创业',
          '生产力',
          '营销计划',
          '业务发展',
          'template',
          '商业计划',
        ],
        limit: 5,
      },
    },
    6: { json: null, meta: { values: ['undefined'] } },
  }
  const res = await api.getCollectionsDetail({ input: JSON.stringify(params) })
  loading.value = false
  if (res && res.length) {
    detail.value = res[1]?.result?.data?.json
  }
  console.log('res:', res)
}
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
