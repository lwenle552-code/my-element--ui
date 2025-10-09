# Input 输入框

用于接收用户输入内容。

## 基础用法

```vue
<z-input v-model="value" placeholder="请输入内容" />
```

## 属性

| 属性        | 说明     | 类型    | 默认值 |
| ----------- | -------- | ------- | ------ |
| modelValue  | 绑定值   | string  | ''     |
| placeholder | 占位文本 | string  | ''     |
| disabled    | 禁用状态 | boolean | false  |
| clearable   | 可清空   | boolean | false  |
| prefixIcon  | 前缀图标 | string  | -      |
| suffixIcon  | 后缀图标 | string  | -      |

## 事件

| 事件  | 说明     | 回调参数 |
| ----- | -------- | -------- |
| input | 输入事件 | (value)  |
| focus | 获得焦点 | (event)  |
| blur  | 失去焦点 | (event)  |
