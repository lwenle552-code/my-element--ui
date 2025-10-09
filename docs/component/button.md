# Button 按钮

用于触发操作的按钮。

## 基础用法

```vue
<z-button type="primary">主要按钮</z-button>
<z-button type="success">成功按钮</z-button>
<z-button type="danger">危险按钮</z-button>
```

## 属性

| 属性     | 说明     | 类型    | 默认值  |
| -------- | -------- | ------- | ------- |
| type     | 按钮类型 | string  | default |
| round    | 圆角按钮 | boolean | false   |
| disabled | 禁用状态 | boolean | false   |
| size     | 按钮尺寸 | string  | medium  |

## 事件

| 事件  | 说明     | 回调参数 |
| ----- | -------- | -------- |
| click | 点击事件 | (event)  |
