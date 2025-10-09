# Upload 文件上传

用于文件选择和上传。

## 基础用法

```vue
<z-upload action="/upload" :onSuccess="handleSuccess">
  <z-button type="primary">点击上传</z-button>
</z-upload>
```

## 属性

| 属性         | 说明         | 类型     | 默认值 |
| ------------ | ------------ | -------- | ------ |
| action       | 上传地址     | string   | -      |
| headers      | 请求头       | object   | {}     |
| multiple     | 多选文件     | boolean  | false  |
| beforeUpload | 上传前钩子   | function | -      |
| onSuccess    | 上传成功回调 | function | -      |
| onError      | 上传失败回调 | function | -      |

## 事件

| 事件      | 说明     | 回调参数         |
| --------- | -------- | ---------------- |
| onSuccess | 上传成功 | (response, file) |
| onError   | 上传失败 | (error, file)    |
