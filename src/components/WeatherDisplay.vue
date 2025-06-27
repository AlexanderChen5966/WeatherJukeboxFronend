<script setup>
import { computed } from 'vue'

const props = defineProps({
  weatherData: {
    type: Object,
    default: null, // 如果沒有數據，則為 null
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

// 根據 weatherType 動態選擇天氣圖標或背景圖片
const weatherImage = computed(() => {
  if (!props.weatherData || !props.weatherData.current_weather_type) {
    return 'default.png' // 預設圖標，或者可以為空
  }
  switch (props.weatherData.current_weather_type) {
    case '晴':
      return 'sunny.png'
    case '雨':
      return 'rainy.png'
    case '陰':
      return 'cloudy_dark.png'
    case '多雲':
      return 'cloudy.png'
    case '雪':
      return 'snowy.png'
    default:
      return 'default.png' // 未知類型
  }
})

// 注意：你需要將這些 SVG 或圖片檔案放到 `public/images/weather/` 路徑下
// 例如：public/images/weather/sunny.svg
// 請確保這些圖片檔案真實存在，否則會顯示不出來
</script>

<template>
  <div
    class="weather-display bg-white p-6 rounded-lg shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center"
  >
    <div v-if="loading" class="text-gray-600">
      <p>載入天氣資料中...</p>
      <div class="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="error" class="text-red-600 font-bold">
      <p>錯誤：{{ error }}</p>
      <p class="text-sm text-gray-500">請檢查輸入或稍後再試。</p>
    </div>
    <div v-else-if="weatherData">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-4">{{ weatherData.city_name }}</h2>
      <img :src="`/images/weather/${weatherImage}`" alt="天氣圖標" class="w-24 h-24 mx-auto mb-4" />
      <p class="text-xl text-gray-700 font-semibold mb-2">{{ weatherData.weather_description }}</p>
      <p class="text-lg text-gray-600">{{ weatherData.display_text }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p class="text-lg">請輸入縣市名稱查詢天氣</p>
      <img src="/images/weather/default.png" alt="預設天氣圖標" class="w-24 h-24 mx-auto mt-4" />
    </div>
  </div>
</template>

<style scoped>
/* 這裡可以放 WeatherDisplay 組件特有的樣式 */
/* 目前主要依賴 Tailwind CSS */
</style>
