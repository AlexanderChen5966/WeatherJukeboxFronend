// src/services/mockData.js

// 假的天氣資料
export const mockWeather = {
  success: true, // 自定義一個成功標誌，方便測試
  data: {
    city_name: '假台北市',
    weather_description: '多雲時陰短暫陣雨',
    display_text: '假台北市 6/26 中午到傍晚是：多雲時陰短暫陣雨，降雨機率30%喔！',
    current_weather_type: '多雲', // 可以是 "晴", "雨", "陰", "多雲", "雪"
  },
  error: null,
}

// 假的音樂推薦資料 (成功)
export const mockMusicSuccess = {
  success: true,
  data: {
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
    description: 'Rick Astley - Never Gonna Give You Up (假資料)',
    message: '已為您推薦與「假多雲」相關的音樂：Rick Astley - Never Gonna Give You Up',
  },
  error: null,
}

// 假的音樂推薦資料 (無推薦)
export const mockMusicNoRecommendation = {
  success: false,
  data: {
    url: null,
    description: null,
    message: '找不到與「假下雨」相關的未播放音樂，或所有音樂已播放完畢。',
  },
  error: null,
}

// 假的電影推薦資料 (成功)
export const mockMovieSuccess = {
  success: true,
  data: {
    poster_url: '/static/movie/mock_movie_poster.jpg', // 確保這個圖片存在於 public/static/movie/
    movie_title: '假電影海報 - The Great Mock',
    message: '為您推薦電影：假電影海報 - The Great Mock',
  },
  error: null,
}

// 假的電影推薦資料 (無推薦)
export const mockMovieNoRecommendation = {
  success: false,
  data: {
    poster_url: null,
    movie_title: null,
    message: '所有電影都已推薦完畢！列表已重置。',
  },
  error: null,
}

// 為了讓 mockMovieSuccess 的 poster_url 正常顯示，你需要在 `public/static/movie/` 路徑下放一張圖片
// 你可以手動建立這些資料夾，然後放一張名為 `mock_movie_poster.jpg` 的圖片進去
// 例如，在你的專案根目錄下：
// your-frontend-app/public/static/movie/mock_movie_poster.jpg
