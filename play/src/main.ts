import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@zi-shui/components/icon'
import '@zi-shui/theme-chalk/src/index.scss'
import Button from '@zi-shui/components/button'
import Input from '@zi-shui/components/input'
import Upload from '@zi-shui/components/upload'
import Calendar from '@zi-shui/components/calendar'
import { FormItem, Form } from '@zi-shui/components/Form'

const plugins = [Icon, Button, Input, FormItem, Form, Upload, Calendar]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件

app.mount('#app')
