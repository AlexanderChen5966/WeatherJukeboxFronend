<script setup>
import { ref } from 'vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
import CityInput from './components/CityInput.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import MoviePoster from './components/MoviePoster.vue'

// 導入真實的 API 服務
import { getWeatherData } from './services/weatherService'
import { getMusicByDescription, getRandomMusic } from './services/musicService'
import { getRandomMovie } from './services/movieService'

// 導入假資料 (可選，但保留以便快速切換測試)
// import {
//   mockWeather,
//   mockMusicSuccess,
//   mockMusicNoRecommendation,
//   mockMovieSuccess,
//   mockMovieNoRecommendation,
// } from './services/mockData';

// --- 天氣相關狀態 ---
const weatherData = ref(null)
const isLoadingWeather = ref(false)
const hasWeatherError = ref(null)

// --- 音樂相關狀態 ---
const musicData = ref(null)
const isLoadingMusic = ref(false)
const hasMusicError = ref(null)

// --- 電影相關狀態 ---
const movieData = ref(null)
const isLoadingMovie = ref(false)
const hasMovieError = ref(null)

// ===================================
//             天氣功能
// ===================================
const fetchWeather = async (city) => {
  isLoadingWeather.value = true
  hasWeatherError.value = null
  weatherData.value = null

  try {
    const response = await getWeatherData(city)
    // 檢查回傳的 city_name 是否為無效輸入 (例如後端無法校正)
    // 你的後端在無法識別城市時也會返回 WeatherResponse 結構，但帶有錯誤訊息
    if (response.weather_description === '無效輸入') {
      hasWeatherError.value = response.display_text
      weatherData.value = null // 清空數據
    } else {
      weatherData.value = response
    }
  } catch (error) {
    console.error('在 App.vue 處理天氣 API 錯誤:', error)
    hasWeatherError.value = error || '無法取得天氣資訊。' // 顯示來自 service 的錯誤信息
    weatherData.value = null
  } finally {
    isLoadingWeather.value = false
  }
}

// ===================================
//             音樂功能
// ===================================
const fetchMusicByWeather = async () => {
  isLoadingMusic.value = true
  hasMusicError.value = null
  musicData.value = null

  // 確保天氣資料存在，以便傳遞天氣描述
  if (!weatherData.value || !weatherData.value.weather_description) {
    hasMusicError.value = '請先查詢天氣以獲取相關音樂推薦。'
    isLoadingMusic.value = false
    return
  }

  try {
    const description = weatherData.value.weather_description
    const response = await getMusicByDescription(description)
    musicData.value = response
    // 後端返回的 MusicRecommendation 會有 url 或 description 為 null 的情況，
    // 這會在組件內處理，但如果有 message 則優先顯示
    if (!response.url && response.message) {
      hasMusicError.value = response.message
    }
  } catch (error) {
    console.error('在 App.vue 處理音樂 API 錯誤:', error)
    hasMusicError.value = error || '無法取得音樂推薦。'
    musicData.value = null
  } finally {
    isLoadingMusic.value = false
  }
}

const fetchRandomMusic = async () => {
  isLoadingMusic.value = true
  hasMusicError.value = null
  musicData.value = null

  try {
    const response = await getRandomMusic()
    musicData.value = response
    if (!response.url && response.message) {
      hasMusicError.value = response.message
    }
  } catch (error) {
    console.error('在 App.vue 處理隨機音樂 API 錯誤:', error)
    hasMusicError.value = error || '無法取得隨機音樂推薦。'
    musicData.value = null
  } finally {
    isLoadingMusic.value = false
  }
}

// ===================================
//             電影功能
// ===================================
const fetchRandomMovie = async () => {
  isLoadingMovie.value = true
  hasMovieError.value = null
  movieData.value = null

  try {
    const response = await getRandomMovie()
    movieData.value = response
    if (!response.poster_url && response.message) {
      hasMovieError.value = response.message
    }
  } catch (error) {
    console.error('在 App.vue 處理電影 API 錯誤:', error)
    hasMovieError.value = error || '無法取得電影推薦。'
    movieData.value = null
  } finally {
    isLoadingMovie.value = false
  }
}
</script>

<template>
  <div
    id="app"
    class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 font-sans flex flex-col items-center"
  >
    <header class="text-center mb-8">
      <h1 class="text-5xl font-extrabold text-blue-800 drop-shadow-lg mb-2">天氣與娛樂推薦</h1>
      <p class="text-xl text-gray-700">查詢即時天氣，並獲取相關的音樂與電影推薦</p>
    </header>

    <main class="w-full max-w-6xl space-y-8">
      <CityInput @searchWeather="fetchWeather" />

      <WeatherDisplay
        :weatherData="weatherData"
        :loading="isLoadingWeather"
        :error="hasWeatherError"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col space-y-4">
          <MusicPlayer :musicData="musicData" :loading="isLoadingMusic" :error="hasMusicError" />
          <div class="flex justify-center space-x-4">
            <button
              @click="fetchMusicByWeather"
              :disabled="isLoadingMusic || !weatherData || hasWeatherError"
              class="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              依天氣推薦音樂
            </button>
            <button
              @click="fetchRandomMusic"
              :disabled="isLoadingMusic"
              class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 ease-in-out text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              隨機音樂
            </button>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <MoviePoster :movieData="movieData" :loading="isLoadingMovie" :error="hasMovieError" />
          <div class="flex justify-center">
            <button
              @click="fetchRandomMovie"
              :disabled="isLoadingMovie"
              class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              隨機推薦電影
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="mt-12 text-gray-500 text-sm">
      © 2025 天氣與娛樂推薦 App. All rights reserved.
    </footer>
  </div>
</template>

<style>
/* 這裡可以放置全局 CSS 樣式，但 Tailwind 鼓勵使用 utility classes */
</style>
