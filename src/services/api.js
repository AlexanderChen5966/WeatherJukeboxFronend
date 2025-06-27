// src/services/api.js
import axios from 'axios'

// 根據環境變數設定後端 API 的基礎 URL
// 在開發環境中，這通常是你的 FastAPI 伺服器地址 (例如: http://localhost:8000)
// 在部署到生產環境時，你需要設定正確的 API 網址
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://weatherjukeboxapi.zeabur.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 請求超時時間 (10 秒)
})

// 可選：添加請求攔截器
api.interceptors.request.use(
  (config) => {
    // 例如，可以在這裡添加認證 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 可選：添加響應攔截器
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 統一處理 API 錯誤
    if (error.response) {
      // 伺服器有響應，但狀態碼不是 2xx
      console.error('API Error Response:', error.response.data)
      console.error('Status:', error.response.status)
      console.error('Headers:', error.response.headers)
      if (error.response.data && error.response.data.detail) {
        // FastAPI 的 HTTPException 通常會在 detail 字段中包含錯誤信息
        return Promise.reject(error.response.data.detail)
      }
    } else if (error.request) {
      // 請求已發出，但沒有收到響應
      console.error('API Error Request:', error.request)
      return Promise.reject('網路錯誤：無法連接到伺服器。')
    } else {
      // 在設置請求時觸發了某些錯誤
      console.error('Error Message:', error.message)
      return Promise.reject('發生未知錯誤。')
    }
    return Promise.reject(error.message) // 返回錯誤信息
  },
)

export default api
