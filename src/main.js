import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import { ElMessageBox } from 'element-plus'

const app = createApp(App)
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.use(router).use(store).mount('#app')
