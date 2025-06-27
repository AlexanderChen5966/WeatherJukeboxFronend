<script setup>
import { computed } from 'vue'

const props = defineProps({
  movieData: {
    type: Object,
    default: null, // 推薦的電影資料
  },
  loading: {
    type: Boolean,
    default: false, // 是否正在加載中
  },
  error: {
    type: String,
    default: null, // 錯誤訊息
  },
})

// 計算電影海報的完整 URL
const posterFullUrl = computed(() => {
  // 後端會回傳 /static/movie/xxx.jpg，這裡直接用即可
  return props.movieData && props.movieData.poster_url ? props.movieData.poster_url : null
})
</script>

<template>
  <div
    class="movie-poster bg-white p-6 rounded-lg shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center"
  >
    <h3 class="text-2xl font-bold text-gray-800 mb-4">電影推薦</h3>
    <div v-if="loading" class="text-gray-600">
      <p>載入電影推薦中...</p>
      <div class="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="error" class="text-red-600 font-bold">
      <p>錯誤：{{ error }}</p>
    </div>
    <div v-else-if="movieData && movieData.poster_url" class="w-full">
      <p class="text-xl text-gray-700 font-semibold mb-4">{{ movieData.message }}</p>
      <img
        :src="posterFullUrl"
        :alt="movieData.movie_title || '電影海報'"
        class="max-w-full h-auto max-h-64 mx-auto object-contain rounded-md shadow-md"
      />
      <p class="text-lg text-gray-600 mt-4">{{ movieData.movie_title }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p class="text-lg">{{ movieData ? movieData.message : '點擊按鈕獲取電影推薦' }}</p>
    </div>
  </div>
</template>

<style scoped>
/* MoviePoster 組件特有樣式 */
</style>
