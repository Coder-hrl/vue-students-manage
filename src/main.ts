import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'normalize.css'
import '@/assets/css/reset.scss'
import modal from './utils/model'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElIcons from '@element-plus/icons-vue'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import store from './store'


const app = createApp(App)
app.config.globalProperties.$modal = modal
app.use(store).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
store.dispatch('getInitialDataAction')
// for (const icon as any in ElIcons) {
//   app.component(icon, ElIcons[icon])
// }
