<script setup>
import { computed } from 'vue'

const props = defineProps({
  musicData: {
    type: Object,
    default: null, // 推薦的音樂資料
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

// 計算 YouTube 嵌入式播放器的 URL
const youtubeEmbedUrl = computed(() => {
  if (props.musicData && props.musicData.url) {
    // 簡單地將 YouTube 影片 URL 轉換為嵌入式 URL
    // 這是一個簡化的處理，實際可能需要更複雜的解析
    try {
      const urlObj = new URL(props.musicData.url)
      const videoId = urlObj.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1` // autoplay=1 自動播放
      }
    } catch (e) {
      console.error('無效的 YouTube URL:', props.musicData.url, e)
    }
  }
  return null
})
</script>

<template>
  <div
    class="music-player bg-white p-6 rounded-lg shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center"
  >
    <h3 class="text-2xl font-bold text-gray-800 mb-4">音樂推薦</h3>
    <div v-if="loading" class="text-gray-600">
      <p>載入音樂推薦中...</p>
      <div class="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="error" class="text-red-600 font-bold">
      <p>錯誤：{{ error }}</p>
    </div>
    <div v-else-if="musicData && musicData.url" class="w-full">
      <p class="text-xl text-gray-700 font-semibold mb-4">{{ musicData.message }}</p>
      <div class="relative w-full" style="padding-bottom: 56.25%">
        <iframe
          v-if="youtubeEmbedUrl"
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full rounded-md"
        ></iframe>
      </div>
      <p class="text-lg text-gray-600 mt-4">{{ musicData.description }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p class="text-lg">{{ musicData ? musicData.message : '點擊按鈕獲取音樂推薦' }}</p>
    </div>
  </div>
</template>

<style scoped>
/* MusicPlayer 組件特有樣式 */
</style>
