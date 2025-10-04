import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@zi-shui/components/icon'
import '@zi-shui/theme-chalk/src/index.scss'
import Button from '@zi-shui/components/button'
import Input from '@zi-shui/components/input'
import FormItem from '@zi-shui/components/form'

const plugins = [Icon, Button, Input, FormItem]

const app = createApp(App)
plugins.forEach(plugin => {
  app.use(plugin) // 只通过插件注册，不要重复注册
})
app.mount('#app') // 只挂载一次
