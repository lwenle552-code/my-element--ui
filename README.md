## My Element UI

这是一个基于 vue3+ts 的组件库，旨在提供一套高质量、可复用的UI组件，帮助开发者快速构建Web应用。

- 专为Web应用设计的企业级UI。
- 提供一套开箱即用的高质量Vue组件。
- 使用 TypeScript 编写，具备可预测的静态类型。
- 强大的主题定制功能，满足各种细节需求。

## 安装

使用 pnpm 安装：

```bash
pnpm install my-element-ui
```

## 快速上手

在你的项目入口文件 (例如 `main.ts`) 中引入组件库和样式：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import MyElementUI from 'my-element-ui'
import 'my-element-ui/theme-chalk/src/index.scss'

const app = createApp(App)

app.use(MyElementUI)
app.mount('#app')
```

## 项目结构

本项目采用基于 pnpm workspace 的 monorepo 结构。

```
.
├── packages
│   ├── components // 存放所有组件
│   ├── theme-chalk // 存放组件样式
│   └── utils // 公共工具函数
├── play // 用于调试组件的示例环境
├── docs // 项目文档
└── ...
```

## 贡献

欢迎各种形式的贡献，包括提交问题、功能请求等！
你可以到 [Issues 页面](https://github.com/your-username/my-element-ui/issues) 查看。

