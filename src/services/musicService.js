// src/services/musicService.js
import api from './api'

/**
 * 根據天氣描述從後端 API 獲取音樂推薦。
 * @param {string} description - 天氣描述。
 * @returns {Promise<object>} - 返回 MusicRecommendation 格式的數據。
 */
export async function getMusicByDescription(description) {
  try {
    const response = await api.get('/api/recommend_music', {
      params: { desc: description },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching music by description:', error)
    throw error
  }
}

/**
 * 從後端 API 獲取隨機音樂推薦。
 * @returns {Promise<object>} - 返回 MusicRecommendation 格式的數據。
 */
export async function getRandomMusic() {
  try {
    const response = await api.get('/api/random_music')
    return response.data
  } catch (error) {
    console.error('Error fetching random music:', error)
    throw error
  }
}
