<template>
  <AppPage>
    <div class="h-full px-39 pt-37 lt-sm:px-10 lt-sm:pt-10">
      <div class="h-full w-full flex lt-sm:flex-wrap">
        <div class="h-95% flex-1 overflow-y-auto b-rd-10 bg-#25262B66 lt-sm:h-auto">
          <promptDetail :detail="detail" />
        </div>
        <div
          class="ml-30 h-95% w-30% overflow-x-hidden overflow-y-auto b-rd-10 bg-#2C2E3330 lt-sm:ml-10 lt-sm:h-auto lt-sm:w-100%"
        >
          <Special :special-detail="SpecialDetail" :like-prompt="likePrompt" />
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import api from '~/src/api'
import promptDetail from '../components/promptDetail.vue'
import Special from '../components/special.vue'
import { useRoute } from 'vue-router'
const loading = ref(true)
const detail = ref({})
const SpecialDetail = ref([])
const likePrompt = ref([])
const route = useRoute()

const fetchData = async () => {
  const Tag = sessionStorage.getItem('TAGS')
  loading.value = true
  const params = {
    0: { json: 10 },
    1: { json: route.query.userId },
    2: { json: route.query.userId },
    3: { json: route.query.userId },
    4: { json: { followingUserId: '', followedUserId: route.query.userId } },
    5: {
      json: {
        tags: Tag,
        limit: 5,
      },
    },
    6: { json: null, meta: { values: ['undefined'] } },
  }
  const res = await api.getCollectionsDetail({ input: JSON.stringify(params) })
  loading.value = false
  if (res && res.length) {
    detail.value = res[6]?.result?.data?.json.find((i) => i.id === route.query.id)
    SpecialDetail.value = res[6]?.result?.data?.json
    likePrompt.value = res[5]?.result?.data?.json
  }
  console.log('res:', res)
}
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
