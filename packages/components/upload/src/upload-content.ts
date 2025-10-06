import { PropType } from 'vue'
import { baseProps, UploadProgressEvent, UploadRawFile } from './upload'

const NOOP = () => {}
export const uploadContentProps = {
  ...baseProps,
  beforeUpload: {
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: () => true
  },
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onProgress: {
    type: Function as PropType<
      (e: UploadProgressEvent, rawFile: UploadRawFile) => void
    >,
    default: NOOP
  },
  onRemove: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onError: {
    type: Function as PropType<(err: any, rawFile: UploadRawFile) => void>,
    default: NOOP
  },
  onSuccess: {
    type: Function as PropType<(res: any, rawFile: UploadRawFile) => void>,
    default: NOOP
  }
} as const
