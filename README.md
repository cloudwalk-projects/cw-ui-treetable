# cw-ui-treetable

> 基于 vue 2.0 开发的 TreeTable 组件.

## 安装

```
npm install cw-ui-treetable -save
```

## 开始

Html
```
<cw-treetable :rows="data">
</cw-treetable>
```

Script
```
import Vue from 'vue';
import CwTreeTable from 'cw-ui-treetable'

Vue.use(CwTreeTable);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

```

## 命令

``` bash
# 安装依赖
npm install

# 运行开发环境
npm run dev

# 运行构建命令, 输出独立运行的示例程序
npm run build

# 运行分发命令, 输出组件库
npm run dist

# 执行单元测试
npm run test
```

## License

[MIT](LICENSE)
