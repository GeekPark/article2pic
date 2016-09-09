极客公园文章优化Chrome插件
-----------
用于优化`http://*.geekpark.com/topics/*`链接下的所有文章，增加发布到微信和发布到微博的功能。

####License: [MIT](http://choosealicense.com/licenses/mit/)

###安装
1. ~~下载最新版[article2pic.crx](https://raw.githubusercontent.com/liyaodong/article2pic/master/article2pic.crx)文件~~
2. ~~打开Chrome浏览器，进入`chrome://extensions/`地址。将下载好的crx插件拖入该页面并点击`add`或`添加`。~~

插件已上架至 Google APP Store，请[前往下载](https://chrome.google.com/webstore/detail/article2pic/hnfdfcfjenohbfjhnhlpecikeocgdamd?hl=zh-CN)

###使用
打开极客公园文章详情页，等待网页加载完毕后右上角会出现「发布到微信」和「发布到微博」按钮。

####发布到微信
点击后会将文章精简为`标题`、`日期`、`作者`和`正文`。

然后你可以点击`「管理底图」`进入插件选项页面，给文章增加`底部图片`。如果你已经添加过底部图片，点击某底部图片即可更换。

同时你也可以在该页面给文章编写`自定义CSS`，这些插件设置会保存在你的浏览器内直到你卸载浏览器。等设置完毕后在文章页`刷新页面`即可应用设置。

除此之外，`文章内容`是`可编辑`的，你可以增加针对微信发布的特殊内容等。

在你觉得一切都好的时候，点击文章内容，全选复制粘贴到微信公众平台里。

####发布到微博
同「发布到微信」相比，多出一个「生成长图」的功能，图片生成后你可以保存到桌面然后发布到微博上。

Tip: 在你点击「生成长图」后文章不可编辑，需刷新页面重新再来。

###二次开发
1. 修改`manifest.json`中的`content_scripts`地址检测
2. 修改`./source/src/js/main.js`中对文章的抓取地址

###已知Bug
选项页面新增文章底图，如果和已有底图名称一致则会覆盖

###插件截图
![文章详情页](https://raw.githubusercontent.com/liyaodong/article2pic/master/screenshort/home.jpg)
***
![插件选项页](https://raw.githubusercontent.com/liyaodong/article2pic/master/screenshort/option.jpg)

###版本更新
v1.1 调整文章样式，去除摘要边距，增加自定义摘要、文章着重（加粗）的样式自定义


v1.2 继续调整文章样式，删除空白`<p>`，将图片从`<figure>`中移出。添加远程样式控制，以后直接在远程修改默认样式，不会影响用户所自定义的样式。二次开发请编辑`source/src/main.js`中的外部样式地址。

v1.3 调整微博端样式，使微博图片更加清晰易读。同时修复标题文字错乱的Bug。

v1.4 活动详情页面增加微信样式导出链接跳转

v1.5 增加二级标题的自定义样式选项

v1.6 上架 Google APP Store 同时改名

v1.7 修复 `<picture />` 标签在微信内无法显示图片的问题

v1.8 去除远程样式，修复自定义样式不起作用的问题，增加自动打包 zip

v2.0 匹配新版主站文章页

v2.1 增加 codeblock 顶部底部代码块

v2.2 增加点评代码块，参考点评区块代码 [去复制](https://gist.githubusercontent.com/liyaodong/ce14ebf09f60616366a1a079e926c137/raw/57aee60c2630b3bd6ce22247aa11aafbfa1dd85e/dianping.html)

v2.3 Fix image bug

v2.4 Add remote style control, geekpark-test:article-style.json
