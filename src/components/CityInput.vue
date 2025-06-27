<script setup>
import { ref } from 'vue'

const cityInput = ref('') // 綁定輸入框的值

// 定義一個自定義事件，當用戶點擊查詢時，將輸入框的值傳遞出去
const emit = defineEmits(['searchWeather'])

const handleSearch = () => {
  if (cityInput.value.trim()) {
    // 確保輸入不為空
    emit('searchWeather', cityInput.value.trim())
  } else {
    alert('請輸入縣市名稱！') // 簡單的輸入驗證
  }
}
</script>

<template>
  <div
    class="city-input flex flex-col sm:flex-row items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md"
  >
    <input
      type="text"
      v-model="cityInput"
      @keyup.enter="handleSearch"
      placeholder="輸入縣市名稱 (例如: 台北市)"
      class="w-full sm:w-80 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-3 sm:mb-0 sm:mr-3"
    />
    <button
      @click="handleSearch"
      class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out text-lg"
    >
      查詢天氣
    </button>
  </div>
</template>

<style scoped>
/* 這裡可以放 CityInput 組件特有的樣式 */
</style>
