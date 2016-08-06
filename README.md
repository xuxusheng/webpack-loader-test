# webpack-loader-test
编写自己的webpack loader

### 自定义 attr-loader
tools/attr-loader 文件夹中

以 attr-loader?scope=xxx 的形式接受参数

在所有css文件中的选择器后面加上自定义属性选择器[xxx]

> 如果没有接受到scope参数，则不做任何处理。

**例如：**
```
a#content.active > div::first-line[data-content],
#selectTwo {
    border: 1px solid rebeccapurple;
    height: 200px;
}

a:not(:visited) {
    width: 100px;
    height: 150px;
}
```

执行 webpack 命令后生成的文件中：
```
a[xusheng]#content[xusheng].active[xusheng] > div[xusheng]::first-line[xusheng][data-content],
#selectTwo[xusheng] {
    border: 1px solid rebeccapurple;
    height: 200px;
}

a[xusheng]:not(:visited) {
    width: 100px;
    height: 150px;
}
```
