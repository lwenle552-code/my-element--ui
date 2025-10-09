# Calendar 日历

用于展示日期信息。

## 基础用法

```vue
<z-calendar v-model="currentDate" />
```

## 属性

| 属性       | 说明     | 类型   | 默认值     |
| ---------- | -------- | ------ | ---------- |
| modelValue | 当前日期 | Date   | new Date() |
| type       | 日历类型 | string | 'date'     |

## 事件

| 事件   | 说明     | 回调参数 |
| ------ | -------- | -------- |
| change | 日期变化 | (date)   |
