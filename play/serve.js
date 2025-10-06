import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import cors from 'cors'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// 添加详细的 CORS 支持
app.use(
  cors({
    origin: 'http://localhost:5173', // 允许的源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头部
    credentials: true // 是否允许携带凭证
  })
)

// 处理预检请求
app.options(
  '*',
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)

// 配置 multer 中间件用于处理文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 确保这个目录存在
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

// 重要：使用配置的 storage 初始化 multer
const upload = multer({ storage: storage })

// 创建 uploads 目录（如果不存在）
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 处理文件上传的路由
app.post('/upload', upload.single('file'), (req, res) => {
  // 检查 req.file 是否存在
  if (!req.file) {
    return res.status(400).json({ error: '没有文件被上传' })
  }

  // 返回成功响应
  res.json({
    message: '文件上传成功',
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    path: req.file.path
  })

  // 打印文件信息到控制台，方便调试
  console.log('文件已保存:', {
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    path: req.file.path
  })
})

// 处理根路径
app.get('/', (req, res) => {
  res.send('文件上传服务器正在运行')
})

app.listen(port, () => {
  console.log(`服务器正在 http://localhost:${port} 上运行`)
})
