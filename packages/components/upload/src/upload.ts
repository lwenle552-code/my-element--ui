import { ExtractPropTypes, PropType } from 'vue'
import { isString } from '@vue/shared'

export interface UploadRawFile extends File {
  uid: string
}

export interface UploadProgressEvent extends ProgressEvent {
  percentage: number
}

export const baseProps = {
  // 上传的地址
  action: {
    type: String,
    required: true
  },
  // 上传的文件字段名
  name: {
    type: String,
    default: 'file'
  },
  // 上传请求的 http 方法
  method: {
    type: String,
    default: 'post'
  },
  // 设置上传的请求头部
  headers: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  // 上传接口的额外参数
  data: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  },
  // 是否支持拖拽上传文件
  drag: {
    type: Boolean,
    default: false
  },
  // 接受上传的文件类型
  accept: {
    type: String,
    default: ''
  },
  // 是否支持多选文件
  multiple: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
  beforeUpload: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: () => true
  },
  // 文件上传开始时的回调
  onStart: {
    type: Function as PropType<(file: UploadRawFile) => void>,
    default: () => {}
  },
  // 文件上传时的回调
  onProgress: {
    type: Function as PropType<
      (e: UploadProgressEvent, file: UploadRawFile) => void
    >,
    default: () => {}
  },
  // 文件上传成功时的回调
  onSuccess: {
    type: Function as PropType<(res: any, file: UploadRawFile) => void>,
    default: () => {}
  },
  // 文件上传失败时的回调
  onError: {
    type: Function as PropType<(err: any, file: UploadRawFile) => void>,
    default: () => {}
  },
  // 文件被移除时的回调
  onRemove: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: () => {}
  }
} as const

export const uploadProps = baseProps

export type UploadProps = ExtractPropTypes<typeof uploadProps>
