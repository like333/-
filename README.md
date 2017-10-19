
# my-project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
VUE组件化和单页应用的使用
### 首页
* "./"重定向到"/filePublish"
头部导航Bar组件
![](https://raw.githubusercontent.com/like333/mange-stystem-by-vue-/master/readmeResource/1.jpg)
### 添加分类
* 弹出框：`Modal`组件，动态标题，因为弹出框内容结构不一样，所以采用`slot`插槽
* 在分类列表中可以查看到添加的新分类
![](https://github.com/like333/mange-stystem-by-vue-/blob/master/readmeResource/%E6%B7%BB%E5%8A%A0%E5%88%86%E7%B1%BB.jpg?raw=true)
### 删除分类
* 从模拟的数据中请求到分类列表，展现出来，由于是对同一数据列表的操作，所以所有的数据都是同步展示的
![](https://raw.githubusercontent.com/like333/mange-stystem-by-vue-/master/readmeResource/%E5%88%A0%E9%99%A4%E5%88%86%E7%B1%BB.jpg)
### 选择分类类目，上传文件
* 文件上传到所选分类下
![](https://github.com/like333/mange-stystem-by-vue-/blob/master/readmeResource/%E9%80%89%E6%8B%A9%E5%88%86%E7%B1%BB.jpg?raw=true)
### 上传文件列表
* 不同后缀的文件对应相应的图标，这部分封装为组件`FileIcon`,通过父组件传来的文件名参数，解析文件后缀，显示对应图标
![](https://github.com/like333/mange-stystem-by-vue-/blob/master/readmeResource/%E6%96%87%E6%A1%A3%E5%88%97%E8%A1%A8.jpg?raw=true)



