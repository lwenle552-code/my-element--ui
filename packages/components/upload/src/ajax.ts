import { UploadProgressEvent, UploadRawFile } from './upload'

// 定义 RequestOptions 接口
export interface RequestOptions {
  action: string
  method: string
  headers: Record<string, string>
  data: Record<string, string>
  name: string
  file: File
  onProgress: (e: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  onError: (error: any) => void
}

export function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest()
  const action = options.action

  xhr.open(options.method, action, true)

  // 监听上传进度事件
  xhr.upload.addEventListener('progress', e => {
    // 加载的总数 和 已经加载的
    const processEvents = e as UploadProgressEvent
    // 计算上传百分比，确保 total > 0 避免除以零
    processEvents.percentage = e.total > 0 ? (e.loaded / e.total) * 100 : 0

    // 调用外部传入的进度回调函数
    options.onProgress(processEvents)
  })

  const headers = options.headers
  const formData = new FormData()

  // 设置请求头（除了 Content-Type，因为浏览器会自动设置）
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      // 不手动设置 Content-Type，让浏览器自动设置 multipart/form-data
      if (key.toLowerCase() !== 'content-type') {
        xhr.setRequestHeader(key, value)
      }
    }
  }

  // 如果有额外的表单数据
  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      formData.append(key, value)
    }
  }

  // 添加文件本身
  formData.append(options.name, options.file)

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      options.onSuccess(xhr.response)
    } else {
      options.onError(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`))
    }
  }

  xhr.addEventListener('error', function () {
    options.onError(new Error('Network error'))
  })

  xhr.send(formData)
  return xhr
}
