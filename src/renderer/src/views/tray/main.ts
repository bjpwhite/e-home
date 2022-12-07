import { createApp } from 'vue'
import App from './index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/global.less'
import '@/assets/css/elementui.less'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app-tray')
