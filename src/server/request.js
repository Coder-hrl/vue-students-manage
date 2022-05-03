import axios from 'axios'
// import { ElMessage } from 'element-plus'
// import router from '../router'
import localCache from '@/utils/cache'

const request = axios.create({
  baseURL: 'http://39.96.113.56:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
// request.defaults.withCredentials = true
request.interceptors.request.use((config) => {
  if (localCache.getCache('token')) {
    config.headers['token'] = localCache.getCache('token')
  }
  // 请求头带上token
  // request.headers['Cookie'] = '21312'

  return config
})
request.interceptors.response.use((response) => {
  return response.data
})
export default request
