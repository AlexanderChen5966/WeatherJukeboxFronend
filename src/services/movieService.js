// src/services/movieService.js
import api from './api'

/**
 * 從後端 API 獲取隨機電影推薦。
 * @returns {Promise<object>} - 返回 MovieRecommendation 格式的數據。
 */
export async function getRandomMovie() {
  try {
    const response = await api.get('/api/random_movie')
    return response.data
  } catch (error) {
    console.error('Error fetching random movie:', error)
    throw error
  }
}
