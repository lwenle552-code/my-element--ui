# Form 表单

用于数据收集、校验和提交。

## 基础用法

```vue
<z-form :model="formData" :rules="formRules">
  <z-form-item label="用户名" prop="username">
    <z-input v-model="formData.username" />
  </z-form-item>
  <z-form-item label="密码" prop="password">
    <z-input v-model="formData.password" type="password" />
  </z-form-item>
  <z-button type="primary" @click="submit">提交</z-button>
</z-form>
```

## 属性

| 属性        | 说明         | 类型    | 默认值 |
| ----------- | ------------ | ------- | ------ |
| model       | 表单数据对象 | object  | {}     |
| rules       | 校验规则     | object  | {}     |
| showMessage | 显示校验信息 | boolean | true   |

## 事件

| 事件     | 说明     | 回调参数        |
| -------- | -------- | --------------- |
| validate | 校验回调 | (valid, errors) |
