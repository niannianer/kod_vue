## kingold
# 项目目前存在以下几个问题比较严重

* 外部js文件放在head部分，会阻塞页面渲染
* 第三方静态资源没有独立出来
* 静态资源存在永久缓存的问题
* css 没有自动补齐前缀，会有兼容性问题

# 解决方案

##  将html文件里的 外部js文件 移到body底部，比如:

 ```
 <body>
     	<div class="textBox">
     	</div>

 <script type="text/javascript" src="js/jquery-2.1.4.min.js" ></script>
 </body>
 ```


##  将第三方静态资源独立出来，并且使用其压缩版本,比如：
  * js/
      * libs/
          * jquery-2.1.4.min.js
          * jquery-weui.min.js
  * css/
      * common/
        * weui.min.css
        * someui.min.css




##  解决缓存问题以及css自动补全

* 安装nodejs [下载nodejs](https://nodejs.org/en/)
* 全局安装cnpm
```
npm install -g cnpm –registry=https://registry.npm.taobao.org
```
* 全局安装grunt-cli
```
cnpm install -g grunt-cli
```
* 安装grunt依赖
```
cnpm install
```
* 打包代码

```
grunt
```

*  打包后会生成build文件夹，和目前根目录的文件完全一样，
build文件夹下面的html文件引入的外部静态资源都加了版本号，
第三方库以'min'字符结尾的除外，css加了自动补全。
将build目录下的文件拷贝到服务器即可