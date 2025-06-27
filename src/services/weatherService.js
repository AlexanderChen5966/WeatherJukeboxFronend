// src/services/weatherService.js
import api from './api'

/**
 * 從後端 API 獲取指定城市的天氣資訊。
 * @param {string} city - 城市名稱。
 * @returns {Promise<object>} - 返回 WeatherResponse 格式的數據。
 */
export async function getWeatherData(city) {
  try {
    const response = await api.get('/api/weather', {
      params: { city: city },
    })
    // 你的 FastAPI 後端 WeatherResponse 模型已經包含 city_name 等字段
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    // 拋出錯誤以便 App.vue 捕獲並顯示
    throw error
  }
}
