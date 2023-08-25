<template>
  <AppPage>
    <div class="flex-1">
      <div class="h-full px-39 text-#fff lt-sm:px-10">
        <div class="title mt-35 text-18 lt-sm:mt-15">分类集合</div>
        <div v-if="loading" class="wh-full flex items-center justify-center">
          <Loading />
        </div>
        <div class="list mt-25 lt-sm:mt-10">
          <empty v-if="!loading && listData.length === 0" text="暂无数据!" :show-btn="false" />
          <n-grid cols="2 s:3 m:4 l:4 xl:4 2xl:5" :x-gap="12" :y-gap="22" responsive="screen">
            <n-grid-item v-for="item in listData" :key="item.id">
              <card :card-data="item" />
            </n-grid-item>
          </n-grid>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import api from '~/src/api'
import card from './components/card.vue'
import empty from '~/src/components/common/empty.vue'
import Loading from '@/components/common/Loading/index.vue'
const listData = ref([])
const loading = ref(true)
const fetchData = async () => {
  loading.value = true
  const params = { 0: { json: 10 }, 1: { json: null, meta: { values: ['undefined'] } } }
  try {
    const res = await api.getCollections({ input: JSON.stringify(params) })
    loading.value = false
    if (res && res.length) {
      listData.value = res[1]?.result?.data?.json
    }
  } catch (error) {
    console.log('error:', error)
    loading.value = false
  }
}
onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
