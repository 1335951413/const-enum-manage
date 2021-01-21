[toc]

# const-enum-manage

> 前端常量 枚举工具

本插件是基于 [vue-enum](https://github.com/1024-lab/vue-enum) 改造而成

- 其实是对 vue-enum 的结构有些困惑，然后看源码简单，自己就写了一个，希望自己用着可以顺手一些~
- 如果数据量繁多会不会对性能造成影响暂未去探究
- 首次上传 npm 插件，大家多多见谅
- 本插件用到了 es6 语法，暂未对代码进行压缩，也未使用 babel 将 ES6 语法转至 ES5... 后续再去研究



## 一、安装及使用案例

**安装：**`npm install const-enum-manag`

**目录结构：**

看了阿里的前端规范，推荐把项目常用的常量抽离出来管理，一想很是不错，可以让代码结构更加清晰

我们可以按如下目录把常量分模块管理（`src\constants`）

```
|constants
|-- index.js
|-- article.js
|-- employee.js
```

**使用案例：**

提供了几种写法，选自己喜欢的来

`src\constants\index.js`

```js
// import { EMPLOYEE_STATUS, EMPLOYEE_ACCOUNT_TYPE } from './employee'
// import { ARTICLE_STATUS, ARTICLE_PUBLISH } from './article'

import * as employee from './employee'
import * as article from './article'


export default {
  // ARTICLE_STATUS,
  // ARTICLE_PUBLISH,

  // EMPLOYEE_STATUS,
  // EMPLOYEE_ACCOUNT_TYPE,

  ...article,
  ...employee
}
```

`src\constants\article.js`

```js
// 与文章 ARTICLE 相关的枚举常量
export const ARTICLE_STATUS = [
  { value: 0, label: '已下架' },
  { value: 1, label: '上架' },
]

export const ARTICLE_PUBLISH = [
  { value: 0, label: '工业大学出版社' },
  { value: 1, label: '农林大学出版社' },
]
```

`src\constants\employee.js`

```js
// 与员工 EMPLOYEE 相关的枚举常量
const EMPLOYEE_STATUS = [
  {
    value: 0,
    label: '正常'
  },
  {
    value: 1,
    label: '禁用'
  },
  {
    value: 2,
    label: '已删除'
  }
];

const EMPLOYEE_ACCOUNT_TYPE = [
  {
    value: 1,
    label: 'QQ登录'
  },
  {
    value: 2,
    label: '微信登录'
  },
  {
    value: 3,
    label: '钉钉登录'
  },
  {
    value: 4,
    label: '用户名密码登录'
  }
];

export {
  EMPLOYEE_STATUS,
  EMPLOYEE_ACCOUNT_TYPE
};
```

`src\main.js`

- 注入 vue

```js
import Constant from 'const-enum-manage'
import constatns from './constants/index'


Vue.use(Constant, constatns)
```

`xxx.vue`

- 在页面上使用

```vue
<template>
  <div class="contianer">
    <span>- {{$constant.getLabelByValue("EMPLOYEE_STATUS", 1)}} -</span>

    <el-select v-model="dataForm.status" placeholder="请选择状态">
      <el-option v-for="(item, index) in employeeStatusList" :label="item.label" :value="item.value" :key="item + index"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {

      dataForm: {
        status: "",
      },
      employeeStatusList: this.$constant.getValueLabelList("EMPLOYEE_STATUS"),
    // [{"value":0,"label":"正常"},{"value":1,"label":"禁用"},{"value":2,"label":"已删除"}];

    }
  },
  methods: {},
  mounted() {
    console.log(this.$constant.getLabelByValue("EMPLOYEE_STATUS", 1))
    // 禁用

    console.log(this.$constant.getValueLabelList("EMPLOYEE_STATUS"))
    // [{"value":0,"label":"正常"},{"value":1,"label":"禁用"},{"value":2,"label":"已删除"}];

    console.log(this.$constant.getValueLabel("EMPLOYEE_STATUS"))
    // {0: "正常", 1: "禁用", 2: "已删除"}
  },
}
</script>

<style lang="scss">

</style>
```





## 二、使用方法

目前插件提供三个方法

可在全局使用 `this.$constant.getLabelByValue() 、this.$constant.getValueLabelList() 、this.$constant.getValueLabel()` 调用

根据枚举值获取描述 示例：

> 在表格渲染时经常遇到需要将状态转换成描述的情况，此时可以使用

```js
let params.row.employeeStatus = 1
this.$constant.getLabelByValue("EMPLOYEE_STATUS", params.row.employeeStatus)
// 禁用
```

> 下拉菜单经常需要使用键值对来渲染 select 的 options  `[{value:label},{value2:label2}]`

```vue
<template>
  <el-select v-model="dataForm.status" placeholder="请选择状态">
    <el-option v-for="(item, index) in employeeStatusList" :label="item.label" :value="item.value" :key="item + index"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        status: "",
      },
      employeeStatusList: this.$constant.getValueLabelList("EMPLOYEE_STATUS"),
    // [{"value":0,"label":"正常"},{"value":1,"label":"禁用"},{"value":2,"label":"已删除"}];
    }
  }
}
</script>
```

> 根据枚举名获取对应的 value 描述键值对 `{value:label}`

```js
this.$enum.getValueLabel('SOURCE_IN_TYPE')
// {0: "正常", 1: "禁用", 2: "已删除"}
```

